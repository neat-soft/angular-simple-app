/**
 * Created by mirko on 21.9.15..
 */
'use strict';

angular.module('skywarriorApp')
  .controller('ItemCtrl', function ($scope, item, ItemSharedService) {
    $scope.item = item;
    $scope.isOwner = ItemSharedService.isOwner;
  });
