/**
 * Created by mirko on 5.12.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('SearchController', searchController);

  searchController.$inject = ['$state', '$stateParams', 'searchParamResource', 'ItemServiceNew'];

  function searchController($state, $stateParams, searchParamResource, ItemServiceNew) {
    var vm = this;
    vm.query = '';
    vm.priceFrom = 0;
    vm.priceTo = 10000;
    vm.buildStateParameters = buildStateParameters;
    vm.submit = submit;
    vm.selectAllHeavies = selectAllHeavies;
    vm.selectAllPistols = selectAllPistols;
    vm.selectAllRifles = selectAllRifles;
    vm.searchByPrice = searchByPrice;

    vm.selectedAllHeavies = false;
    vm.selectedAllRifles = false;
    vm.selectedAllPistols = false;
    vm.selectedAllSmgs = false;
    vm.selectedAllContainers = false;

    vm.sortBy = '-created_at';
    vm.sortItemsBy = sortItemsBy;
    vm.added = null;
    vm.sortByDate = sortByDate;

    vm.quality = {};

    vm.searchByQuality = searchByQuality;

    activate();

    ////////////////////////////////////////////////////

    function activate() {
      vm.exteriors = searchParamResource.exteriors();
      vm.knives = searchParamResource.knives();
      vm.pistols = searchParamResource.pistols();
      vm.rifles = searchParamResource.rifles();
      vm.heavies = searchParamResource.heavies();
      vm.smgs = searchParamResource.smgs();
      vm.containers = searchParamResource.containers();

      ItemServiceNew.count().then(function (response) {
        vm.itemsCount = response.count;
        return vm.itemsCount;
      });

      if ($state.params && $state.params.weapon) {
        setSearchParams();
      }
    }

    function searchByQuality(paramValue) {
      vm.quality.selected ? $stateParams.quality = paramValue : $stateParams.quality = null;
      resetTypeStateParam();
      $state.go('search.result', $stateParams);
    }

    function sortItemsBy() {
      $stateParams.sort = vm.sortBy;
      $state.go('search.result', $stateParams);
    }

    function sortByDate() {
      vm.added === '' ? $stateParams.added = null : $stateParams.added = vm.added;
      $state.go('search.result', $stateParams);
    }


    function submit() {
      $state.go('search.query', {q: vm.query}).then(function () {
        vm.query = '';
      });
    }

    function searchByPrice() {
      $stateParams.priceFrom = vm.priceFrom;
      $stateParams.priceTo = vm.priceTo;

      $stateParams.trigger = $stateParams.trigger === null ? '' : null;
      $state.go('search.result', $stateParams);
    }

    function selectAllHeavies() {
      vm.selectedAllHeavies ? vm.selectedAllHeavies = true : vm.selectedAllHeavies = false;
      angular.forEach(vm.heavies, function (heavy) {
        heavy.selected = vm.selectedAllHeavies;
      });
      if (vm.selectedAllHeavies) {
        delete $stateParams.heavies;
        $stateParams.type = 'Heavy';
      }
      $state.go('search.result', $stateParams);
    }

    function selectAllRifles() {
      angular.forEach(vm.rifles, function (rifle) {
        rifle.selected = vm.selectedAllRifles;
      });

      if (vm.selectedAllRifles) {
        delete $stateParams.rifles;
        delete $stateParams.weapon;
        if ($stateParams.type) {
          //if (angular.isArray($stateParams.type)) {
          $stateParams.type.push('Rifle');
          //}
        } else {
          $stateParams.type = [];
          $stateParams.type.push('Rifle');
        }
      } else {
        delete $stateParams.type;
        delete $stateParams.weapon;
        $stateParams.sort = '-created_at';
        $stateParams.status = 'on sale';
      }
      $stateParams.trigger = $stateParams.trigger === null ? '' : null;
      $state.go('search.result', $stateParams);

    }

    function selectAllPistols() {
      vm.selectedAllPistols ? vm.selectedAllPistols = true : vm.selectedAllPistols = false;
      angular.forEach(vm.pistols, function (pistol) {
        pistol.selected = vm.selectedAllPistols;
      });
      if (vm.selectedAllPistols) {
        $stateParams.type = 'Pistol';
        delete $stateParams.pistols;
        delete $stateParams.weapon;
      } else {
        delete $stateParams.type;
        $stateParams.sort = '-created_at';
        $stateParams.status = 'on sale';
      }
      $stateParams.trigger = $stateParams.trigger === null ? '' : null;
      $state.go('search.result', $stateParams);
    }

    function buildStateParameters(key) {
      delete $stateParams.type;
      $stateParams[key] =
        _.pluck(_.filter(vm.pistols, selectedParam), 'name')
          .concat(_.pluck(_.filter(vm.rifles, selectedParam), 'name'))
          .concat(_.pluck(_.filter(vm.heavies, selectedParam), 'name'))
          .concat(_.pluck(_.filter(vm.smgs, selectedParam), 'name'))
          .concat(_.pluck(_.filter(vm.knives, selectedParam), 'name'))
          .concat(_.pluck(_.filter(vm.containers, selectedParam), 'name'))
          .concat(_.pluck(_.filter(vm.exteriors, selectedParam), 'name'));
      $state.go('search.result', $stateParams);
    }

    function selectedParam(param) {
      if (param.selected) {
        return param.name;
      }
    }

    function setSearchParams() {
      vm.pistols = _.forEach(vm.pistols, setSelectedParam());
      vm.heavies = _.forEach(vm.heavies, setSelectedParam());
      vm.rifles = _.forEach(vm.rifles, setSelectedParam());
      vm.smgs = _.forEach(vm.smgs, setSelectedParam());
      vm.knives = _.forEach(vm.knives, setSelectedParam());
      vm.containers = _.forEach(vm.containers, setSelectedParam());
      vm.exteriors = _.forEach(vm.exteriors, setSelectedParam());

      function setSelectedParam() {
        return function (weapon) {
          if (weapon.name === $state.params.weapon) {
            weapon.selected = true;
            return;
          }
        }
      }
    }

    function resetTypeStateParam() {
      $stateParams.type = null;
    }
  }

})
();
