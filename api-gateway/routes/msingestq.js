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

router.post('/', async (req, response) => {

    // connect();
    // async function connect(){
        
        const QUEUE = 'M_INGEST_QUEUE'
        
        // try{
            // console.log("s1")
            const conn = await amqp.connect(rabbitSettings);
            // console.log("s2")
            const channel = await conn.createChannel();
            // console.log("s3")
            const res = await channel.assertQueue(QUEUE);
            // console.log("s4")
            let msg = JSON.stringify(req.body);
            await channel.sendToQueue(QUEUE, Buffer.from(msg));
            // console.log("s5")
            return response.status(201).json({'message':'success'});
        // }
        // catch(err){
        //     console.error(`Error -> ${err}`);
        // }
    // }
    // // create connection
    // console.log("0xxxxxxxxxxxxxxxxx0")
    // await amqp.connect(rabbitSettings, (connError, connection) => {
    //             if(connError){
    //                 throw connError;
    //             }
    //             // create mq channel
    //             connection.createChannel((channelError, channel) =>{
    //                 if(channelError){
    //                     throw channelError;
    //                 }
    //                 console.log("1xxxxxxxxxxxxxxxxx1")
                    
    //                 // assert queue
    //                 const QUEUE = 'INGEST_QUEUE'
    //                 channel.assertQueue(QUEUE);
                    
    //                 // send message queue
    //                 channel.sendToQueue(QUEUE, Buffer.from(req));
    //                 console.log(QUEUE, ": message sent ->", req);
    //                 response.status(201).json({'message':'success'})
    //             })
    //         })
})

module.exports = router