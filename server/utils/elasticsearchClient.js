const { Client } = require('@elastic/elasticsearch');

// Create a new Elasticsearch client
const client = new Client({
  node: 'http://localhost:9200',
  headers: {
    accept: 'application/vnd.elasticsearch+json; compatible-with=8',
    'content-type': 'application/vnd.elasticsearch+json; compatible-with=8',
  },
});

// ✅ Function to test connection with Elasticsearch
const connectElastic = async () => {
  try {
    await client.ping();
    console.log('✅ Elasticsearch connected');
  } catch (err) {
    console.error('❌ Elasticsearch connection failed:', err);
  }
};

// Export both client and connect function
module.exports = {
  client,
  connectElastic,
};
