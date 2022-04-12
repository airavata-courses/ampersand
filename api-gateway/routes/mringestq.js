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

router.post("/", async (req, response) => {
    
    // connect();
    // async function connect(){
        
        const QUEUE = 'M_INGEST_QUEUE'
        
        // try{
            // console.log("r1")
            const conn = await amqp.connect(rabbitSettings);
            // console.log("r2")
            const channel = await conn.createChannel();
            // console.log("r3")
            const res = await channel.assertQueue(QUEUE);
            
            // console.log("r4")
            channel.consume(QUEUE, message => {
                let msg = JSON.parse(message.content.toString());
                // console.log("r5")
                channel.ack(message);
                channel.close()
                conn.close()
                return response.status(201).json(msg);
            })

        // }
    //     catch(err){
    //         console.error(`Error -> ${err}`);
    //     }
    // }

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