jQuery(document).on('todos.initialize', function (evt, that) {
_.extend(that, {
resolvePrimaryViews: function () {
return [
//стандартні представлення
new TileView ({options: this.options}),
new TableView({options: this.options}),
new GraphView({options: this.options}),
new CustomGraphView({options: this.options}),
new PrismView({options: this.options}),
new MapView ({options: this.options}),
//Ваше нове представлення

new XChartView({options: this.options}),
new YChartView({options: this.options}),
new ZChartView({options: this.options})
];
},
});
