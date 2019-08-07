/* global AbstractPrimaryView, _ */

var XChartView = AbstractPrimaryView.extend({
    id: 'linechart',
//    tagName: 'canvas',
    className: 'viewport linechart',
    widgetTemplate: 'LineChartViewWidget',
//    contentTemplate: 'ChartMain',
    events: {
        'click .btn-box-tool': function() {
            this.$('.left-widget').toggleClass('collapsed-box');
        },
            
        'click input[type=checkbox]': function() {
            //TODO rebuild chart
        }
    },
    renderWidgetArguments: function(datasets) {
        return {lol: 'Hello !World im here!', that: this, datasets: datasets, headers: _.map(datasets, function(value, key) {
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
                        borderColor: '#000', //ANY
                        borderWidth: 1,
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

//TODO remove datasets with all values = null
        this.$el.html('<canvas/>');
        this.$el.append(this.widgetTemplate(this.renderWidgetArguments(datasets)));

        var myChart = new Chart(this.$el.children('canvas')[0], {
            type: 'bar',
            data: {
                labels: _.pluck(this.model.getCurrentNodes(), 'name'),
                datasets: _.toArray(datasets)
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display:false ,
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
                    text: 'Биков П.',
                    fontSize: 40
                },
                layout: {
                    margin: {
                    right:0
                    },
            padding: {
                left: 0,
                right: 0,
                top: 5,
                bottom: 0
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
    }
}); 

$(".box-title").html("CheckBox");
