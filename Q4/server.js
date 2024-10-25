// server.js
const WebSocket = require('ws');
const chatbot = require('./chatbot');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    
    // Get the response from the chatbot module
    const response = chatbot.askQuestion(message);
    
    // Send the response back to the client
    ws.send(response);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
