/* global AbstractPrimaryView, _ */

var ZChartView = AbstractPrimaryView.extend({
    id: 'linechart3',
    tagName: 'canvas',
    className: 'viewport linechart',
        widgetTemplate: 'LineChartViewWidget',

    events: {
        'click .btn-box-tool': function() {
             this.$('.left-widget').toggleClass('collapsed-box');
        },
            
        'click input[type=checkbox]': function chart() {
            this.chart.update();
            return alert("Done!");
            
        }
    },
    renderWidgetArguments: function(datasets) {
        return {that: this, datasets: datasets, headers: _.map(datasets, function(value, key) {
                return key;
        })};
    },
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
        
this.$el.html('<canvas/>');
this.$el.append(this.widgetTemplate(this.renderWidgetArguments(datasets)));

        var myChart = new Chart(this.el, {
            type: 'radar',
            data: {
                labels: _.pluck(this.model.getCurrentNodes(), 'name'),
                datasets: _.toArray(datasets)
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false ,
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
                left: 0,
                right: 100,
                top: 10,
                bottom: 60
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
        
    }
}); 

$(".linechart").css("overflow","scroll");
$(".box-title").html("CheckBox");
