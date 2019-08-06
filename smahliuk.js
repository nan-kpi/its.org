var SongView = Backbone.View.extend({
    id: 'linechart2',
    tagName: 'canvas',
    className: 'viewport linechart',
    render:function(){
        this.$el.html("Hello World!");

        return this;
    }
});

var songView = new SongView({el: "#linechart2" });
songView.render();
