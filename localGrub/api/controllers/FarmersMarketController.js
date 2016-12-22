/**
 * FarmersMarketController
 *
 * @description :: Server-side logic for managing farmersmarkets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var async_helper =  require('async')

 var Yelp = require('yelp')

//Figaro wouldnt sync up for the inital controller load even when in bootstrap.js
//This ensures that things are set when the environment variables are done being added.
var yelp = new Yelp({
 consumer_key: process.env["YELP_CONSUMER_KEY"],
   consumer_secret: process.env["YELP_CONSUMER_SECRET"],
   token: process.env["YELP_TOKEN"],
   token_secret: process.env["YELP_SECRET_TOKEN"],
 });

function checkYelpConfig() {
  if (!yelp.oauthToken) {
    yelp = new Yelp({
     consumer_key: process.env["YELP_CONSUMER_KEY"],
       consumer_secret: process.env["YELP_CONSUMER_SECRET"],
       token: process.env["YELP_TOKEN"],
       token_secret: process.env["YELP_SECRET_TOKEN"],
     });
  }
}
function getYelpRatings(market, callback) {
  yelp.search({term:market.name, location:market.zip})
    .then((data) => {
      market.rating = data.businesses[0].rating
      market.latitude = data.businesses[0].location.coordinate.latitude
      market.longitude = data.businesses[0].location.coordinate.longitude
      callback(null, market)
    }).catch((err) => {
      callback(null, market)
    })
}

module.exports = {
  zipcode: function(req,res) {
    FarmersMarket.find({zip: req.param('zipcode')}).exec((err, markets) => {
      checkYelpConfig()
      async_helper.map(markets, getYelpRatings, function(err, result) {
        res.json(result)
      })
    })
  },

  fmid_show: function(req, res) {
    FarmersMarket.findOne({fmid:req.param('fmid')}).exec(function (err, market) {
      checkYelpConfig()
      yelp.search({term:market.name, location:market.zip})
        .then((data) => {
          market.rating = data.businesses[0].rating
          market.latitude = data.businesses[0].location.coordinate.latitude
          market.longitude = data.businesses[0].location.coordinate.longitude
          res.json({market})
        }).catch((err) => {
          console.error(err)
          res.json({market})
        })
    })

  }
};
