(function()
{
  'use strict';
  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject=['$scope'];
  function LunchCheckController($scope)
  {
    $scope.LunchCheckFunc=function()
    {
      var count=countItems($scope.items);
      $scope.showMsg=displayMsg(count);
    };
    function countItems(items)
    {
      var total=0;
      if(items)
      {
        var data=items.split(',');
        for (var i in data)
        {
          if (data[i].trim().length != 0) {
            total++;
          }
        }
      }
      return total;
    }
    function displayMsg(count)
    {
      if (count == 0)
      {
        return 'Please Enter Data First';
      }
      else if (count <= 3)
      {
        return 'Enjoy Your Food....!';
      }
      else
      {
        return 'Ooopss....Too much....!';
      }
    }
  }
})();
