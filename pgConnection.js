module.exports = {
    ExecuteQuery: function(query, callback) {
        var pg = require('pg');
        var pgConnectUrl = 'postgres://dbo:sangram@localhost:5432/poc';
        var pgClient = new pg.Client(pgConnectUrl);

        pgClient.connect(function(err) {
            if (err) {
                pgClient.end();
                callback(err, null);
            }
            pgClient.query(query, function(err, result) {
                if (err) {
                    callback(err, null);
                }
                pgClient.end();
                if (result == undefined) {
                    callback(err, result);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    },
}