module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/db.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './seeds' },
  },
};
