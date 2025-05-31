const client = require('../models/elasticClient');

const chatQuery = async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ reply: 'Please provide a valid query.' });
  }

  try {
    const response = await client.search({
      index: 'solarhub',
      body: {
        query: {
          match: {
            question: query
          }
        }
      }
    });

    const hits = response.hits?.hits;

    if (!hits || hits.length === 0) {
      return res.status(404).json({ reply: 'Sorry, no relevant answer found in our database.' });
    }

    const solution = hits[0]._source?.solution;

    if (!solution) {
      return res.status(500).json({ reply: 'Match found but no solution stored in record.' });
    }

    res.status(200).json({ reply: solution });

  } catch (error) {
    console.error('❌ Elasticsearch query failed:', error.meta || error.message || error);
    res.status(500).json({ reply: 'Error retrieving data. Please try again later.' });
  }
};

module.exports = { chatQuery };

