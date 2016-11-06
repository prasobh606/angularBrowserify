


 
	
 module.exports  =   function(Restangular, _ ,$log,$q,blockUI,config) {
        return {
            generate: generate
        };
        function generate(url){

        	var splits;

        	if (url) {
                splits = url.split('/');
                splits = _.compact(splits);
                

                return {
                    getData: getData
                   
                };
            }

            ////////////////////////////////////

            function getData(urlParams, queryString, headers) {
                blockUI.start();
                var rest = getRestObject(splits, urlParams, true);
                queryString.appid = config.appId;
                return rest.get(queryString, headers).then(function (data) {
                    
                    blockUI.stop();
                    return data;
                }, function (reason) {
                    blockUI.stop();
                   
                    return $q.reject(reason);
                   
                });
            }


             function getRestObject(splits, params, isGetAllOrPost) {
                var rest = Restangular;
                var baseUrl = config.apiUrl;
                rest.setBaseUrl(baseUrl);
                var i = 0;
                var key1 = splits[i];
                if (isGetAllOrPost) {
                    rest = rest.one(key1);
                }

                return rest;
            }
        }
   }

   