from gpiozero import PWMOutputDevice, DigitalOutputDevice
import asyncio
import websockets
import random
import json
from time import sleep


class MotorDriver:
    def __init__(self):
        # Import PINs config
        # Motor A
        self.IN1 = DigitalOutputDevice(23)
        self.IN2 = DigitalOutputDevice(18)
        self.ENA = PWMOutputDevice(2)

        # Motor B
        self.IN3 = DigitalOutputDevice(15)
        self.IN4 = DigitalOutputDevice(14)
        self.ENB = PWMOutputDevice(3)

        # Default Duty Cycle
        self.ENA.value = 1  # 100% duty cycle
        self.ENB.value = 1
        self.PWM_FACTOR = 0.5
        self.STEERING_FACTOR = 0.8 

        self.LED = DigitalOutputDevice(4)
        self.LED_status = False
        self.LED.off()

    def stop_motors(self):
        self.IN1.off()
        self.IN2.off()
        self.IN3.off()
        self.IN4.off()

    def forward(self):
        self.IN1.on()
        self.IN2.off()
        self.IN3.on()
        self.IN4.off()
    
    def backward(self):
        self.IN1.off()
        self.IN2.on()
        self.IN3.off()
        self.IN4.on()

    def left(self):
        self.IN1.off()
        self.IN2.on()
        self.IN3.on()
        self.IN4.off()

    def right(self):
        self.IN1.on()
        self.IN2.off()
        self.IN3.off()
        self.IN4.on()

    def set_pwm(self, mL, mR):
        print(mL, mR)
        self.ENA.value = mL  # 100% duty cycle
        self.ENB.value = mR

    def handle_buttons(self, btns):
        if btns["x"] and not self.LED_status:
            self.LED.on()
            self.LED_status = True
        elif not btns["x"] and self.LED_status:
            self.LED.off()
            self.LED_status = False

    # Movement logic
    def move(self, controls):
        higher_val = max(controls["triggers"]["l"], controls["triggers"]["r"]) 
        if higher_val == 0: # No trigger pressed, stop motors
            self.stop_motors()
        else:
            base_speed = higher_val * self.PWM_FACTOR # Set max speed 
            x_axis = round(controls["axis"]["x"], 2)

            # Reduce one of the two motors proportionally to the steering
            # max_speed * (max_pwm - steering_factor * x_axis)
            mL = base_speed * (1.0 - self.STEERING_FACTOR * max(0, -x_axis))
            mR = base_speed * (1.0 - self.STEERING_FACTOR * max(0, x_axis))

            # Clamp between 0 and PWM_FACTOR for safety
            mL = max(0.0, min(self.PWM_FACTOR, mL))
            mR = max(0.0, min(self.PWM_FACTOR, mR))

            self.set_pwm(mL, mR)

            if controls["triggers"]["l"] < controls["triggers"]["r"]:
                self.forward()
            else:
                self.backward()
            
            #  Buttons
            self.handle_buttons(controls["btns"])

async def handler(websocket):
    motor = MotorDriver()
    try:
        async for message in websocket:
            obj = {
                "pipe": {
                    "length": 10
                },
                "sensors": {
                    "temp": {
                        "value": 10
                    },
                    "hum": {
                        "value": 12
                    }
                }
            }
            controls = json.loads(message)
            motor.move(controls)
            
            await websocket.send(json.dumps(obj))  # Echo the message back

    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")

async def main():
    server = await websockets.serve(handler, "192.168.1.31", 8765)
    print("WebSocket Server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())