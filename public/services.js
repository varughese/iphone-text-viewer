angular.module('msg')

.service("getMessages", ['$http', function($http) {
    this.date = function(data) {
        return $http.get('/api' + '?start_date=' + data.start_date + "&end_date=" + data.end_date)
            .then(function(results) {
                return results.data;
            });
    };

    this.keyword = function(data) {
        var url = '/api' + '?keyword=' + data.keyword;
        if(data.keyword_exact) url+= "&keyword_exact=" + data.keyword_exact;
        return $http.get(url)
            .then(function(results) {
                return results.data;
            });
    };

    this.dateOne = function(date) {
        return $http.get('/api/date/' + date)
            .then(function(results) {
                return results.data;
            });
    };

}])

;
