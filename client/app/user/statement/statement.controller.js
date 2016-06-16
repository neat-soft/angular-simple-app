/**
 * Created by Vojkan on 10/19/2015.
 */
'use strict';
(function () {

  angular.module('skywarriorApp')
    .controller('StatementCtrl', statementCtrl);

  statementCtrl.$inject = ['UserService'];

  function statementCtrl(UserService) {
    var vm = this;

    activate();

    ////////////////////////////////////////////////
    function activate() {
      return UserService.statement().then(function(response){
        return vm.data = response.data;
      })
    }


  }

})();

