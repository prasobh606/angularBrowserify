(function(module) {
try {
  module = angular.module('todoPartials');
} catch (e) {
  module = angular.module('todoPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/aboutMe.html',
    '<h3><span class="label label-default">Weather in London, GB</span></h3>');
}]);
})();

(function(module) {
try {
  module = angular.module('todoPartials');
} catch (e) {
  module = angular.module('todoPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/home.html',
    '\n' +
    '<h3><span class="label label-default">Weather in London, GB</span></h3>\n' +
    '\n' +
    '\n' +
    '<div class="row">\n' +
    '\n' +
    '	<div class="col-md-12">\n' +
    '		<div class="btn btn-primary" ng-click="ctrl.getWeather()">get Weather forcast</div>\n' +
    '	</div>\n' +
    '</div>	\n' +
    '\n' +
    '<div class="row" ng-repeat="list in ctrl.list">\n' +
    '	<div class="col-md-12 well">\n' +
    '		<div class="col-xs-2">Time:<span ng-bind="list.dt_txt"></span></div>\n' +
    '		<div class="col-xs-3">\n' +
    '			<div class="col-xs-12">grnd_level:<span ng-bind="list.main.grnd_level"></span></div>\n' +
    '			<div class="col-xs-12">humidity:<span ng-bind="list.main.humidity"></div>\n' +
    '			<div class="col-xs-12">temp:<span ng-bind="list.main.temp"></div>\n' +
    '			<div class="col-xs-12">temp_max:<span ng-bind="list.main.temp_max"></div>\n' +
    '			<div class="col-xs-12">temp_min:<span ng-bind="list.main.temp_min"></div>\n' +
    '		</div>\n' +
    '		<div class="col-xs-2">\n' +
    '			<div class="col-xs-12">main:<span ng-bind="list.weather[0].main"></span></div>\n' +
    '			<div class="col-xs-12">description:<span ng-bind="list.weather[0].description"></span></div>\n' +
    '		</div>\n' +
    '		<div class="col-xs-2">\n' +
    '			<div class="col-xs-12">Wind Speed:<span ng-bind="list.wind.Speed"></span></div>\n' +
    '			<div class="col-xs-12">deg:<span ng-bind="list.wind.deg"></span></div>\n' +
    '		</div>\n' +
    '		<div class="col-xs-2">sys-pod:<span ng-bind="list.sys.pod"></span></div>\n' +
    '		\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('todoPartials');
} catch (e) {
  module = angular.module('todoPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/weather.html',
    '<h3><span class="label label-default">Weather in London, GB</span></h3>');
}]);
})();
