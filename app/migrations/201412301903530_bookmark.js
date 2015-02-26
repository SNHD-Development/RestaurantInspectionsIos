migration.up = function(db) {
    db.createTable({
        columns: {
		    "bookmarkId": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "RestaurantPermitId": "string",
		    "Bookmarked": "boolean"
		},
		adapter: {
			type: "sql",
			collection_name: "bookmarks",
			idAttribute: 'bookmarkId'
		}
    });
};

migration.down = function(db) {
    db.dropTable("bookmarks");
};
