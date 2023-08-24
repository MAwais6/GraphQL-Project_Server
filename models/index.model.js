const db = require('../config/db');

db.Projects = require('../models/Project')(db.mongoose);
db.Clients = require('../models/Client')(db.mongoose);

module.exports = db 