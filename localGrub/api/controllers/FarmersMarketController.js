/**
 * FarmersMarketController
 *
 * @description :: Server-side logic for managing farmersmarkets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  zipcode: function(req,res) {
    FarmersMarket.find({zip: req.param('zipcode')}).exec((err, markets) => {
      res.json(markets)
      console.log(`zipcode search: ${req.param('zipcode')}`)
      console.log(markets)
    })
  },

  fmid_show: function(req, res) {

  }
};
