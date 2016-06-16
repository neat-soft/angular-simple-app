'use strict';

angular.module('skywarriorApp')
  .factory('User', function ($resource, ItemTransformator) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        update: {
          method: 'POST',
          params: {
            controller: 'update'
          }
        },
        inventory: {
          method: 'GET',
          isArray: true,
          params: {
            id: 'me',
            controller: 'inventory'
          },
          transformResponse: function (data) {
            data = angular.fromJson(data);
            ItemTransformator.transform(data);
            return data;
          }
        },
        makeSellOffer: {
          method: 'POST',
          params: {
            id: 'makeBuyOffer' // from bot point of view
          }
        },
        makeBuyOffer: {
          method: 'POST',
          params: {
            id: 'makeSellOffer' // from bot point of view
          }
        },
        getSellingItems: {
          method: 'GET',
          params: {
            id: 'sellingItems'
          },
          isArray: true,
          transformResponse: function (data) {
            if (_.isEmpty(data) || _.isNull(data)) {
              return [];
            }
            data = angular.fromJson(data);
            ItemTransformator.transform(data);
            return data;
          }
        }
      });
  });
