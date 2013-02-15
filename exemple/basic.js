var YandexSearch = require("../lib/yandex-xml-api");

var yandex = new YandexSearch("USERNAME", "--YOUR KEY --");

yandex.search("abraham+lincoln", function (err, result){
	if(err) console.log(err)

    if(!err){
        for (var i =0; i<result.length; i++){
            console.log(result[i].url +" "+result[i].domain)
        }
    }
})