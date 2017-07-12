var pgModel = require('../bluebird-sample/pgModel');
var promise = require('bluebird');


var bluebirdService = {
    TestPromiseJoin: function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";

        try {
            return new promise(function(fulfill, reject) {
                return promise.join(
                    pgModel.ExecuteQuery(query),
                    pgModel.ExecuteQuery(query),
                    function(ra1, ra2) {
                        var d = { ra1: ra1, ra2: ra2 };
                        fulfill(d);
                    });
            });
        } catch (exp) {
            console.log(exp);
        }
    },
    TestPromiseAll: function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";

        try {
            return new promise(function(fulfill, reject) {
                return promise.all([
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription')),
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription'))
                ]).then(results => {
                    var o = { a: results[0], b: results[1] };
                    fulfill(o);
                })
            });
        } catch (exp) {
            console.log(exp);
        }
    },
    TestPromiseSpread: function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";

        try {
            return new promise(function(fulfill, reject) {
                return promise.all([
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription')),
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription'))
                ]).spread(function(ra1, ra2) {
                    fulfill({
                        a: ra1,
                        b: ra2
                    });
                });
            });
        } catch (exp) {
            console.log(exp);
        }
    },
    TestPromiseSome: function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";

        try {
            return new promise(function(fulfill, reject) {
                return promise.some([
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription')),
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription')),
                    promise.resolve(pgModel.ExecuteQuery(query, 'subscription')),
                ], 2).spread(function(ra1, ra2, ra3) {
                    fulfill({
                        a: ra1,
                        b: ra2,
                        c: ra3
                    });
                });
            });
        } catch (exp) {
            console.log(exp);
        }
    }
};

module.exports = bluebirdService;