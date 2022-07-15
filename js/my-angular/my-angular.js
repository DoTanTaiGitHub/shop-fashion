app.controller("MyCtrl", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = firebase.database().ref("Products");
    $scope.items = []
    $scope.total =0;
    $scope.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    $scope.load = () => {
        $scope.totalQuantity = 0
        $scope.totalPrice = 0
        for(var i = 0; i < $scope.cartItems.length; i++){
            $scope.totalQuantity += $scope.cartItems[i].quantity
            $scope.totalPrice += parseFloat($scope.cartItems[i].price) * $scope.cartItems[i].quantity
        }
    }
    $scope.load()
    var list = $firebaseArray(ref);

    list.$loaded()
    .then(function(x) {
        
        $scope.items = x;
        //
        $scope.pageCount = Math.ceil($scope.items.length / 6);
        // console.log($scope.pageCount);
        // console.log($scope.items);
        if(id){

        }
    })
    .catch(function(error) {
        console.log("Error:", error);
    });

    // loc theo loai
    $scope.categoryFilter = (category = '\\w+') => {
        list.$loaded()
        .then(function(x) {
            $scope.items = x.map((v) => {
                if(v.category.match(category)){
                    return v
                }
            }).filter(x => x !== undefined);
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
    }

    // loc theo gia
    $scope.priceFilter = (min = 0, max = 10000) => {
        list.$loaded()
        .then(function(x) {
            $scope.items = x.map((v) => {
                if(parseFloat(v.price) > min && parseFloat(v.price) < max){
                    return v
                }
            }).filter(x => x !== undefined);
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
    }

    // them vao gio hang
    $scope.addCart = (item, quantity=1) => {
        var isDuplicate = false;
        $scope.cartItems.forEach((v) => {
            if(item.$id === v.$id){
                isDuplicate = true
            }
        })
        if(!isDuplicate){
            item["quantity"] = quantity;
            $scope.cartItems.push(item);
            localStorage.setItem("cartItems", JSON.stringify($scope.cartItems));
            $scope.total ++;
        }
    }

    $scope.modifyQuantity = (item, value) => {
        if(value < 0){
            if(item.quantity > 1){
                item.quantity--
            }
        } else if (value > 0){
            if (item.quantity < 69 ){
                item.quantity++
            }
        }
        localStorage.setItem("cartItems", JSON.stringify($scope.cartItems))
        $scope.load();
    }
    //xoa CartItem
    $scope.removeCartItem = (item) => {
        $scope.cartItems = $scope.cartItems.filter(x => x !== item)
        localStorage.setItem("cartItems", JSON.stringify($scope.cartItems))
    }

    $scope.thanhcong = () =>{
        localStorage.clear();
        location.replace("../shopping-cart.html");
        alert("Buy successfully!");
        
    }
    $scope.detailCart= (item) =>{
       
        var isDuplicate = false
        $scope.cartItems.forEach((v) => {
            if(item.$id === v.$id){
                isDuplicate = true
            }
        })
        if(!isDuplicate){
           
            $scope.cartItems.push(item)
            localStorage.setItem("detailItems", JSON.stringify($scope.detailItems));
        }
    }

               
    // $scope.prop = "name";

    // $scope.sortBy = function(prop) {
    //     $scope.prop = prop;
    // }
    
    $scope.begin = 0;
   
    $scope.first = function() {
        $scope.begin = 0;
    }

    $scope.prev = function() {
        if ($scope.begin > 0) {
            $scope.begin -= 6;
        }
    }

    $scope.next = function() {
        if ($scope.begin < ($scope.pageCount - 1) * 6) {
            $scope.begin += 6;
        }
    }

    $scope.last = function() {
        $scope.begin = ($scope.pageCount - 1) * 6;
    }

  }

]);
