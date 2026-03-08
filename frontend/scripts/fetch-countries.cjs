const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/eesur/country-codes-lat-long/master/country-codes-lat-long-alpha3.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const raw = JSON.parse(data);
    const cleaned = raw.map(c => ({
      name: c.Country,
      lat: parseFloat(c['Latitude (average)']),
      lng: parseFloat(c['Longitude (average)'])
    })).filter(c => !isNaN(c.lat) && !isNaN(c.lng));
    
    const outPath = path.join(__dirname, '..', 'public', 'countries.json');
    fs.writeFileSync(outPath, JSON.stringify(cleaned, null, 2));
    console.log(`Saved ${cleaned.length} countries to public/countries.json`);
  });
}).on('error', err => console.error(err));
