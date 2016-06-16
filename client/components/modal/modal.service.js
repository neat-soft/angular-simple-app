'use strict';

angular.module('skywarriorApp')
  .factory('Modal', function ($rootScope, $uibModal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $uibModal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      info: function (message) {
        var infoModal = openModal({
          modal: {
            dismissable: true,
            title: 'Info',
            html: '<p>' + message + '</p>',
            buttons: [{
              classes: 'btn-default',
              text: 'OK',
              click: function (e) {
                infoModal.close(e);
              }
            }]
          }
        }, 'modal-info');

      },

      error: function (message) {
        var errorModal = openModal({
          modal: {
            dismissable: true,
            title: 'Error',
            html: '<p>' + message + '</p>',
            buttons: [{
              classes: 'btn-danger',
              text: 'OK',
              click: function (e) {
                errorModal.close(e);
              }
            }]
          }
        }, 'modal-danger');

      },

      /* Confirmation modals */
      confirm: {

        cancel: function (callback) {
          callback = callback || angular.noop;


          return function () {
            var args = Array.prototype.slice.call(arguments);
            var name = args.shift();
            var cancelModal;

            cancelModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm cancel',
                html: '<p>Are you sure you would like to cancel <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Yes',
                  click: function (e) {
                    cancelModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'No',
                  click: function (e) {
                    cancelModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            cancelModal.result.then(function (event) {
              callback.apply(event, args);
            });
          }
        },

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function (del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function (e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function (event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
