var pgModel = require('../bluebird-sample/pgModel');
var promise = require('bluebird');


var awaitService = {
    StudentInfo: async function(studentId, collegeId, courseId) {
        var query = " select * from fn_getStudentData(" + studentId + "," + collegeId + "," + courseId + ")";
        let studentInfo
        try {
            studentInfo = await pgModel.ExecuteQuery(query, 'poc');
            return studentInfo;
        } catch (exp) {
            console.error(exp);
        } finally {

        }
    }
};

module.exports = awaitService;