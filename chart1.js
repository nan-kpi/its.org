
/*var NewChartView = Backbone.View.extend({
id: 'newchart',
render: */

function Diagram () {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart (ctx, {
   type: 'line',
   data: {
    labels: [], 
    datasets: [
     {
      label: 'Parabola', 
      data: [], 
      borderColor: 'green', 
      borderWidth: 3, 
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
				max: 30,
				min: 0,
				stepSize: 1
                }
     }]
    }
   }
  });

  for (var x = -10; x<=10; x++) {
   myChart.data.labels.push(''+x.toFixed(1));
   myChart.data.datasets[0].data.push(f(x).toFixed(1));
  }

  myChart.update();

  function f(x) { 
   return Math.pow(x,2);
  }
 }
 window.addEventListener("load", Diagram);
 /*
 }); */
