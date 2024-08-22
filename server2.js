import express from 'express';
import * as amqp from "amqplib";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.RABBITMQ_URL || "amqp://localhost"; 
const queue = process.env.RABBITMQ_QUEUE || "queue";        

const PORT = 8000;

async function receiveMessage() {
        try {
            const connection = await amqp.connect(url);
            const channel = await connection.createChannel();

            await channel.assertQueue(queue);
            await channel.consume(queue, (msg) => {
            console.log(`Received message: ${msg.content.toString()}`);
            channel.ack(msg);
            })
            
        } catch (error) {     
            console.error('Error connecting to RabbitMQ:', error);
        }
};
receiveMessage();
/* Initialisation de mon serveur */
const app = express();
// Test route
app.get('/', (req, res) => {
    res.send("Bienvenue sur notre serveur 2! 🎉");
});



// Listen on port
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});



//je me suis arreté au niveau de la route /profile