 


    var myApp = angular.module("myApp", ['textAngular','ngRoute','ui-notification']);
    myApp.directive('file', function () {
        return {
            scope: {
                file: '='
            },
            link: function (scope, el, attrs) {

                el.bind('change', function (event) {
                    var file = event.target.files[0];
                    scope.file = file ? file : undefined;
                    scope.$apply();
                });
            }
        };
    });
    myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/admin', {
                templateUrl: 'admin.html',
                controller: 'admin'
            }).
            when('/user', {
                templateUrl: 'template.html',
                controller: 'userList'
            }).
            otherwise({
                redirectTo: '/'

            });
    }]);
    myApp.controller('admin', function admin($scope, $http, Notification) {
    $scope.htmlContent = 'Hello';
    console.log($('input[type="file"]'));
    $scope.submitForm = function(){
        
        
        if($scope.email && $scope.password && $scope.file && $scope.htmlContent ){
             
             $http({
                method: 'POST',
                url: 'http://localhost:3000/insert',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    email : $scope.email,
                    password : $scope.password,
                    richText : $scope.htmlContent,
                    image: $scope.file
                },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    var headers = headersGetter();
                    delete headers['Content-Type'];
                    return formData;
                }
            })
            .success(function (data) {
                Notification.success({
                    message: 'Data has been submitted succesfully', 
                    positionY: 'bottom', 
                    positionX: 'right'
                });
                 
                $scope.email = '';               
                $scope.password = '';
                $scope.htmlContent = '';
                $('input[type="file"]').val(null);
            })
            .error(function (data, status) {
                Notification.error({
                    message: 'Something went wrong.', 
                    positionY: 'bottom', 
                    positionX: 'right'
                });
            });
             
            
        }else{
            alert('please input something');
        }
    };

});
myApp.controller('userList', function ($scope, $http) {
    $scope.url = "http://localhost:3000/";
    $http.get("http://localhost:3000/user").success(function(response) {
         $scope.user = response;

    });
});