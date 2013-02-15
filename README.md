#YANDEX XML API

## Introduction 
   Yandex is an interesting search engin : http://yandex.com  
   Here is a very basic libray to query its search API : http://xml.yandex.com/  
   It get the URL of the first page 

## Usage Exemple

	`YandexSearch = require("yandex-xml-api")
	yandex = new YandexSearch(userName, YandexKey)
	
	yandex.search("my super query", function (err, results){
		if(!err){
			for (var i =0; i<result.length; i++){
				console.log(result[i].url +" "+result[i].domain)
			}
		}
	})`
