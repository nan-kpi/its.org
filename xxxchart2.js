/* global AbstractPrimaryView, _ */

var YChartView = AbstractPrimaryView.extend({
    id: 'linechart2',
    tagName: 'canvas',
    className: 'viewport linechart',
    render: function () {
        var datasets = {};

        _.each(this.model.getCurrentNodes(), function (node, idx) {
            _.each(node.data, function(datum){
                if(!_.has(datasets, datum.tclass)) {
                    datasets[datum.tclass] = {
                        label: datum.tclass,
                        data: [],
                        borderColor: 'red', //random
                        borderWidth: 3,
                        fill: false
                    };
                }
                
                if(!datum.isNumeric()) {
                    datasets[datum.tclass].data.push(null);
                } else {
                    datasets[datum.tclass].data.push(datum.getValue());
                }
            });
        });


        var myChart = new Chart(this.el, {
            type: 'horizontalBar',
            data: {
                labels: _.pluck(this.model.getCurrentNodes(), 'name'),
                datasets: _.toArray(datasets)
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display:true ,
                    position: 'right',
                    fullWidth: false,
                    fontColor:"blue", 
                    labels: {
                        fontSize:5,
                        boxWidth:10 
                    },
                },
                title:{
                    display: true,
                    text: 'Смаглюк',
                    fontSize: 40
                },
                layout: {
                    margin: {
                    right:10
                    },
            padding: {
                left: 0,
                right: 10,
                top: 10,
                bottom: 10
                }
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        });
   
        }
       this.resizeContent();
        myChart.update();

        this.hideLoader();
        function f(x) {
            return Math.pow(x, 2);
    }
}); 


$(".linechart").css("overflow","scroll"); //Хз навіщо
