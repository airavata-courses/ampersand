const express = require('express')
const router = express.Router()

// amqp-library (rabbit-MQ)
const amqp = require('amqplib')

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

router.get("/", async (req, response) => {
    
    connect();
    async function connect(){
        
        const QUEUE = 'PLOT_QUEUE'
        
        try{
            const conn = await amqp.connect(rabbitSettings);
            const channel = await conn.createChannel();
            const res = await channel.assertQueue(QUEUE);
            
            channel.consume(QUEUE, message => {
                let msg = JSON.parse(message.content.toString());
                response.status(201).json(msg);
            }, {noAck: true})

            
        }
        catch(err){
            console.error(`Error -> ${err}`);
        }
    }

    // // create connection
    // amqp.connect('amqp://guest:guest@rabbitmq', (connError, connection) => {
    //             if(connError){
    //                 throw connError;
    //             }
    //             // create mq channel
    //             connection.createChannel((channelError, channel) =>{
    //                 if(channelError){
    //                     throw channelError;
    //                 }
                    
    //                 // assert queue
    //                 const QUEUE = 'INGEST_QUEUE'
    //                 channel.assertQueue(QUEUE);
                    
    //                 // receive message queue
    //                 channel.consume(QUEUE, (msg) => {
    //                     console.log(`Message Received: ${msg.content}`)
    //                     response.status(201).json(msg)
    //                 }, {
    //                     // after consuming the queue message, update the mq
    //                     noAck: true
    //                 })
    //             })
    //         })
    })

module.exports = router