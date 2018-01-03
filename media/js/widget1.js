!(function($){
	$('#keywords').attr('placeholder', 'Search');
	$(function(){

		var searchButtonSelector = "#r24_site-search-link";
		var keywordsInputSelector = "#keywords";
		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).click();
				return false;
			}
		});
		
		// uniform 


	});
})(jQuery);