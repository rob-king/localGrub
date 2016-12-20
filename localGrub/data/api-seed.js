var axios = require('axios')
var Converter = require('csvtojson').Converter;

var url = 'http://localhost:1337/farmersmarket'
var converter = new Converter({})
converter.fromFile("./export.csv",function(err,result){
  result.forEach((market)  => {
    var marketObject =  {
      fmid: market.fmid,
      name: market.MarketName,
      street: market.street,
      city: market.city,
      county: market.County,
      state: market.State,
      zip: market.zip
    }
    axios.post(url, marketObject).then((response) => {
      console.log(response)
    })
  })
})
