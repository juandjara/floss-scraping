const cheerio = require('cheerio');
const titleSelector = 'h2.month';
const tableSelector = 'table.month';
const year = new Date().getFullYear();

const orderedMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

module.exports = text => {
  const $ = cheerio.load(text);

  const titles = $(titleSelector).map((i, el) => {
    return $(el).text();
  }).get();

  const tables = $(tableSelector).map((i1, el) => {
    return $(el).find('tr').map((i2, el) => {
      const td = $(el).find('td').get();
      const day_text = $(td[0]).text();
      const full_text = $(td[1]).text();
      const month = titles[i1];
      const month_number = orderedMonths.indexOf(month) + 1;
      const dates = day_text.split('-').map(day => new Date(`${year}-${month_number}-${day}`));
      return {month, day_text, dates, full_text};
    }).get();
  }).get().sort((a, b) => {
    const aDate = a.dates[0].getTime();
    const bDate = b.dates[0].getTime();
    return aDate - bDate;
  })

  return tables;
}
