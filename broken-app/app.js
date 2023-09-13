const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); //midddleware to parse JSON body
//POST route at root
app.post('/', async function(req, res, next) {
  try { //use Promise.all to concurrently fetch data for multiple developers
    const results = await Promise.all(
      req.body.developers.map(async d => {
      const resp =  await axios.get(`https://api.github.com/users/${d}`);
      return { name: resp.data.name, bio: resp.data.bio };
    })
    ); //send the results as json
    return res.json(results);
    
  } catch {
    next(err);
  }
});
//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
//localhost
app.listen(3000, ()=> {
  console.log('Server is running on port 3000');
});
