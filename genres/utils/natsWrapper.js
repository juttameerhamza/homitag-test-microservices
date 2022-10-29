const nats = require('node-nats-streaming');

class NatsWrapper {
    #_client;

    get client() {
        if (!this.#_client) {
            throw new Error("Cannot access NATS client before connecting");
        }

        return this.#_client;
    }

    connect(clusterId, clientId, url) {
        this.#_client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this.client.on("connect", () => {
                resolve();
            });
            this.client.on("error", (err) => {
                reject(err);
            });
        });
    }
}

module.exports = new NatsWrapper();