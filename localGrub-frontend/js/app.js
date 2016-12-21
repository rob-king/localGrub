angular.module("localGrub", ["ui.router", "ngResource"])
  .config(["$stateProvider", Router])
  .factory("SearchFactory", ["$resource", SearchFactoryFunction])
  .controller("SearchController", ["SearchFactory", SearchControllerFunction])



function Router($stateProvider) {
  console.log("Router working")
  //search state
  $stateProvider
  .state("search", {
      url: "/",
      templateUrl: "js/ng-views/search.html",
      controller: "SearchController",
      controllerAs: "vm"
    })
    //show state
}

function SearchFactoryFunction($resource) {
  return $resource("http://localhost:1337/zipcode/:zip", {}, {
    update: {method: "PUT"}
  })
}

function SearchControllerFunction(SearchFactory) {
  this.results = SearchFactory.get({zip:"11222"})
  console.log(this.results)
}
