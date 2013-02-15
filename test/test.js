var assert = require("assert")
  , fs = require("fs")
  , YandexSearch = require("../lib/yandex-xml-api")

describe('Result processing', function(){
  describe('Normal response', function(){
    it('should return no error in case of normal response', function(){
	  var XMLResponse = fs.readFileSync("./test/responseMokup.xml");
	  var yandexSearch = new YandexSearch();
	  yandexSearch.processResult(XMLResponse, function(err, result){
		if(err) console.log(err)
		assert.ok(result, "no result returned");

	  })
	  
    })
  })
    describe('No result response', function(){
    it('should an error in case of no result', function(){
	  var XMLResponse = fs.readFileSync("./test/noResult.xml");
	  var yandexSearch = new YandexSearch();
	  yandexSearch.processResult(XMLResponse, function(err, result){
		// if(err) console.log(err)
		assert.ok(err, "no error is retuen when no result");
	  })
    })
  })
})
