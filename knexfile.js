module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/food.db3",
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
	testing: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/test.db3",
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
}