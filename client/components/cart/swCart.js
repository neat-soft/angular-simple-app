/**
 * Created by mirko on 23.9.15..
 */

'use strict';


angular.module('swCart', ['swCart.directives'])

  .config([function () {

  }])

  .provider('$swCart', function () {
    this.$get = function () {
    };
  })

  .run(['swCart', 'swCartItem', 'store', 'RedisCartStore', 'notification', function (swCart, swCartItem, store, RedisCartStore, notification) {

    RedisCartStore.get()
      .then(function (response) {
        if(response.status === 204) {
          swCart.init();
        } else {
          swCart.$restore(response.data);
        }
      })
      .catch(function (error) {
        swCart.init();
      })

  }])

  .service('swCart', ['$rootScope', 'swCartItem', 'store', 'RedisCartStore', '$q', 'notification', 'Auth', '$window', function ($rootScope, swCartItem, store, RedisCartStore, $q, notification, Auth, $window) {

    this.init = function () {
      this.$cart = {
        shipping: null,
        taxRate: null,
        tax: null,
        items: [],
        expiresAt: null
      };
    };

    this.addItem = function (id, name, price, quantity, data) {
      var self = this;
      return Auth.isLoggedIn(function (loggedIn) {
        if (!loggedIn) {
          $window.location.href = '/auth/steam';
          event.preventDefault();
          return;
        } else {

          var inCart = self.getItemById(id);
          var deferred = $q.defer();

          if (typeof inCart === 'object') {
            //Update quantity of an item if it's already in the cart
            inCart.setQuantity(quantity, false);
            notification.info('Item already in cart');
            deferred.resolve();
          } else {
            var newItem = new swCartItem(id, name, price, quantity, data);

            RedisCartStore.getCachedItem(id)
              .then(function (response) {
                if (response.data && response.data.itemExists) {
                  $rootScope.$broadcast('swCart:alreadyInCart', newItem);
                  deferred.resolve();
                  return;
                } else {
                  // add item to cart
                  self.$cart.items.push(newItem);
                  return RedisCartStore.set(self.$cart)
                    .then(function (response) {
                      deferred.resolve();
                      self.setExpiresAt(response.data.expiresAt);
                    })
                    .catch(function (error) {
                      deferred.reject();
                    })
                }
              })
              .catch(function (error) {
                deferred.reject();
              });
          }

          return deferred.promise;
        }
      });

    };

    this.getItemById = function (itemId) {
      var items = this.getCart().items;
      var build = false;

      angular.forEach(items, function (item) {
        if (item.getId() === itemId) {
          build = item;
        }
      });
      return build;
    };

    this.setShipping = function (shipping) {
      this.$cart.shipping = shipping;
      return this.getShipping();
    };

    this.getShipping = function () {
      if (this.getCart().items.length === 0) return 0;
      return this.getCart().shipping;
    };

    this.getExpiresAt = function () {
      if (!this.getCart()) {
        return null;
      }
      return this.getCart().expiresAt
    };

    this.setExpiresAt = function (expiresAt) {
      this.$cart.expiresAt = expiresAt;
      return this.getExpiresAt();
    };

    this.setTaxRate = function (taxRate) {
      this.$cart.taxRate = +parseFloat(taxRate).toFixed(2);
      return this.getTaxRate();
    };

    this.getTaxRate = function () {
      return this.$cart.taxRate
    };

    this.getTax = function () {
      return +parseFloat(((this.getSubTotal() / 100) * this.getCart().taxRate )).toFixed(2);
    };

    this.setCart = function (cart) {
      this.$cart = cart;
      return this.getCart();
    };

    this.getCart = function () {
      return this.$cart;
    };

    this.getItems = function () {
      return this.getCart().items;
    };

    this.getTotalItems = function () {
      if(!this.getCart()) {
        return 0;
      }
      var count = 0;
      var items = this.getItems();
      angular.forEach(items, function (item) {
        count += item.getQuantity();
      });
      return count;
    };

    this.getTotalUniqueItems = function () {
      return this.getCart().items.length;
    };

    this.getSubTotal = function () {
      var total = 0;
      angular.forEach(this.getCart().items, function (item) {
        total += item.getTotal();
      });
      return +parseFloat(total).toFixed(2);
    };

    this.totalCost = function () {
      return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
    };


    this.removeItem = function (index) {
      var self = this;
      var itemToDelete = this.$cart.items[index];
      RedisCartStore.removeItem(itemToDelete.getId()).then(function (response) {
        self.$cart.items.splice(index, 1);
        $rootScope.$broadcast('swCart:itemRemoved', {});
        $rootScope.$broadcast('swCart:change', {});
        if (self.isEmpty()) {
          self.empty();
        }
      });
    };

    this.empty = function () {
      var self = this;
      RedisCartStore.remove().then(function (response) {
        $rootScope.$broadcast('swCart:change', {});
        self.init();
      })
    };

    this.onCartExpired = function () {
      this.init();
    };

    this.isEmpty = function () {

      return (this.$cart.items.length > 0 ? false : true);

    };

    this.toObject = function () {

      if (this.getItems().length === 0) return false;

      var items = [];
      angular.forEach(this.getItems(), function (item) {
        items.push(item.toObject());
      });

      return {
        shipping: this.getShipping(),
        tax: this.getTax(),
        taxRate: this.getTaxRate(),
        subTotal: this.getSubTotal(),
        totalCost: this.totalCost(),
        expiresAt: this.getExpiresAt(),
        items: items
      }
    };


    this.$restore = function (storedCart) {
      var self = this;
      self.init();
      self.$cart.shipping = storedCart.shipping;
      self.$cart.tax = storedCart.tax;
      self.$cart.expiresAt = storedCart.expiresAt;
      angular.forEach(storedCart.items, function (item) {
        self.$cart.items.push(new swCartItem(item._id, item._name, item._price, item._quantity, item._data));
      });
      //this.$save();
    };

    this.$save = function () {
      return store.set('cart', JSON.stringify(this.getCart()));
    }

  }])

  .factory('swCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

    var item = function (id, name, price, quantity, data) {
      this.setId(id);
      this.setName(name);
      this.setPrice(price);
      this.setQuantity(quantity);
      this.setData(data);
    };


    item.prototype.setId = function (id) {
      if (id)  this._id = id;
      else {
        $log.error('An ID must be provided');
      }
    };

    item.prototype.getId = function () {
      return this._id;
    };


    item.prototype.setName = function (name) {
      if (name)  this._name = name;
      else {
        $log.error('A name must be provided');
      }
    };
    item.prototype.getName = function () {
      return this._name;
    };

    item.prototype.setPrice = function (price) {
      var priceFloat = parseFloat(price);
      if (priceFloat) {
        if (priceFloat <= 0) {
          $log.error('A price must be over 0');
        } else {
          this._price = (priceFloat);
        }
      } else {
        $log.error('A price must be provided');
      }
    };
    item.prototype.getPrice = function () {
      return this._price;
    };


    item.prototype.setQuantity = function (quantity, relative) {


      var quantityInt = parseInt(quantity);
      if (quantityInt % 1 === 0) {
        if (relative === true) {
          this._quantity += quantityInt;
        } else {
          this._quantity = quantityInt;
        }
        if (this._quantity < 1) this._quantity = 1;

      } else {
        this._quantity = 1;
        $log.info('Quantity must be an integer and was defaulted to 1');
      }
      $rootScope.$broadcast('swCart:change', {});

    };

    item.prototype.getQuantity = function () {
      return this._quantity;
    };

    item.prototype.setData = function (data) {
      if (data) this._data = data;
    };

    item.prototype.getData = function () {
      if (this._data) return this._data;
      else $log.info('This item has no data');
    };


    item.prototype.getTotal = function () {
      return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
    };

    item.prototype.toObject = function () {
      return {
        id: this.getId(),
        name: this.getName(),
        price: this.getPrice(),
        quantity: this.getQuantity(),
        data: this.getData(),
        total: this.getTotal()
      }
    };

    return item;

  }])

  .service('store', ['$window', function ($window) {

    return {

      get: function (key) {
        if ($window.localStorage [key]) {
          var cart = angular.fromJson($window.localStorage [key]);
          return JSON.parse(cart);
        }
        return false;

      },


      set: function (key, val) {

        if (val === undefined) {
          $window.localStorage.removeItem(key);
        } else {
          $window.localStorage [key] = angular.toJson(val);
        }
        return $window.localStorage [key];
      }
    }
  }])

  .service('RedisCartStore', ['$http', function ($http) {
    return {

      getCachedItem: function (itemId) {
        return $http.get('/cart/item', {params: {itemId: itemId}});
      },

      cacheItem: function (value) {
        return $http.post('/cart/item', value);
      },

      get: function () {
        return $http.get('/cart');
      },

      set: function (value) {
        return $http.post('/cart', value);
      },

      remove: function () {
        return $http.delete('/cart');
      },

      removeItem: function (itemId) {
        return $http.delete('/cart/item/' + itemId);
      }

    }
  }])

  .controller('CartController', ['$scope', '$rootScope', 'swCart', function ($scope, $rootScope, swCart) {
    $scope.swCart = swCart;

    $rootScope.$on('swCart:change', function () {
    });

    $rootScope.$on('swCart:checkout_failed', function (event, data) {
      notification.error('Checkout failed');
    });

    $rootScope.$on('swCart:itemAdded', function (event, data) {
      notification.success('Item has been added to cart', 'Cart');
    });

    $rootScope.$on('swCart:alreadyInCart', function (event, data) {
      notification.error('This item has been placed in someone else cart');
    });

  }])

  .value('version', '1.0.0');
