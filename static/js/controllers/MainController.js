var module = angular.module('MainController', [ 'DomainFactory']);

module.controller('MainController', ['$scope', '$location', '$anchorScroll', 'DomainFactory', function($scope, $location, $anchorScroll, domainFactory) {
    $scope.domains = { };
    $scope.domainInputVal = '';
    $scope.bundleIdentifier = '';
    $scope.teamIdentifier = '';
    $scope.filename = '';
    $scope.showresultsvalue = false;

    $scope.scrollTo = function() {
        $location.hash('resultsbox');
        $anchorScroll();
    }

    $scope._defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };

    $scope.keyUp = function(evt) {
        if (evt.keyCode == 13) {
            $scope.beginTest();
        }
    };

    $scope.cleanDomain = function() {
        var url = $scope.domainInputVal;
        url = url.replace(/https?:\/\//, '');
        url = url.replace(/\/.*/, '');
        $scope.domainInputVal = url;
    };

    $scope.beginTest = function() {
        if (!$scope.domainInputVal.length) {
            alert('Domain is required');
            return;
        }
        else {
            $scope.cleanDomain();
            domainFactory.testDomain($scope.domainInputVal, $scope.bundleIdentifier, $scope.teamIdentifier)
                .then(function(domains) {
                    $scope.domains = domains;
                    $scope.showresultsvalue = true;
                })
                .catch(function(err) {
                    alert(err);
                });
        }
    };

    $scope.listGroupItemClassForValue = function(badValue) {
        if (badValue === true) {
            return 'list-group-item-danger';
        }
        else if (badValue === false) {
            return 'list-group-item-success';
        }

        return 'disabled';
    };

    $scope.glyphiconClassForValue = function(badValue) {
        if (badValue === true) {
            return 'glyphicon-remove';
        }
        else if (badValue === false) {
            return 'glyphicon-ok';
        }

        return 'glyphicon-minus';
    };

    $scope.displayMessage = function(type, didErrorOccur){
        if(type === 'badDns' && didErrorOccur === 'success_without_congrats') {
            return 'Your domain is valid (valid DNS).';
        }
        else if(type === 'badDns' && didErrorOccur){
            return 'Your domain does not have valid DNS.';
        }
        else if(type === 'badDns' && didErrorOccur === false) {
                return 'Congrats! Your domain is valid (valid DNS).';
        }
        else if(type === 'badDns' && didErrorOccur === undefined) {
            return 'DNS check did not occur.';
        }
        if(type === 'httpsFailure' && didErrorOccur){
            return 'Your file must be served over HTTPS. It is recommended that you check with your network provider to support SSL/TLS.  Branch can help you do some of this as well. ';
        }
        else if(type ==='httpsFailure' && didErrorOccur === false){
            return 'Your file is served over HTTPS.';
        }
        else if(type === 'httpsFailure' && didErrorOccur === undefined){
            return 'HTTPS error check did not run. We’ll check that your file is served over HTTPS. Make sure your network provider supports SSL/TLS. Branch can make this easier for you. ';
        }
        if(type === 'serverError' && didErrorOccur){
            return 'Your server returned an error status code (>= 400). This includes client side and server side errors. Want to know what this means? Click here.';
        } 
        else if (type === 'serverError' && didErrorOccur===false){
            return 'Your server does not return error status codes greater than 400.';
        } 
        else if (type === 'serverError' && didErrorOccur===undefined){
            return 'Server error check did not run.';
        } 
        if(type === 'badContentType' && didErrorOccur){
            return 'Your file\'s \'content-type\' header was not found or was not recognized.';
        }
        else if (type === 'badContentType' && didErrorOccur===false){
            return 'Your file\'s \'content-type\' header was found :)';
        }
        else if (type === 'badContentType' && didErrorOccur===undefined){
           return 'Content type test did not run. Be sure to define a ‘content-type’ header.';   
        }
        if(type == 'invalidJson' && didErrorOccur){
            return 'Your file should contain valid JSON (using simple JSON.parse). This can be tripped by things like having an extraneous NULL at the end of your string. For a useful tool to validate your JSON click ';
        }
        else if(type == 'invalidJson' && didErrorOccur===false){
            return 'Your JSON is validated.';    
        }
        else if (type === 'invalidJson' && didErrorOccur===undefined){
           return 'JSON test did not run. Your file should contain valid JSON. ';   
        }
        return '';
    };

    $scope.aasaIsEntirelyValid = function(results) {
        return results != undefined && results.jsonValid && (results.bundleIdentifierFound === true || results.bundleIdentifierFound === undefined);
    };

    $scope.aasaValidButIdentfiersDontMatch = function(results) {
        return results != undefined && results.bundleIdentifierFound === false;
    }

    $scope.aasaValidButFormatInvalid = function(results) {
        return results != undefined && results.jsonValid === false;
    };

    $scope.isEmpty = function(obj) {
        return obj === undefined || Object.keys(obj).length == 0;
    };

    $scope.prettyPrintAASA = function(aasa) {
        return JSON.stringify(aasa, null, 4);
    };
}]);
