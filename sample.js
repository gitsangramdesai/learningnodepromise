var pgPromiseService = require('../bluebird-sample/pgPromiseService');
var bluebirdService = require('../bluebird-sample/bluebirdService');
var awaitService = require('../bluebird-sample/awaitService');


//quering data with pg-promise 
pgPromiseService.StudentInfo(12, 6, 1).then(function(data) {
    console.log('Controller');
    console.log(JSON.stringify(data));
});

//bluebird promise methods
bluebirdService.TestPromiseJoin(12, 6, 1).then(function(data) {
    console.log('Join');
    console.log(JSON.stringify(data));
});


bluebirdService.TestPromiseAll(12, 6, 1).then(function(data) {
    console.log('all');
    console.log(JSON.stringify(data));
})

bluebirdService.TestPromiseSpread(12, 6, 1).then(function(data) {
    console.log('all');
    console.log(JSON.stringify(data));
})


bluebirdService.TestPromiseSome(12, 6, 1).then(function(data) {
    console.log('all');
    console.log(JSON.stringify(data));
})

//node 8 async await feature
awaitService.StudentInfo(12, 6, 1).then(function(data) {
    console.log('all');
    console.log(JSON.stringify(data));
})