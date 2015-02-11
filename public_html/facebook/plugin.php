<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> New Document </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
  <script type="text/javascript" src="http://www.fassion.co.kr/extends/js.jquery/jquery.js"></script>
  <script type="text/javascript" src="http://www.fassion.co.kr/extends/js.jquery.ui/jquery-ui-1.8.13.custom.min.js"></script>
 </HEAD>

 <BODY>
 	<div>
		sample
	</div>
	<div>
		sample<br>
		sample
	</div>
	<script>
		/*
		 @ Make sample plugin to understand of structure about plugin
		*/
//		(function($) {
//			$.fn.fassion10 = function() {
//
//			  // Do your awesome plugin stuff here
//			  // There's no need to do $(this) because "this" is already a jquery object 
//			  this.fadein('namal', function(){
//					// the this keword is a DOM element 
//			  });
//
//			};
//		})(jQuery);

		/*
		 @ Make sample plugin of maxHeight
		*/
//		(function($) {
//			$.fn.maxHeight = function() {
//
//			 var max = 0;
//			 
//			 this.each(function(){
//				 
//				max = Math.max(max,$(this).height());
//				alert(max);		
//			 });
//		
//				return max;
//			};
//		})(jQuery);
//
//		var tallest = $('div').maxHeight(); //Returns the height of the tallest div
		
		/*
		  @ Make the Chainability
		*/
//		(function( $ ){
//
//		  $.fn.lockDimensions = function( type ) {  
//
//			return this.each(function() {
//
//			  var $this = $(this); // get each Object $(this)
//
//			  if ( !type || type == 'width' ) {
//				$this.width( $this.width() );				
//			  }
//
//			  if ( !type || type == 'height' ) {
//				$this.height( $this.height() );
//			  }
//
//			});
//
//		  };
//		})( jQuery );
//		
//		$('div').lockDimensions('width').css('color','red');

		/*
		@ jQuery Option
		*/

//		(function( $ ){
//
//		  $.fn.tooltip = function( options ) {  
//
//			// Create some defaults, extending them with any options that were provided
//			var settings = $.extend( {
//			  'location'         : 'top',
//			  'background-color' : 'blue'
//			}, options);
//
//			return this.each(function() {        
//
//			  // Tooltip plugin code here
//
//			});
//
//		  };
//		})( jQuery );

	/*
	@ namespace of jQuery and event bind
	*/	
 (function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){
         $(window).bind('resize.tooltip', methods.reposition); // Bind methods.reposition function to resize.tooltip
       });

     },
     destroy : function( ) { // Unbind tooltip under resize

       return this.each(function(){
         $(window).unbind('.tooltip');
       })

     },
     reposition : function( ) { 
       // ... 
     },
     show : function( ) { 
       // ... 
     },
     hide : function( ) {
       // ... 
     },
     update : function( content ) { 
       // ...
     }
  };

  $.fn.tooltip = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );


	</script>




</BODY>
</HTML>
