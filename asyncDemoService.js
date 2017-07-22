var async = require('async');
var pgPromiseService = require('../bluebird-sample/pgPromiseService');

module.exports = {
    mapTest: function(courseIds, callback) {
        var dbQueryFunc = function(courseId, interationCallback) {
            pgPromiseService.CourseMaterial(courseId, function(err, result) {
                if (err) {
                    return interationCallback(err, null);
                } else {
                    return interationCallback(null, result[0]);
                }
            })
        };

        async.map(courseIds, dbQueryFunc, function(err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}