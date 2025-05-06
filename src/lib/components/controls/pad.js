import { writable } from "svelte/store";
import { sendMessage } from "./ws";

let poll;
let lastLogTime = 0;
let hasSentRelease = false;
const logDelay = 100; // Debounce delay

export const buttons = writable({
  axis: { x: 0.0, y: 0.0 },
  triggers: { l: 0.0, r: 0.0 },
  btns: { a: false, x: false },
});

// Button writable object subscription - https://svelte.dev/docs/svelte/svelte-store
buttons.subscribe((b) => {
  const isPressed = b.triggers.l > 0 || b.triggers.r > 0 || b.btns.a || b.btns.x; // Check if a button is pressed

  const now = Date.now();
  if (isPressed && now - lastLogTime > logDelay) {
    sendMessage(JSON.stringify(b)) // Send websocket message
    lastLogTime = now;
    hasSentRelease = false;
  } else if (!isPressed && !hasSentRelease){ // Send stop release message
      sendMessage(JSON.stringify(b));
      hasSentRelease = true;
  }
});

// Init gamepad object - https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
const startController = () => {
  const gamepads = navigator.getGamepads();
  if (!gamepads) return;

  const pad = gamepads[0];
  if (!pad) return;

  // Update the reactive store
  buttons.update((state) => {
    state.axis.x = pad.axes[0]; // Left analouge X axis
    state.axis.y = pad.axes[1]; // Left analouge Y axis
    state.triggers.l = pad.buttons[6].value; // L2
    state.triggers.r = pad.buttons[7].value; // R2
    state.btns.a = pad.buttons[0].pressed; // A
    state.btns.x = pad.buttons[2].pressed; // X
    return state;
  });
  
  poll = requestAnimationFrame(startController); // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame 
};

export const plugIn = () => {
  startController();
};

export const unPlug = () => {
  cancelAnimationFrame(poll);
};
