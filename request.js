const https = require('https');

module.exports = url => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let text = '';
      res.on('data', chunk => {
        text += chunk
      })

      res.on('end', () => {
        resolve(text)
      })
    }).on('error', err => {
      reject(err)
    })
  })
}
