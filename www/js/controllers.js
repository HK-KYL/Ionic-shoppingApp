angular.module('app.controllers', [])

    .controller('ladiesItemsCtrl', ['$scope', '$stateParams', 'Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, Store) {

            $scope.items = Store.getLadiesItems();
            $scope.department = "Ladies Items";

        }])

    .controller('menItemsCtrl', ['$scope', '$stateParams', 'Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, Store) {

            $scope.items = Store.getMenItems();
            $scope.department = "Men Items";

        }])

    .controller('myCartCtrl', ['$scope', '$stateParams', 'Store', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, Store) {

            $scope.$on("$ionicView.beforeEnter", function () {

                var items = Store.getSelected();

                var sum = 0;

                items.forEach(function (item) {

                    sum += item.quantity * item.price;

                });

                $scope.items = items;
                $scope.total = sum;

            });

        }])

    .controller('itemDetailsCtrl', ['$scope', '$stateParams', 'Store', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, Store, $ionicHistory) {

            $scope.item = Store.getItem($stateParams.id);

            $scope.data = {};

            $scope.quantity = $scope.item.quantity;

            $scope.addCartItem = function () {

                console.log($scope.data.quantity);

                $scope.item.quantity = $scope.data.quantity;
                $ionicHistory.goBack();

            }

        }])

    .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicHistory', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicHistory, $ionicPopup, $state) {

            $scope.data = {};

            $scope.login = function () {

                $http.post("http://localhost:1337/user/login", $scope.data)
                    .then(function (response) {

                        // A confirm dialog
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Welcome back!',
                            template: 'Go back to previous page?'
                        });

                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicHistory.goBack();
                            } else {
                                console.log('granted');
                                $state.go($state.current, {}, { reload: true });
                            }
                        });

                    }, function (response) {

                        var alertPopup = $ionicPopup.alert({
                            title: response.data,
                            template: 'Login failed. Please try again.'
                        });
                    });

            }

        }])

    .controller('landingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
