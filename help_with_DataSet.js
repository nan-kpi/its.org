/* global AbstractPrimaryView, google, _ */

var YChartView = AbstractPrimaryView.extend({
    id: 'linechart2',
//    tagName: 'canvas', !!!!! це тобі все і ломало. ти давав гугл чарту канвас замість дів-а
    className: 'viewport linechart',
    daysToMilliseconds: function (days) {//переніс функцію в методи класу
        return days * 24 * 60 * 60 * 1000;
    },
    
    DeadLine: function (overdue, deadLine, today,  completed){        
                if (completed != 100  && deadLine.getTime() < today.getTime()){
                    return overdue ='Перебільшення виділеного часу!!!'; 
                }
            else {overdue = overdue; }
        return overdue;
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
                
                myDataSet = [
            ['058467', 'Побудова Стадіону Голінський', 'Процес', new Date(2019, 2, 1), new Date(2020, 2, 11), null, 78, null],
            ['000001', 'Пошук альтернатив', 'вфіаіфва', new Date(2019, 2, 1), new Date(2019, 7, 10), null, 78, null],
            ['000002', 'Тестовий процес', '4546156', new Date(2019, 2, 1), new Date(2019, 6, 11), null, 78, null],
        
            ['071489','Виділення земельної ділянки','Територія',new Date(2019, 2, 1),new Date(2019, 2, 30) ,null,100, null],
            
            ['074759','Оголошення тендеру','Тендер', new Date(2019, 2, 5),new Date(2019, 2, 16) ,null,100, null],
            ['074760','Реєстрація пропозицій','Тендер', new Date(2019, 2, 16),new Date(2019, 2, 25) ,null,100, '074759'],
            ['074761','Перевірка ліцензій','Тендер', new Date(2019, 2, 23),new Date(2019, 2, 27) ,null,100, '074759'],
            ['074762','Огляд витрат','Тендер', new Date(2019, 2, 27),new Date(2019, 3, 10) ,null,100, '074759'],
            ['074763','Укладення договору','Тендер', new Date(2019, 3, 10),new Date(2019, 3, 16) ,null,100, '074759'],
            
            ['086457','Закупівля матеріалів','Матеріали', new Date(2019, 4, 1),new Date(2019, 6, 10) ,null,80, '074763'],
            
            ['097458','Фасад','Побудова стадіону', new Date(2019, 5, 26),new Date(2019, 8, 10) ,null,88, '086457'],
            ['097459','Дах','Побудова стадіону', new Date(2019, 7, 26),new Date(2019, 12, 10) ,null,90, '086457'],
            ['097461','Ліве крило','Побудова стадіону', new Date(2019, 8, 10),new Date(2019, 8, 26) ,null, 82, '086457'],
            ['097462','Праве крило','Побудова стадіону', new Date(2019, 9, 26),new Date(2019, 11, 10) ,null,35, '086457'],
            ['097463','Кінцеві роботи','Побудова стадіону', new Date(2020,0, 15),new Date(2020, 1,28) ,null,60, '086457'],
            ['097460','Контроль термінів будування','Побудова стадіону', new Date(2020,1, 28),new Date(2020, 2, 6) ,null,75, '086457'],
            ['125465','Відкриття стадіону','Заходи', new Date(2020,2, 10),new Date(2020, 2, 11) ,null,50, '086457'],
        ];
              for(var i = 0; i < myDataSet.length; i++){
            myDataSet[i][2] = this.DeadLine(myDataSet[i][2], myDataSet[i][4], today,  myDataSet[i][6]);
        }
               
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

                  trackHeight: 35,

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
