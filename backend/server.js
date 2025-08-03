const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // For production, replace '*' with your Vercel frontend domain for better security
}));
app.use(express.json());

// Create portfolios directory if it doesn't exist
const portfoliosDir = path.join(__dirname, 'portfolios');
if (!fs.existsSync(portfoliosDir)) {
  fs.mkdirSync(portfoliosDir);
}

// API endpoint to list all portfolios
app.get('/api/portfolios', (req, res) => {
  try {
    const files = fs.readdirSync(portfoliosDir);
    const portfolios = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    res.json({ portfolios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to get portfolio data
app.get('/api/portfolio/:portfolioId', (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const filePath = path.join(portfoliosDir, `${portfolioId}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to save/update portfolio data
app.post('/api/portfolio/:portfolioId', (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const portfolioData = req.body;
    
    const filePath = path.join(portfoliosDir, `${portfolioId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(portfolioData, null, 2));
    
    res.json({ success: true, message: 'Portfolio saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to delete portfolio
app.delete('/api/portfolio/:portfolioId', (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const filePath = path.join(portfoliosDir, `${portfolioId}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
