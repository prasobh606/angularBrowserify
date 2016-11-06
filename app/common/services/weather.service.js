

 module.exports  =     function (baseService) {
        var serviceObject =  baseService.generate('/forecast/');

        serviceObject.click = function(){
            console.log('test success');
        }
        // Always return a host Object instead of the revealing module pattern.
        // This is due to the way Object references are bound and updated.
        // Primitive values cannot update alone using the revealing module pattern.
        return serviceObject;
}



