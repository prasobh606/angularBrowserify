

'use strict';
function MainCtrl(weatherService) {
	var vm = this;
	vm.name = "Weather Forcast";
	vm.author = 'prasobh Nandu';
	vm.person="good";

	vm.getWeather = function(){
		var query = {	q:'London',
						mode:'Json'};

		weatherService.getData({},query,{}).then(vm.displayData,vm.errorHandler);
	};
	vm.displayData = function(response){
			console.log(response)
			vm.list = response.list;
	};
	vm.errorHandler = function(response){
		console.log("error",response.message);
	}
 
};


module.exports = MainCtrl;