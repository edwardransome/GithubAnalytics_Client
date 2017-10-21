//https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, false);
    
    rawFile.onreadystatechange = function() {           
        if (rawFile.readyState === 4 && rawFile.status == "200") {            
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var data;

readTextFile("./json/angular_angular.js.json", function(text){
    data = JSON.parse(text);
    graphData();
});

function graphData(){
    var ctx1_data = [];
    var ctx2_data = [0,0,0,0,0,0];
    var ctx3_data = [];

    var n = data.length;
    document.getElementById("numberOfPullRequests").innerHTML = n;
    

    for(var i = 0; i < n; i++){
        a = data[i].duration;
        if(a < 1){
            ctx2_data[0]++; 
        }else if (a < 3){
            ctx2_data[1]++; 
        }else if (a < 5){
            ctx2_data[2]++; 
        }else if (a < 7){
            ctx2_data[3]++; 
        }else if (a < 15){
            ctx2_data[4]++; 
        }else{
            ctx2_data[5]++;
        }

        ctx1_data[i] = data[2];

        if(data[i].state == "open"){
            ctx3_data.push(data[i]);
        }
    }

    ctx3_data.sort(function compare(a,b){
        return a.duration < b.duration;
    })

    var openTooLongTable = document.getElementById("openTooLong");
    
    for(var i = 0; i < 10; i++){
        var row = openTooLongTable.insertRow(1+i);
        var title = row.insertCell(0);
        var createTime = row.insertCell(1);
        var duration = row.insertCell(2);
        title.innerHTML = ctx3_data[i].title;
        createTime.innerHTML = ctx3_data[i].created_at;
        duration.innerHTML = ctx3_data[i].duration;
    }

        

    var ctx1 = document.getElementById("requestsOverTime").getContext('2d');
    var ctx2 = document.getElementById("timeBeforeClosed").getContext('2d');

    var requestsOverTime = new Chart(ctx1, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Creation date',
                data: ctx1_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    var timeBeforeClosed = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["Under 24h", "1-2 Days", "3-4 Days", "5-6 Days", "1 - 2 Weeks", "More than 2 Weeks"],
            datasets: [{
                label: 'Time before request was closed',
                data: ctx2_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}