var pgModel = require('../bluebird-sample/pgModel');
var pgConnection = require('../bluebird-sample/pgConnection');
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
    },

    CourseMaterial: function(courseId, callback) {
        var query = " select * from fn_course_material('" + courseId + "')";
        console.log('Query ||' + query);
        try {
            pgConnection.ExecuteQuery(query, function(err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (exp) {
            console.log('Exception');
            console.log(JSON.stringify(exp));
            throw exp;
        }
    }
}