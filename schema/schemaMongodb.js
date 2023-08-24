const db = require('../config/db');

db.Project = require('../models/Project')(db.mongoose);
db.Client = require('../models/Client')(db.mongoose);

module.exports = db 