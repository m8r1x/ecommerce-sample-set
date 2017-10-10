const Redis = require('redis');

const items = require('./items.json');

const redis = Redis.createClient();

function rk() {

  return Array.prototype.slice.call(arguments).join(':');
}

items.map(item => {

  redis.multi([
    [
      'HMSET', rk('redishop', 'items', item['slug']),
      'artist', item['imageCredit']['artist'],
      'price', item['price'],
      'name', item['name'],
      'description', item['description'],
      'manufacturer', item['manufacturer'],
      'itemType', item['itemType'],
      'productImg', item['productImg']
    ],
    ['SADD', rk('redishop', 'all-items'), item['slug']]
  ]).exec((err, result) => {

    if (err) {
      throw err;
    }

    console.log(result);
  });
});
