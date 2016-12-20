/**
 * FarmersMarketController
 *
 * @description :: Server-side logic for managing farmersmarkets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Yelp = require('yelp')

 var yelp = new Yelp({
   consumer_key: 'consumer-key',
   consumer_secret: 'consumer-secret',
   token: 'token',
   token_secret: 'token-secret',
 });

 function yelpSearch(name, location) {

}


module.exports = {
  zipcode: function(req,res) {
    FarmersMarket.find({zip: req.param('zipcode')}).exec((err, markets) => {
      res.json(markets)
    })
  },

  fmid_show: function(req, res) {
    FarmersMarket.find({fmid:req.param('fmid')}).exec((err, market) => {
      res.json({market, searchtest:yelpSearch(market.name, market.zip)})
    })

  }
};
