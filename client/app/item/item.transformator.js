/**
 * Created by mirko on 28.9.15..
 */

'use strict';

angular.module('skywarriorApp')
  .service('ItemTransformator', function () {

    this.transform = function (data) {
      if (_.isArray(data)) {
        _.forEach(data, function (item) {
          transformData(item)
        })
      } else {
        transformData(data)
      }
      return data;
    };

    /** --------------- HELPER METHODS ------------------  */
    // FIXME this should be done on server side
    function transformData(data) {
      // set collection name
      _.assign(data, {item_set: _.result(_.find(data.tags, {'category': 'ItemSet'}), 'name')});
      // set category type
      _.assign(data, {type: _.result(_.find(data.tags, {'category': 'Type'}), 'name')});
      // quality
      _.assign(data, {quality: _.result(_.find(data.tags, {'category': 'Quality'}), 'name')});
      // exterior
      _.assign(data, {exterior: _.result(_.find(data.tags, {'category': 'Exterior'}), 'name')});
    }
  });
