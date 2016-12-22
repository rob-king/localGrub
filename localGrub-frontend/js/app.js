angular.module("localGrub", ["ui.router", "ngResource", "leaflet-directive"])
  .config(["$stateProvider", Router])
  .factory("SearchFactory", ["$resource", SearchFactoryFunction])
  .factory("MarketFactory", ["$resource", MarketFactoryFunction])
  .controller("SearchController", ["SearchFactory", SearchControllerFunction])
  .controller("ShowMarketController", ["$rootScope", "$scope", "$stateParams", "$state", "MarketFactory", ShowMarketControllerFunction])



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

function ShowMarketControllerFunction($rootScope, $scope, $stateParams, $state, MarketFactory) {
  angular.extend($rootScope, {
     center: {},
     markers: {}
   });

   angular.extend($scope, {
     market: {},
     markers: {}
   })

   this.market = {}

  MarketFactory.get({fmid: $stateParams.fmid}, (response) => {
    this.market = response.market
    let location =  {
      lat: this.market.latitude,
      lng: this.market.longitude
    }

    let marker =  angular.copy(location)

    $scope.market = angular.copy(location)
    $scope.market.zoom =  80

    $scope.markers =  {location: angular.copy(marker)}



    console.log($scope)

  })

}
