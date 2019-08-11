/* global AbstractPrimaryView, _ */

var ZChartView = AbstractPrimaryView.extend({
    id: 'linechart3',
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
                        borderWidth: 6,
                        fill: true
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
            type: 'radar',
            data: {
                labels: _.toArray(datasets),
                datasets: _.pluck(this.model.getCurrentNodes(), 'name')
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true ,
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
                    text: 'Сколець',
                    fontSize: 40
                },
                layout: {
                    margin: {
                    right:10
                    },
            padding: {
                left: 10,
                right: 300,
                top: 10,
                bottom: 30
                }
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
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

$(".linechart").css("overflow","scroll");
