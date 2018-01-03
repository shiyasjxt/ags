!(function($){
	$('#keywords').attr('placeholder', 'Search');
	$(function(){

		var searchButtonSelector = "#btn-widget-search";
		var keywordsInputSelector = "#keywords1";
		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).click();
				return false;
			}
		});
		
		// uniform 
		if ( $.fn.customSelect )
		{
			$(".r24_search-field select").customSelect();
		}

	});
})(jQuery);