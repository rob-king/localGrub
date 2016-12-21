angular.module("localGrub", ["ui.router", "ngResource"])
  .config(["$stateProvider", Router])
  .factory("SearchFactory", ["$resource", SearchFactoryFunction])
  .factory("MarketFactory", ["$resource", MarketFactoryFunction])
  .controller("SearchController", ["SearchFactory", SearchControllerFunction])
  .controller("ShowMarketController", ["$stateParams", "$state", "MarketFactory", ShowMarketControllerFunction])



function Router($stateProvider) {
  //search state
  $stateProvider
  .state("search", {
      url: "/",
      templateUrl: "js/ng-views/search.html",
      controller: "SearchController",
      controllerAs: "vm"
    })
    //show state
    $stateProvider
      .state("showMarket", {
        url: "/farmersmarket/:fmid",
        templateUrl: "js/ng-views/market.html",
        controller: "ShowMarketController",
        controllerAs: "vm"
      })
}

function SearchFactoryFunction($resource) {
  return $resource("http://localhost:1337/zipcode/:zip", {}, {
    update: {method: "PUT"}
  })
}

function MarketFactoryFunction($resource) {
  return $resource("http://localhost:1337/farmersmarket/:fmid", {}, {})
}

function SearchControllerFunction(SearchFactory) {
  this.results = []

  this.search = function() {
    this.results =  SearchFactory.query({zip: this.zipcode})
  }
}

function ShowMarketControllerFunction($stateParams, $state, MarketFactory) {
  MarketFactory.get({fmid: $stateParams.fmid}, (response) => {
    this.market = response.market
  })
}
