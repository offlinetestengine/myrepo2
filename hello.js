var app = angular.module('demo', []);
app.controller('Hello', function ($scope, $http) {
    $http.get('http://node-code.herokuapp.com/').then(function (response) {
        var out = response.data;
        var last = 0,
            run = 0,
            count1 = 0,
            count2 = 0,
            str = [],
            question = [],
            anso = [],
            final = [],
            over, parsed, item, flag, taskid;
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

        // $scope.greet=parsed;

        var len = parsed.length;

        $scope.greet = parsed;

        for (var ii = 0; ii < len; ii++) {

            if (parsed[ii].match(/\d+/) != null)
                question.push(parsed[ii]);
            else if (parsed[ii].match(/A./g) != null)
                anso.push(parsed[ii]);
            else if (parsed[ii].match(/B./g) != null)
                anso.push(parsed[ii]);
            else if (parsed[ii].match(/C./g) != null)
                anso.push(parsed[ii]);
            else if (parsed[ii].match(/D./g) != null)
                anso.push(parsed[ii]);

        }
        document.getElementById("hide").value = anso.length;
        $scope.question = question;
        $scope.anso = anso;

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
            anlist = [],
            mark1 = [],
            st, key, val1;
        var timex = 0,
            fillit = [];
        $scope.list = [];
        $scope.text = '';
        $scope.submit = function () 
        {
            var inplist = document.getElementsByTagName("input");
            for (timex; timex < document.getElementById("hide").value; timex++) {
                if (inplist[timex].type == "radio") {
                    if (inplist[timex].checked) {
                        fillit.push(inplist[timex].value);
                    }
                }
            }console.log(fillit);
            if ($scope.text) {
                $scope.list.push(this.text);
                rlist = $scope.list;
                st = rlist[0];
                $scope.text = '';
                key = st.split(',');
                //    val1 = localStorage.getItem("upload2");
                val1 = fillit;
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