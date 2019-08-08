/* global AbstractPrimaryView, google, _ */

var YChartView = AbstractPrimaryView.extend({
    id: 'linechart2',
//    tagName: 'canvas', !!!!! це тобі все і ломало. ти давав гугл чарту канвас замість дів-а
    className: 'viewport linechart',
    daysToMilliseconds: function (days) {//переніс функцію в методи класу
        return days * 24 * 60 * 60 * 1000;
    },
    render: function () {

        google.charts.load('current', {'packages': ['gantt']}); //Завантажувати бібліотеку треба тільки раз
        google.charts.setOnLoadCallback(_.bind(function () {
            this.render = function() { //тому коли вона завантажена - замінюємо функцію рендер на нормальну
                
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Task ID');
                data.addColumn('string', 'Task Name');
                data.addColumn('date', 'Start Date');
                data.addColumn('date', 'End Date');
                data.addColumn('number', 'Duration');
                data.addColumn('number', 'Percent Complete');
                data.addColumn('string', 'Dependencies');

                data.addRows([
                    ['Research', 'Find sources',
                        new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
                    ['Write', 'Write paper',
                        null, new Date(2015, 0, 9), this.daysToMilliseconds(3), 25, 'Research,Outline'],
                    ['Cite', 'Create bibliography',
                        null, new Date(2015, 0, 7), this.daysToMilliseconds(1), 20, 'Research'],
                    ['Complete', 'Hand in paper',
                        null, new Date(2015, 0, 10), this.daysToMilliseconds(1), 0, 'Cite,Write'],
                    ['Outline', 'Outline paper',
                        null, new Date(2015, 0, 6), this.daysToMilliseconds(1), 100, 'Research']
                ]);

                var options = {
                    height: 600
                };

                this.chart = new google.visualization.Gantt(this.el);

                this.chart.draw(data, options);

                this.resizeContent(); //це має бути вкінці рендера
                
                this.hideLoader();
            };
            
            this.render();//і запускаємо її на виконання
        }, this));
    }
}); 
