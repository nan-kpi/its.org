/* global AbstractPrimaryView, _ */

var NewChartView = AbstractPrimaryView.extend({
    id: 'linechart',
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
                        borderColor: 'orange', //random
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
            type: 'line',
            data: {
                labels: _.pluck(this.model.getCurrentNodes(), 'name'),
                datasets: _.toArray(datasets)
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    display:false ,
                    position: 'right',
                    boxWidth:5,
                    fullWidth: false,
                    fontColor:"blue", //Работает
                    fontFamily:"Tahoma" , // Работает
                    fontStyle:"italic", 
                },
                layout: {
                    margin: {
                    right:50
                    },
            padding: {
                left: 0,
                right: 10,
                top: 10,
                bottom: 60
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

        this.resizeContent();
        myChart.update();

        this.hideLoader();
        function f(x) {
            return Math.pow(x, 2);
        }
    }
}); 
