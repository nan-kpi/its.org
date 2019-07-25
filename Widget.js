/* global AbstractPrimaryView, _, GraphMixin, GraphSelectionMixin */

var CustomGraphView = AbstractPrimaryView.extend({
    id: 'graph_custom',
    className: 'viewport graph0',
    contentParentSelector: null,
    widgetTemplate: 'GraphViewWidget',
    events: {
        'click .btn-box-tool': function() {
            this.$('.left-widget').toggleClass('collapsed-box');
        },
        'click .for-selected': function() {
            if(this.currentSelection.length == 0) return;
            
            this.trigger('filterHierarchy', this.currentSelection[0].sourceModel);
        },
        'change select,input': function() {
            if(this.model.isHierarchyFilter() && !this.model.isPropertyFilter()) {
                this.render();
                this.model.trigger('refresh');
            }
        }
    },
    initialize: function(options) {
        AbstractPrimaryView.prototype.initialize.call(this, options);

        this.initializeGraph();
        this.$el.append(this.widgetTemplate({options: this.options.getOptionMask('graph')}));
        this.options.translation.translateNodes(this.$el);
    },
    renderContentArguments: function() {
        return this.model.getCurrentNodes({
            direction: this.$('[name="filterDirection"]').val(),
            depth: this.$('[name="filterDepth"]').val()
        });
    },
    getCurrentNodeCount: function() {
        return this.graph.graph.nodes().length;
    },
    mixins: [GraphSelectionMixin, GraphMixin]
});

jQuery("#graph_custom").children("i").attr({'class':'fa fa-file-code-o','aria-hidden':'true'});
