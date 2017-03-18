/*!
 * jConveyorTicker
 * Description: jQuery plugin to create simple horizontal conveyor belt animated tickers.
 *
 * Copyright (c) 2017 Luis Luz - UXD Lda
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/lluz/jquery-conveyor-ticker
 *
 * Version:  1.0.0
 *
 */

(function($, window, document, undefined) {

    $.fn.jConveyorTicker = function(options) {
        if ( this === undefined || this.length === 0 ) {
            console.log('jQuery.jConveyorTicker() INITIALIZATION ERROR: You need to select one or more elements. See documentation form more information.');
            return false;
        }

        
        if (options) {
            
        }

        this.each(function(){
            var $wrap = $(this);

            $wrap.addClass('jconvtick-wrapper');
        });



        /*************** */console.log('done');
    };

})(jQuery, window, document);