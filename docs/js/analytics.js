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
readTextFile("./test.json", function(text){
    data = JSON.parse(text);
    console.log(data);
});

var ctx1_data;

for(var i = 0; i < data.length; i++){
    console.log(data[i]);
}

var ctx1 = document.getElementById("requestsOverTime").getContext('2d');
var ctx2 = document.getElementById("timeBeforeClosed").getContext('2d');
var ctx3 = document.getElementById("requestsOpenTooLong").getContext('2d');
var timeBeforeClosed = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["Under 24h", "1-2 Days", "3-4 Days", "5-6 Days", "1 - 2 Weeks", "More than 2 Weeks"],
        datasets: [{
            label: 'Time before request was closed',
            data: [12, 19, 3, 5, 2, 3],
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