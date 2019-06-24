const request = require('./request');
const parser = require('./parser');
const year = new Date().getFullYear();
const url = `https://floss.events/${year}/`;

module.exports = (req, res) => {
  return request(url).then(text => {
    const query = (req.query.q || '').toLowerCase();
    const data = parser(text);
    const filtered = data.filter(el => {
      const match = el.full_text.toLowerCase();
      return query ? match.indexOf(query) !== -1 : true;
    })
    res.json(filtered);
  }).catch(err => {
    res.status(500).send(err);
  })
}
