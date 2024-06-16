
const fs = require('fs').promises;  
const path = require('path'); //importing
const getProductLineData = async (req, res) => {
  const Path = path.join(__dirname, '../Data/ProductLine.json');////connecting from AccountIndustry json file
  try {
    // Read the JSON file asynchronously
    const data = await fs.readFile(Path, 'utf-8');//reading JSON file 
    const parsedData = JSON.parse(data);////parsing to convert into array of objects 
    
    if (Array.isArray(parsedData)) {//if data is parsed then send else send invalid
      res.json(parsedData);
    } else {
      res.status(500).json({ error: 'Invalid data format' });//if nothing works send error
    }
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
};

module.exports = { getProductLineData };

