#!/usr/bin/env node

import amqp from 'amqplib/callback_api.js'

amqp.connect('amqp://localhost', (error0, conection) => {
    if (error0) throw error0

    conection.createChannel((error1, channel) => {
        if (error1) throw error1;

        const queue = 'hello'
        const msg = 'Hello world'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(" [x] Sent %s", msg);


    })

    setTimeout(() => {
        conection.close()
        process.exit(0)

    }, 500)
})