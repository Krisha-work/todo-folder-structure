"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
export const setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

export const up = async (db) => {
  await db.createTable("todo_data", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    title: { type: "string" },
    description: { type: "string" },
    user_id: {
      type: "int",
      foreignKey: {
        name: "user_id_fk", // Name of the foreign key
        table: "userdata", // The referenced table (e.g., users)
        mapping: "id", // The column in this table (todo_data) that refers to the foreign table
      },
    },
  });
};

export const down = async (db) => {
  await db.dropTable('todo_data');
};

export const _meta = {
  version: 1,
};
