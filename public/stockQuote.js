var app = angular.module('stockQuote', []);

app.controller('StockQuoteController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  var stock = this;
  this.stockQuote = {}; 
  this.haveData = false;
  this.ticker = "";
  this.tickers = {}; 
  this.getStockData = function() {
    var stockQuoteRequest = "http://dev.markitondemand.com/MODApis/Api/v2/Quote?symbol=" + $scope.stockTicker;
    $http.get(stockQuoteRequest).success(function(data) {
      var x2j2 = new X2JS();
      var jsonResponse = x2j2.xml_str2json(data);
      var dataToSave = {};
      for (var key in jsonResponse.StockQuote) {
        if(key === "Name") {
          stock.ticker = jsonResponse.StockQuote[key];
          continue;
        }
        if(key === "MSDate" || key === "Status" || key === "Timestamp" || key == "Symbol") {
          continue;
        } else {
          dataToSave[key] = jsonResponse.StockQuote[key];
        }
      }
      stock.stockQuote = dataToSave;
      stock.haveData = true;
    });
  }
  this.saveStockInfo = function() {
    var postURL = "/save_info?symbol=" + $scope.stockTicker + "&price=" + stock.stockQuote.LastPrice;
    $http.post(postURL).success(function() {
      $window.alert.title = "";
      $window.alert("Successfully Saved Ticker and Price!");
    });
  }

  this.displayTickers = function() {
    var getTickers = "/getTickers";
    $http.get(getTickers).success(function(data) {
      stock.tickers = data.object;
    });
  }

}]);

