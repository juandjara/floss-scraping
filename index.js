const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');

const app     = express();

app.set('json spaces', 2);

app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: 'First draft of floss.events scraping API'
  });
});
app.get('/search', require('./search'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running at port ', PORT);
});

