(function() {
	Deific.UsersView =  Ember.View.extend({
        showTagContainer: true,

        didInsertElement: function() {
            //remove loader
            $('#rootProgress').remove();

            //Set users link as active
            $('.nav-users').addClass('active');

            //enable the the active link
            var sort = $.fn.parseParam('sort', $('.right-nav-tabs').data('default')).toLowerCase();
            $('.right-nav-tabs #' + 'a' + sort).parent().addClass('active');
        },

    	submitTextField: Ember.TextField.extend({
			insertNewline: function() {
		        return this.get('parentView').search();
	   		}
		}),

    	search: function() {
            var that = this;

            //get the search query
    		var query = this.get('searchtext').trim();

            //sort results
    		var sort = $.fn.parseParam('sort', $('.right-nav-tabs').data('default')).toLowerCase();
            
            //page number
            var page = $.fn.parseParam('page', '1');
            if(query != '') page = 1;

            $('#btnUserSearch').button('loading');

            var resetView = function() {
                //reset the button
                $('#btnUserSearch').button('reset');
                //hide the pager
                that.set('showTagContainer', query === '');
            }

            this.controller.search(query, page, sort, function(tags) {
                resetView();
            }, function(message) {
                resetView();
            });
    	}
	});
}).call(this);