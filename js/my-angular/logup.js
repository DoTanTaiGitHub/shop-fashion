app.controller("MyCtrl", ["$scope", "$firebaseAuth","$location",  function($scope, $firebaseAuth,$location) {
    $scope.signUp = function (){
        var username = $scope.user.email;
        var password = $scope.user.password;
                  
        var auth = $firebaseAuth();
        auth.$createUserWithEmailAndPassword(username, password)
       .then (function(user){
            console.log(user.uid);
            alert("Sign Up successfully!");
            location.replace("../login-page.html");
        }) 
        .catch(function(error){
            console.log(error);
        });
    };

}
]);



  

    