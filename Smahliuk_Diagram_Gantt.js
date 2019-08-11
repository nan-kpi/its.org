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
                data.addColumn('string', 'Resource');
                data.addColumn('date', 'Start Date');
                data.addColumn('date', 'End Date');
                data.addColumn('number', 'Duration');
                data.addColumn('number', 'Percent Complete');
                data.addColumn('string', 'Dependencies');
                var TestDataSet = [
                    ['Research', 'Find sources',
                        new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
                    ['Write', 'Write paper',
                        null, new Date(2015, 0, 9), this.daysToMilliseconds(3), 25, 'Research,Outline'],
                    ['Cite', 'Create bibliography',
                        null, new Date(2015, 0, 7), this.daysToMilliseconds(1), 20, 'Research'],
                    ['Complete', 'Hand in paper',
                        null, new Date(2015, 0, 10), this.daysToMilliseconds(1), 0, 'Cite,Write'],
                    ['Outline', 'Outline paper',
                        null, new Date(2015, 0, 6), this.daysToMilliseconds(1), 100, 'Research'],
                    ['NewTEXT', 'Some text',
                        null, new Date(2015, 0, 6), this.daysToMilliseconds(2), 80, 'Research'],
                    ['New Program', 'StartNewProgram',
                        new Date(2015, 0, 7), new Date(2015, 0, 12), null,  100,  null]
                ];
                var myDataSet = [
            ['058467', 'Побудова Стадіону Голінський', '0',
            new Date(2011, 2, 1), new Date(2012, 2, 11), null, 78, null],
            
            ['071489','Виділення земельної ділянки','1',             
             new Date(2011, 2, 1),new Date(2011, 2, 30) ,null,100, null],
            
            ['074759','Тендер: оголошення тендеру','2',
             new Date(2011, 2, 5),new Date(2011, 2, 16) ,null,100, null],
            ['074760','Тендер: реєстрація пропозицій','2',
             new Date(2011, 2, 16),new Date(2011, 2, 25) ,null,100, '074759'],
            ['074761','Тендер: перевірка ліцензій','2',
             new Date(2011, 2, 23),new Date(2011, 2, 27) ,null,100, '074759'],
            ['074762','Тендер: огляд витрат','2',
             new Date(2011, 2, 27),new Date(2011, 3, 10) ,null,100, '074759'],
            ['074763','Тендер: укладення договору','2',
             new Date(2011, 3, 10),new Date(2011, 3, 16) ,null,100, '074759'],
            
            ['086457','Закупівля матеріалів','3',
             new Date(2011, 4, 1),new Date(2011, 6, 10) ,null,80, '074763'],
            
            ['097458','Побудова частин стадіону: фасад','4',
             new Date(2011, 5, 26),new Date(2011, 8, 10) ,null,88, '086457'],
            ['097459','Побудова частин стадіону: дах','4',
             new Date(2011, 7, 26),new Date(2011, 12, 10) ,null,90, '086457'],
            ['097461','Побудова частин стадіону: ліве крило','4',
             new Date(2011, 8, 10),new Date(2011, 8, 26) ,null, 82, '086457'],
            ['097462','Побудова частин стадіону: праве крило','4',
             new Date(2011, 9, 26),new Date(2011, 11, 10) ,null,35, '086457'],
            ['097463','Кінцеві роботи','4',
             new Date(2012,0, 15),new Date(2012, 1,28) ,null,100, '086457'],
            ['097460','Контроль термінів будування','4',
             new Date(2012,1, 28),new Date(2012, 2, 6) ,null,100, '086457'],
            ['125465','Відкриття стадіону','5',
             new Date(2012,2, 10),new Date(2012, 2, 11) ,null,100, '086457'],
        ];
                data.addRows(myDataSet);

                   var options = {
               backgroundColor: {
                   fill: 'white'
               },
               height: 1000,
               width: 1000,  
              gantt: {  
                  arrow: {
                    spaceAfter: 4, 
                      length: 5,
                      angle: 40,
                      radius: 5,
                  },

                  labelMaxWidth: 300,

                  percentEnabled: true,

                  trackHeight: 40,

                  //innerGridHorizLine: null,

                  barCornerRadius: 6, //2
                  barHeight: null,

                criticalPathEnabled: false,
                criticalPathStyle: {
                  stroke: '#e64a19',
                  strokeWidth: 5
                }


              }
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
