angular.module('msg', [])

.controller('main', ['$scope', 'getMessages', function($scope, getMessages) {
    $scope.type = 'date';

    $scope.data = {
        start_date: new Date('8/25/2014'),
        end_date: new Date('8/29/2014')
    };

    $scope.startVal = 0;

    $scope.nextPage = function() {
        $scope.startVal += 38;
        $scope.startVal = Math.min($scope.startVal, $scope.messages.length-40);
    };

    $scope.prevPage = function() {
        $scope.startVal -= 38;
        $scope.startVal = Math.max($scope.startVal, 0);
    };

    $scope.messages = [];

    $scope.getData = function() {
        getMessages[$scope.type]($scope.data)
            .then(function(results) {
                console.log(results);
                $scope.startVal = 0;

                $scope.messages = results;
            });
    };
}])

;
