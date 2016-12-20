var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/localGrub');
var Converter = require('csvtojson').Converter;



var Schema = mongoose.Schema


var MarketSchema = new Schema({
  fmid: String,
  name: String,
  url: String,
  street: String,
  city: String,
  county: String,
  state: String,
  zip: String
},
{
  collection:'farmersmarket'
})

var MarketModel =  mongoose.model("farmersmarket", MarketSchema)
var converter = new Converter({})


converter.fromFile("./export.csv",function(err,result){
  result.forEach((market)  => {
    var marketObject =  {
      fmid: market.FMID,
      name: market.MarketName,
      street: market.street,
      city: market.city,
      county: market.County,
      state: market.State,
      zip: market.zip
    }

    var market = new MarketModel(marketObject)

    market.save((err, market) => {
      console.log(err)
      console.log(market)
    })
  })
})
