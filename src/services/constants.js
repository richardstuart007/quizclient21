//
//  Browser Port (9003) ==> Server REMOTE server
//
exports.REMOTE_CLIENT = 'REMOTE:9003'
exports.REMOTE_SERVER = 'REMOTE:Railway'
exports.REMOTE_DATABASE = 'REMOTE:Railway'
exports.REMOTE_SERVERURL = 'https://quizserver010-production.up.railway.app'
//
//  9003 - Local Client --> Remote Server --> Remote Database
//
exports.LOC_REMOTE_REMOTE_CLIENT = 'LOCAL:9003'
//
//  9013 - Local Client --> Local Server --> Remote Database
//
exports.LOC_LOC_REMOTE_CLIENT = 'LOCAL:9013'
exports.LOC_LOC_REMOTE_SERVER = 'LOCAL:9001'
exports.LOC_LOC_REMOTE_SERVERURL = 'http://localhost:9001'
//
//  8003 - Local Client --> Local Server --> Local Database
//
exports.LOC_LOC_LOC_CLIENT = 'LOCAL:8003'
exports.LOC_LOC_LOC_SERVER = 'LOCAL:8001'
exports.LOC_LOC_LOC_DATABASE = 'LOCAL'
exports.LOC_LOC_LOC_SERVERURL = 'http://localhost:8001'
//
//  Server details
//
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
exports.URL_PROFILE = '/QuizProfile/:id'
exports.URL_TABLES = '/QuizTables'
//
//  Other Parameters
//
exports.MAX_QUESTIONS_SELECT = 50
exports.WAIT = 100
exports.WAIT_MAX_TRY = 20
