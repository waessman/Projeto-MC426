const { MongoClient } = require('mongodb');
//const uri = 'mongodb+srv://inclusihire:MC426_inclusihire@cluster0.qmmz34t.mongodb.net/testy';
const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
