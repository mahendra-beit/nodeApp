var app = angular.module('myApp', []);
app.controller('myCtrl',['$scope','httpservice', function($scope,httpservice) {
     $scope.pattern ="";
      $scope.companies2 = ['abc','xyz','pqr'];
      $scope.companies = []; //[];

    $scope.readpattern = function(){    
        console.log($scope.pattern);
        httpservice.getCompanies($scope.pattern)
        //$scope.companies =  httpservice.getCompanies($scope.pattern);
        //console.log($scope.companies)
        httpservice.getCompanies($scope.pattern).then(
                     (data)=>{ 
                            $scope.companies = data;
                            $scope.$digest();
                           
                        },
                        (error)=>{
                             $scope.companies = [];
                             $scope.$digest();
            })
    }

}]);
app.service('httpservice',['$http',function($http){
    this.getCompanies = function(pattern){
        return new Promise(function(resolve,reject){
            $http.get("http://localhost:4780/mongoApi/cname/^"+pattern).then(
            (res)=>{ resolve(res.data);/*console.log(data) */},
            (error)=>{ reject([]); /*console.log(error)*/ }
            );
        });
        
        
        //return [{name:res.data}];
    }
    
}]);