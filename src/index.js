
import db from './database/index.js'
import start_server from './server.js'
import './config/environment.js'

// console.log(db, "yujjjjjjefuyuytei");

db.connect().then(start_server())

