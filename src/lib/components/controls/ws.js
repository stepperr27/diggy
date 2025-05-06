let socket;
const address = "ws://192.168.1.31:8765";

// Connect to WebSocket Server
export const connectWebSocket = () => {
socket = new WebSocket(address);

socket.onopen = () => console.log("Connected to WebSocket Server");

socket.onmessage = (event) => {

    console.log(JSON.parse(event.data))
};

socket.onclose = () => console.log("WebSocket Disconnected");
}

export const sendMessage = (inputMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(inputMessage);
        inputMessage = ""; // Clear input field
    }
}