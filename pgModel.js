var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:sangram@localhost:5432/poc';
var db = pgp(connectionString);


module.exports = {
    ExecuteQuery: function(query) {
        var dbResponse = {
            isSuccess: false,
            result: null,
            message: null,
            error: null
        };

        return db.any(query)
            .then(data => {
                return new promise(function(fulfill, reject) {
                    fulfill({
                        result: data,
                        isSuccess: true,
                        error: null,
                        message: "data retreived successfully"
                    });
                });
            })
            .catch(error => {
                return new promise(function(fulfill, reject) {
                    fulfill({
                        result: data,
                        isSuccess: true,
                        error: error,
                        message: "data retreived successfully"
                    });
                });
            })
            .finally(() => {
                pgp.end();
            });
    }
};