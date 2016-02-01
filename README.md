# Southern Nevada Restaurant Inspections - IOS 

Southern Nevada Restaurant Inspections is a mobile application made to browse restaurant inspection data for locations in Southern Nevada. This application can be used as an example of building mobile apps using Appcelerator Titanium, and it can be customized for other uses.

### Usage
Edit the config.json and set MockDataMode to true.
```sh
{
   	"MockDataMode": true,
}
```

Alternatively, you can set up a web service to output data similar to that in app/lib/mockdata.js for the corresponding endpoints. You can add a file named /app/lib/privateconfig.js with the following data to setup basic authentication. 
```sh
{
   	"Username": "<YOUR_USERNAME>",
	"Password": "<YOUR_PASSWORD>",
	"YelpConsumerKey": "<YELP_CONSUMER_KEY>",
	"YelpConsumerSecret": "<YELP_CONSUMER_SECRET>",
    "YelpAccessTokenKey": "<YELP_ACCESS_TOKEN_KEY>",
    "YelpAccessTokenSecret":"<YELP_ACCESS_TOKEN_SECRET>"
}
```

### Screenshots

![Alt text](/screenshots/4_1.png?raw=true "Nearby Restaurants")
![Alt text](/screenshots/4_2.png?raw=true "Restaurant Inspection Detail")
![Alt text](/screenshots/4_3.png?raw=true "Bookmarked Restaurants")
