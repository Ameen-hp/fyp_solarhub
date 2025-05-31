const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

module.exports = client;
