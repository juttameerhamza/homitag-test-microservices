class Listener {
    #client;

    constructor(client) {
        this.#client = client;
    }

    subscriptionOptions(queueGroupName) {
        return this.#client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(queueGroupName);
    }

    listen(subject, queueGroupName, cb) {
        // console.log('listen: ', { subject, queueGroupName })
        const subscription = this.#client.subscribe(
            subject,
            queueGroupName,
            this.subscriptionOptions(queueGroupName)
        );

        subscription.on('message', (msg) => {
            console.log(`Message received: ${subject} / ${queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            cb(parsedData, msg);
        });
    }

    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }
}

module.exports = Listener;