/** 
 * YANDEX BASIC serach Libray 
 * @author : yoann assayag
 */

var http = require("http")
  , parseString = require('xml2js').parseString;
  
  
var YandexSearch = function (user, key){
	this.user = user;
	this.key = key;
	this.BASE_URL="xmlsearch.yandex.com"
}
/**
 * Main function to use 
 * @param <string> query : specified query ex : "Abaram Lincoln"
 * @param <function> callback : function (Object err, Array<BasicResponse> result)
 *  BasicResponse Hashmap with 2 attributes: {url: <string> , domain : <string>}
 */ 
YandexSearch.prototype.search = function(query, callback){
	var self = this;
	this.request(query, function (res){
			self.processResult(res, callback)
		})
	
}  
/**
 * Make request to Yandex server
 */
YandexSearch.prototype.request= function(query, callback){
	
	var options = {
	  host: this.BASE_URL,
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
YandexSearch.prototype.processResult = function (xmlRaw, callback){
	parseString(xmlRaw, function (err, xml) { 
			// console.log(result)
			if(err) {
				return callback(err);
			}	
			
	
		if(!xml.yandexsearch || !xml.yandexsearch.response || !xml.yandexsearch.response[0]){
			return callback("Invalid Yandex response");
		}
		if(xml.yandexsearch.response[0].error){
			return callback(xml.yandexsearch.response[0].error[0])
		}
		if(!xml.yandexsearch.response[0].results || !xml.yandexsearch.response[0].results[0]){
			return callback("no reuslt");
		}
		
		if(!xml.yandexsearch.response[0].results[0].grouping || !xml.yandexsearch.response[0].results[0].grouping[0] || !xml.yandexsearch.response[0].results[0].grouping[0].group){
			return callback("invalid answer");
		}
		
		var xmlGroups = xml.yandexsearch.response[0].results[0].grouping[0]
		
			var URLxml =[];
			for(var i = 0;i<xmlGroups.group.length; i++){
				var element = xmlGroups.group[i]
				if(element.doc && element.doc[0] && element.doc[0].url[0] && element.doc[0].domain[0]){
					URLxml.push({ url : element.doc[0].url[0], domain : element.doc[0].domain[0]})

				}
			}
			setTimeout(function (){callback(null, URLxml)}, 100)
	})
}


module.exports  = YandexSearch;