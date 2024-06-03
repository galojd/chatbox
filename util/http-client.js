const axios = require('axios');

const HttpClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    'X-Requested-By': "Intentario API"
  }
});

module.exports = { HttpClient };