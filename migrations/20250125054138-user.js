'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
export const setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

export const up = async (db) => {
  await db.createTable('userdata', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    username: { type: 'string'},
    email: { type: 'string'},
    password : {type :'string'},
    contact : {type : 'string'}
  });
};

export const down = async(db) => {
  await db.dropTable('userdata');
};

export const _meta = {
  "version": 1
};
