var app = angular.module('stockQuote', []);

app.controller('StockQuoteController', ['$scope', '$http', function($scope, $http) {
  var stock = this;
  this.stockQuote = {}; 
  
  this.getStockData = function() {
    var urlRequest = "http://dev.markitondemand.com/MODApis/Api/v2/Quote?symbol=" + $scope.stockTicker;
    $http.get(urlRequest).success(function(data) {
      var x2j2 = new X2JS();
      var jsonResponse = x2j2.xml_str2json(data);
      var dataToSave = {};
      for (var key in jsonResponse.StockQuote) {
        if(key === "MSDate" || key === "Status" || key === "Timestamp" || key == "Symbol" || key == "Name") {
          continue;
        } else {
          dataToSave[key] = jsonResponse.StockQuote[key];
        }
      }
      stock.stockQuote = dataToSave;
    });
  }
}]);

