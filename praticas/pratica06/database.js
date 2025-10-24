const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;

const client = new MongoClient(url);

async function conectarDb() {
    await client.connect();
    return client.db('agenda');
}

module.exports = { conectarDb };
