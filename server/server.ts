const express = require('express');
const app = express();
// port will be listening on 3000
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
