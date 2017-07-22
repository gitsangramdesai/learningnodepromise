var asyncDemo = require('../bluebird-sample/asyncDemoService');
var courseIds = [1, 2, 3, 4];

asyncDemo.mapTest(courseIds, function(err, result) {
    if (!err) {
        console.log('Result::');
        console.log(JSON.stringify(result));
    } else {
        console.log('Error::');
        console.log(JSON.stringify(err));
    }
});