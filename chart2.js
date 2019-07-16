function Diagram2 () {
  var ctx = document.getElementById("myChart2");
  var myChart = new Chart (ctx, {
   type: 'line',
   data: {
    labels: [], 
    datasets: [
     {
      label: 'Ln', 
      data: [], 
      borderColor: 'black', 
      borderWidth: 2, 
      fill: false 
     }
  
    	]
   	},
   options: {
    responsive: false, 
    scales: {
     xAxes: [{
      display: true
     }],
     yAxes: [{
			display: true,
			 ticks: {
				max: 8,
				min: 0,
				stepSize: 2
                }
     }]
    }
   }
  });
  //Заполняем данными
  for (var x = 0.0; x<=20; x++) {
   myChart.data.labels.push(''+x.toFixed(1));
   myChart.data.datasets[0].data.push(f(x).toFixed(1));
  }
  //Обновляем
  myChart.update();

  function f(x) { 
   return Math.log(x);
  }
 }

 window.addEventListener("load", Diagram2); 
