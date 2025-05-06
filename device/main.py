import asyncio
import websockets
import random
import json
async def handler(websocket):
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
            print(message)
            await websocket.send(json.dumps(obj))  # Echo the message back
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")

async def main():
    server = await websockets.serve(handler, "192.168.1.31", 8765)
    print("WebSocket Server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())