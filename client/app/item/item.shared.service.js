/**
 * Created by mirko on 23.1.16..
 */
(function () {
  angular.module('skywarriorApp')
    .factory('ItemSharedService', itemSharedService);

  itemSharedService.$inject = ['Auth'];

  function itemSharedService(Auth) {
    return {
      isOwner: isOwner
    };

    //////////////////////////////////////////////////////////
    function isOwner(userId) {
      if (!userId) {
        return false;
      }
      var currentUser = Auth.getCurrentUser();
      return currentUser && currentUser.steam_user_id === userId;
    }

  }

})();
