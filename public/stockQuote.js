var app = angular.module('stockQuote', ['n3-line-chart']);

app.controller("ChartController", ['$scope', '$http', function($scope, $http) {
  this.data = {};
  var chart = this;
  this.hasData = false;
  this.options = {};
  var chartURL = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D"
  this.getChartData = function() {
    $http.get(chartURL).success(function(data) {
      var chartData = {dataset0 : []};
      var index = 0;
      var prices = data["Elements"][0]["DataSeries"]["close"]["values"];
      for(var key in prices) {
        chartData["dataset0"].push({x : data["Positions"][index], val_o : prices[key]});
          index++;
      }
      chart.data = chartData;
      chart.options = {
        series: [
          {
            axis: "y",
            dataset: "dataset0",
            key: "val_o",
            label: "I dont know",
            color: "#1f77b4",
            type: ['dot'],
            id: 'mySeries0'
          }
        ],
        axes: {x: {key: "x"}}
      };
      chart.hasData = true;
      console.log(chart.data);
      console.log(chart.options);
    });
  }
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

