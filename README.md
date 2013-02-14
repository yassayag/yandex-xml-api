==YANDEX XML API

== Introduction 
	Very basic libray to query Yandex and get the URL of the first page

== Usage Exemple

	`YandexSearch = require("yandex-xml-api")
	yandex = new YandexSearch(userName, YandexKey)
	
	yandex.search("my super query", function (err, results){
		if(!err){
			for (var i =0; i<result.length; i++){
				console.log(result[i].url +" "+result[i].domain)
			}
		}
	})`