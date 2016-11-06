'use strict';

require('angular/angular');
require('angular-route/angular-route');
require('../../dist/js/templateCache');

require('../common/commonModule');
//var baseServiceObj = require('../common/services/baseService');
//var weatherServiceObj = require('../common/services/weather.service');

angular.module('home',['ngRoute','todoPartials','common'])
.config(config);






function config($routeProvider) {

  'use strict';

  var home = {
      templateUrl: '/templates/home.html',
      controller: ['weatherService',require('./home.controller')],
      controllerAs:'ctrl',
   };

  

  $routeProvider
    .when('/',home)
    

    
    
};  