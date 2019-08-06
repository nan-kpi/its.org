var SongView = Backbone.View.extend({

    render:function(){
        this.$el.html("Hello World!");

        return this;
    }
});

var songView = new SongView({el: "#container" });
songView.render();