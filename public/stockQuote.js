var app = angular.module('stockQuote', ['n3-chart']);

app.controller("ChartController", ['$scope', '$http', function($scope, $http) {
  this.data = {};
  this.options = {};
}]);

app.controller('StockQuoteController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  var stock = this;
  this.stockQuote = {}; 
  this.haveData = false;
  this.ticker = "";
  this.tickers = {}; 
  this.getStockData = function() {
    var stockQuoteRequest = "/stockQuote?symbol=" + $scope.stockTicker;
    $http.get(stockQuoteRequest).success(function(jsonResponse) {
      stock.stockQuote = jsonResponse["stockQuote"];
      stock.ticker = jsonResponse["ticker"];
      stock.haveData = true;
    });
  }
  this.saveStockInfo = function() {
    var postURL = "/save_info?symbol=" + $scope.stockTicker + "&price=" + stock.stockQuote.LastPrice;
    if($scope.stockTicker === undefined) {
      $window.alert("There is no ticker to save");
    } else {
        $http.post(postURL).success(function() {
          $window.alert.title = "";
          $window.alert("Successfully Saved Ticker and Price!");
        });
    }
  }

  this.displayTickers = function() {
    var getTickers = "/getTickers";
    $http.get(getTickers).success(function(data) {
      stock.tickers = data.object;
    });
  }

}]);

