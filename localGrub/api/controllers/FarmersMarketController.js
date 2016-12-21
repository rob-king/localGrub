/**
 * FarmersMarketController
 *
 * @description :: Server-side logic for managing farmersmarkets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var async_helper =  require('async')
 var Yelp = require('yelp')

 var yelp = new Yelp({
   consumer_key: 'IWlgB9L9Gj1log9uvC02yg',
   consumer_secret: 'PQPZuDso1_0wz6ac0hZZabjaUaU',
   token: 'rikt_59E-Z3ieTBqvt0bFa-yOQGnFkqu',
   token_secret: 'aVQCbI7qX_OHK7qxGarWyABSSVQ',
 });

function getYelpRatings(market, callback) {
  console.log("hello?")
  console.log(market)
  console
  yelp.search({term:market.name, location:market.zip})
    .then((data) => {
      market.rating = data.businesses[0].rating
      callback(null, market)
    }).catch((err) => {
      market.rating = null
      callback(null, market)
    })
}

module.exports = {
  zipcode: function(req,res) {
    FarmersMarket.find({zip: req.param('zipcode')}).exec((err, markets) => {
      // markets.forEach((market, index) => {
      //   yelp.search({term: market.name, location: market.zip})
      //     .then((data) => {
      //       console.log(markets[index])
      //       markets[index].rating =  data.businesses[0].rating
      //     }).catch((err) => {
      //       console.error(err)
      //     })
      //   })
      //   res.json(markets)
      async_helper.map(markets, getYelpRatings, function(err, result) {
        res.json(result)
      })
    })
  },

  fmid_show: function(req, res) {
    FarmersMarket.findOne({fmid:req.param('fmid')}).exec(function (err, market) {
      yelp.search({term:market.name, location:market.zip})
        .then((data) => {
          market.rating = data.businesses[0].rating
          res.json({market})
        }).catch((err) => {
          console.error(err)
          res.json({market})
        })
    })

  }
};
