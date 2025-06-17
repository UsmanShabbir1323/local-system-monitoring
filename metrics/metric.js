const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3001;

// Create a custom gauge metric
const testMetric = new client.Gauge({
  name: 'custom_test_metric',
  help: 'A custom metric for testing alerts',
});

// Update metric via query param
app.get('/set', (req, res) => {
  const value = parseFloat(req.query.value);
  if (isNaN(value)) {
    return res.status(400).send('Invalid value');
  }
  testMetric.set(value);
  res.send(`Metric set to ${value}`);
});

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Custom metric server running on http://localhost:${port}`);
});
