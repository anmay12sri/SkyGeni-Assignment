const fs = require('fs').promises ;  
const path = require('path');  //importing

 
const getAccountIndustryData = async (req, res) => {
   
  const Path = path.join(__dirname, '../Data/AccountIndustry.json');//connecting from AccountIndustry json file
  try {
     
    const data = await fs.readFile(Path, 'utf-8');//reading JSON file 
    const parsedData = JSON.parse(data);//parsing to convert into array of objects 
    if (Array.isArray(parsedData)) {
     //if data is parsed then send else send invalid
      res.json(parsedData);
    } else {
      res.status(500).json({ error: 'Invalid data format' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });//if nothing works send error
  }
};

module.exports = { getAccountIndustryData };
