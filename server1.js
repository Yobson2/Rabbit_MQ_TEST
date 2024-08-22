import express from 'express';
import * as amqp from "amqplib";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.RABBITMQ_URL || "amqp://localhost"; 
const queue = process.env.RABBITMQ_QUEUE || "queue";        

// const amp = require("amqplib");
const PORT = 3030;


async function sendMessage(msg) {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
    
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(msg));
        console.log(`Message sent to ${queue}: ${msg}`);
        
    } catch (error) {     
        console.error('Error connecting to RabbitMQ:', error);
    }
};
 sendMessage("Hello, world test1!");
 sendMessage("Hello, world oooo!");
 sendMessage("Hello, world test!");

/* Initialisation de mon serveur */
const app = express();



// Test route
app.get('/', (req, res) => {
    res.send("Bienvenue sur notre serveur 1! 🎉");
});


// Listen on port
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});



//je me suis arreté au niveau de la route /profile