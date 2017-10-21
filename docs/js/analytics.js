// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function readTextFile(file, callback) {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);

  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

let data;


function graphData() {
  const ctx1Data = [];
  const ctx2Data = [0, 0, 0, 0, 0, 0];
  const ctx3Data = [];

  const n = data.length;
  // eslint says that document is not defined but when analytics.js is runned from
  // an .html, document is define.
  document.getElementById('numberOfPullRequests').innerHTML = n;


  for (let i = 0; i < n; i += 1) {
    const a = data[i].duration;
    if (a < 1) {
      ctx2Data[0] += 1;
    } else if (a < 3) {
      ctx2Data[1] += 1;
    } else if (a < 5) {
      ctx2Data[2] += 1;
    } else if (a < 7) {
      ctx2Data[3] += 1;
    } else if (a < 15) {
      ctx2Data[4] += 1;
    } else {
      ctx2Data[5] += 1;
    }

    ctx1Data[i] = data[2];

    if (data[i].state === 'open') {
      ctx3Data.push(data[i]);
    }
  }

  ctx3Data.sort((a, b) => a.duration < b.duration);

  const openTooLongTable = document.getElementById('openTooLong');

  for (let i = 0; i < 10; i += 1) {
    const row = openTooLongTable.insertRow(1 + i);
    const title = row.insertCell(0);
    const createTime = row.insertCell(1);
    const duration = row.insertCell(2);
    title.innerHTML = ctx3Data[i].title;
    createTime.innerHTML = ctx3Data[i].created_at;
    duration.innerHTML = ctx3Data[i].duration;
  }


  const ctx1 = document.getElementById('requestsOverTime').getContext('2d');
  const ctx2 = document.getElementById('timeBeforeClosed').getContext('2d');

  const requestsOverTime = new Chart(ctx1, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Creation date',
        data: ctx1Data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
  const timeBeforeClosed = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Under 24h', '1-2 Days', '3-4 Days', '5-6 Days', '1 - 2 Weeks', 'More than 2 Weeks'],
      datasets: [{
        label: 'Time before request was closed',
        data: ctx2Data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
}

readTextFile('./json/angular_angular.js.json', (text) => {
  data = JSON.parse(text);
  graphData();
});
