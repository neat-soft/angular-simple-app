/**
 * Created by mirko on 23.9.15..
 */
angular.module('swCart.fulfilment', [])
  .service('fulfilmentProvider', ['$injector', function ($injector) {

    this._obj = {
      service: undefined,
      settings: undefined
    };

    this.setService = function (service) {
      this._obj.service = service;
    };

    this.setSettings = function (settings) {
      this._obj.settings = settings;
    };

    this.checkout = function () {
      var provider = $injector.get('swCart.fulfilment.' + this._obj.service);
      return provider.checkout(this._obj.settings);
    }

  }])


  .service('swCart.fulfilment.log', ['$q', '$log', 'swCart', function ($q, $log, swCart) {

    this.checkout = function () {

      var deferred = $q.defer();

      $log.info(swCart.toObject());
      deferred.resolve({
        cart: swCart.toObject()
      });

      return deferred.promise;

    }

  }])

  .service('swCart.fulfilment.http', ['$http', 'swCart', '$rootScope', function ($http, swCart, $rootScope) {

    this.checkout = function (settings) {
      return $http.post(settings.url, {data: swCart.toObject(), options: settings.options}).success(function () {
        $rootScope.$broadcast('user:refreshData');
      })
    }
  }])


  .service('swCart.fulfilment.paypal', ['$http', 'swCart', function ($http, swCart) {


  }]);
