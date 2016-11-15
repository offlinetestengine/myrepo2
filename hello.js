var app = angular.module('demo', []);

app.controller('Hello', function ($scope, $http) {
    $http.get('http://node-code.herokuapp.com/').then(function (response) {
        var out = response.data;
        var last = 0,
            str = [],
            final = [],
            over, parsed, item, flag;
        for (flag in out[0]) {
            if (flag == "_id")
                break;
            str.push(out[0][flag]);
            last++;
        }
        for (item in str) {
            //final.push(str[item].no);
            final.push(str[item].quest);
            final.push(str[item].opt1);
            final.push(str[item].opt2);
            final.push(str[item].opt3);
            final.push(str[item].opt4);
        }
        localStorage.setItem("server", final);
        over = localStorage.getItem("server");
        parsed = over.split(',');
        $scope.greet = parsed;

        function updateOnlineStatus() {
            document.getElementById("status").innerHTML =
                "User is online";
        }

        function updateOfflineStatus() {
            document.getElementById("status").innerHTML =
                "User is offline";
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOfflineStatus);

    });

});
app.controller('upload', ['$scope', function ($scope, $http)
    {
        var rlist = [],
            st, key, val1;
        $scope.list = [];
        $scope.text = '';

        $scope.submit = function () {
            if ($scope.text) {
                $scope.list.push(this.text);
                rlist = $scope.list;
                st = rlist[0];
                $scope.text = '';
                key = st.split(',');
                val1 = localStorage.getItem("upload2");

                $.ajax({
                    url: "https://api.mlab.com/api/1/databases/offlinedb/collections/table2?apiKey=INZ1LqXv2Q23Ajn_k3eTsoxCldQBSCk-",
                    data: JSON.stringify({
                        key: val1
                    }),
                    type: "POST",
                    contentType: "application/json"
                });
            }
        };
    }]);