exports.definition = {
	config: {
		columns: {
		    "bookmarkId": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "RestaurantPermitId": "text",
		    "Bookmarked": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "bookmarks",
			idAttribute: 'bookmarkId'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};