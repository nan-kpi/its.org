/* global AbstractPrimaryView, google, _ */

var YChartView = AbstractPrimaryView.extend({
    id: 'linechart2',
//    tagName: 'canvas', !!!!! це тобі все і ломало. ти давав гугл чарту канвас замість дів-а
    className: 'viewport linechart',
    daysToMilliseconds: function (days) {//переніс функцію в методи класу
        return days * 24 * 60 * 60 * 1000;
    },
    
    DeadLine: function (overdue, deadLine, completed){ 
                var today = new Date();
                if (completed != 100  && deadLine.getTime() < today.getTime()){
                    return overdue ='Перебільшення виділеного часу!!!'; 
                }
            else {overdue = overdue; }
        return overdue;
    },
    
    PercentComplete: function(array) {
        var persent = 0;
        for(var i = 1; i < array.length; i++){
            persent += array[i][6];
        }
      return Math.floor(persent/(array.length));
    },
   
    
    
    render: function () {
        google.charts.load('current', {'packages': ['gantt']}); //Завантажувати бібліотеку треба тільки раз
        google.charts.setOnLoadCallback(_.bind(function () {
            this.render = function() { //тому коли вона завантажена - замінюємо функцію рендер на нормальну
                
                /*********************************************************************/

                var datasets = {};
        
        
         var testDataSets = [][];
        
         console.log(this.model.getCurrentNodes());
/***************************************************
_.each(list, iteratee, [context]) - Проходит по всему списку элементов, вызывая для каждого из них функцию iteratee,
которая будет вызвана в контексте context, если он был передан.
*************************************/
        
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
                
               if(datum.tclass == "Task ID") {
                    this.testDataSets[0].push(datum.getValue()); //Вставити у відповідне місце у масиві
                } else
                if(datum.tclass == "Task Name") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[1].push(datum.getValue());
                } else
                if(datum.tclass == "Resource") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                   this.testDataSets[2].push(datum.getValue());
                } else
                if(datum.tclass == "Start Date") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[3].push(datum.getValue());
                } else
                if(datum.tclass == "DeadLine") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[4].push(datum.getValue());
                } else
                if(datum.tclass == "Duration") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[5].push(datum.getValue());
                } else
                if(datum.tclass == "Percent Complete") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[6].push(datum.getValue());
                } else
                if(datum.tclass == "Dependencies") {
                    //datasets[datum.tclass].data.push(datum.getValue()); //Вставити у відповідне місце у масиві
                    this.testDataSets[7].push(datum.getValue());
                }else {
                    datasets[datum.tclass].data.push(10); //Останній варіант - сповістить про помилку введення
                }
            });
        });
        
                
                
                
                /**********************************************************************/
                

                var Data = new google.visualization.DataTable();
                Data.addColumn('string', 'Task ID');
                Data.addColumn('string', 'Task Name');
                Data.addColumn('string', 'Resource');
                Data.addColumn('date', 'Start Date');
                Data.addColumn('date', 'End Date');
                Data.addColumn('number', 'Duration');
                Data.addColumn('number', 'Percent Complete');
                Data.addColumn('string', 'Dependencies');
                
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
            myDataSet[i][2] = this.DeadLine(myDataSet[i][2], myDataSet[i][4],  myDataSet[i][6]);
        }
               myDataSet[0][6] = this.PercentComplete(myDataSet);
             
                //testDataSets
               // Data.addRows(myDataSet);
                Data.addRows(this.testDataSets);

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

                this.chart.draw(Data, options);

                this.resizeContent(); //це має бути вкінці рендера
                
                this.hideLoader();
            };
            
            this.render();//і запускаємо її на виконання
        }, this));
    }
}); 
