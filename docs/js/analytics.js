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

var ctx1_data = []
var ctx2_data = [0,0,0,0,0,0];

/*
for(var i = 0; i < data.length; i++){
    a = data[3] - data[2];
    if(a < day){
        ctx1_data[0]++; 
    }else if (a < day){
        ctx1_data[1]++; 
    }else if (a < day){
        ctx1_data[2]++; 
    }else if (a < day){
        ctx1_data[3]++; 
    }else if (a < day){
        ctx1_data[4]++; 
    }else{
        ctx1_data[5]++;
    }
    ctx2_data[i] = 
}
*/
var ctx1 = document.getElementById("requestsOverTime").getContext('2d');
var ctx2 = document.getElementById("timeBeforeClosed").getContext('2d');
var ctx3 = document.getElementById("requestsOpenTooLong").getContext('2d');

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