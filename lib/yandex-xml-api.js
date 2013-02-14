/** 
 * YANDEX BASIC serach Libray 
 * @author : yoann assayag
 */

var http = require("http")
  , parseString = require('xml2js').parseString;
  
  
var YandexSearch = function (user, key){
	this.user = user;
	this.key = key;
	this.BASE_URL="http://xmlsearch.yandex.com"
}
/**
 * Main function to use 
 * @param <string> query : specified query ex : "Abaram Lincoln"
 * @param <function> callback : function (Object err, Array<BasicResponse> result)
 *  BasicResponse Hashmap with 2 attributes: {url: <string> , domain : <string>}
 */ 
YandexSearch.prototype.search = function(query, callback){
	var self = this;
	this.requets(query, function (res){
		// self.processResult(res, callback)
		})
	
}  
/**
 * Make request to Yandex server
 */
YandexSearch.prototype.request(query, callback){
	
	var options = {
	  host: 'this.BASE_URL',
	  path: '/xmlsearch?user='+this.user+'&key='+this.key+'&query='+query
	};

	http.request(options, function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
		str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
		callback(str)
	  });
	}).end();
}

/**
 * Formating result in a simple way (but will lose information)
 * @param <string> xml : XML response form Yandex
 * @param <function> callback : function (Obejct err, Array<BasicResponse> result)
 *  a basic response is an object with 2 attributes: {url: <string> , domain : <string>}
 */
YandexSearch.prototype.processResult = function (xml, callback){
	parseString(xml, function (err, result) {
		if(err) {
			return callback(err);
		}	
		if(!result.yandexsearch || !result.yandexsearch.response || !result.yandexsearch.response[0]){
			return callback("Invalid Yandex response");
		}
		if(result.yandexsearch.response[0].error){
			return callback(result.yandexsearch.response[0].error[0])
		}
		if(!result.yandexsearch.response[0].results || !result.yandexsearch.response[0].results[0]){
			return callback("no reuslt");
		}
		var resultGroups = result.yandexsearch.response[0].results[0].grouping[0]
		if(resultGroups.group){
			var URLResult =[];
			for(var i = 0;i<resultGroups.group.length; i++){
				var element = resultGroups.group[i]
				if(element.doc && element.doc[0] && element.doc[0].url[0] && element.doc[0].domain[0]){
					URLResult.push({ url : element.doc[0].url[0], domain : element.doc[0].domain[0]})
				}
			}
			return callback(null, URLResult)
		}
		
	});

}


module.exports  = YandexSearch;