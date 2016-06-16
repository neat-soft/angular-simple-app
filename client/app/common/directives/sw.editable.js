/**
 * Created by Vojkan on 10/26/2015.
 */
'use strict';

/**
 */
angular.module('skywarriorApp')
  .directive('swEditable', function() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'app/common/directives/templates/sw.editable.html',
      scope: {
        editable: '=swEditable',
        onSave: '&swEditableOnSave'
      },
      link: function (scope, elem, attrs){
        scope.save = function () {
          scope.isEditing = false;
          scope.onSave({$val: scope.editable});
        }
      }
    };
  });
