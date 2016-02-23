var app = angular.module('stockQuote', []);

app.controller('StockQuoteController', ['$scope', '$http', function($scope, $http) {
  var stock = this;
  this.stockQuote = {}; 

  this.getStockData = function() {
    console.log("inside angular");
    //$http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote?symbol=AAPL").success(function(data) {
    //  var x2j2 = new X2JS();
   //   var jsonResponse = x2j2.xml_str2json(data);
    //  stock.stockQuote = jsonResponse;
   // });
 // }];

  }
}]);
