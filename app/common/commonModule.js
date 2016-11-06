'use strict';

require('angular/angular');
require('restangular');
require('angular-block-ui');
var config = require('../config/config');
var baseServiceObj = require('./services/baseService');
var weatherServiceObj = require('./services/weather.service');
module.exports = angular.module('common',['restangular','blockUI'])
	.constant('_', window._)
	.constant('config',config)
	.factory('baseService', ['Restangular','_','$log','$q','blockUI','config',baseServiceObj])
    .factory('weatherService',['baseService',weatherServiceObj]);