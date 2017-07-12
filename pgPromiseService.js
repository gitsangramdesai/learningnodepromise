var pgModel = require('../bluebird-sample/pgModel');
var promise = require('bluebird');



module.exports = {
    StudentInfo: function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";
        try {
            return pgModel.ExecuteQuery(query).then(function(dbResponse) {
                return new promise(function(fulfill, reject) {
                    if (!dbResponse.isSuccess) {
                        fulfill(null);
                    } else {
                        fulfill(dbResponse.result);
                    }
                });
            });
        } catch (exp) {
            throw exp;
        }
    }
}