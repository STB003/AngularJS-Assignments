(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.removeItem=function (itemPosition) {
    list.found.splice(itemPosition, 1);
  };

  list.check=function () {
      list.loading = true;
      var promise = MenuSearchService.getMatchedMenuItems();
      promise.then(function (response) {
        list.loading = false;
        var message = response.data.menu_items;
        console.log(message);
        list.found=[];
        for (var i = 0; i < message.length; i++) {
          if(message[i].description.indexOf(list.value)!=-1)
            list.found.push(message[i]);
        }

       })
       .catch(function (error) {
         list.loading = false;
         console.error(error);
       })
      };

}


MenuSearchService.$inject = ['$http','ApiPath'];
function MenuSearchService($http,ApiPath) {
  var service = this;

  service.getMatchedMenuItems = function() {
    return $http({
        method:"GET",
        url: (ApiPath +"/menu_items.json")
    });
  };

}

function FoundItemsDirective() {
  var dir = {
  templateUrl: 'foundItems.html',
  scope: {
    items:'<',
    onRemove: '&'
  },
  controller: FoundItemsDirectiveController,
  controllerAs: 'FIDCtrl',
  bindToController: true

  };
  return dir;
  }

function FoundItemsDirectiveController() {
  var FIDCtrl = this;

  FIDCtrl.checkList = function () {
      return FIDCtrl.items && FIDCtrl.items.length===0;
  };
}


})();
