/*!
 * jQuery Conveyor Ticker (jConveyorTicker)
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
 * Version:  1.1.0
 *
 */

(function($, window, document, undefined) {

    $.fn.jConveyorTicker = function(options) {
        if ( this === undefined || this.length === 0 ) {
            console.log('jquery.jConveyorTicker() INITIALIZATION ERROR: You need to select one or more elements. See documentation form more information.');
            return false;
        }

        var settings = {
            anim_duration: 200,
            reverse_elm: false,
            force_loop: false,
            start_paused: false,
        };
        var cycle_duration = settings.anim_duration;
        var reverse_commute = settings.reverse_elm;
        var initialization_forced = settings.force_loop;
        var paused_oninit = settings.start_paused;
        
        if (options) {
            if ( options.anim_duration !== undefined ) {
                cycle_duration = options.anim_duration;
            }

            if ( options.reverse_elm !== undefined ) {
                reverse_commute = options.reverse_elm;
            }

            if ( options.force_loop !== undefined ) {
                initialization_forced = options.force_loop;
            }

            if ( options.start_paused !== undefined ) {
                paused_oninit = options.start_paused;
            }

            $.extend(settings, options);
        }

        var $self = $(this);
        var $list = $self.children('ul');

        var output = {

            'init': function(){

                $self.each(function(){

                    output.destroy();

                    $list
                    .css({
                        'margin': '0',
                        'padding': '0',
                        'list-style': 'none'
                    })
                    .children('li')
                    .css({
                        'display': 'inline-block'
                    });
        
                    var $listRawWidth = $list.width();
                    var $parentWidth = $list.parent().width();
                    var $parent1stThreshold = ($parentWidth / 2) - 20;
        
                    $list
                    .removeAttr('style')
                    .children('li')
                    .removeAttr('style');
        
                    $self.addClass('jctkr-wrapper');
        
                    var conveyorInit = function(){
                        var $listItems1stClone = $list.clone().children('li');
                        $listItems1stClone.each(function(){
                            $(this).addClass('clone');
                        });
                        $list.append($listItems1stClone);
        
                        var listTotalWidth = 0;
                        $list.children().each(function(){
                            listTotalWidth += $(this).outerWidth();
                        });
                        $list.width(listTotalWidth);
        
                        $self.hover(function(){
                            output.pauseAnim();
                        }, function(){
                            output.pauseAnim();
                            output.conveyorAnimate('normal');
                        });
        
                        if ( reverse_commute ){
                            $self.prev('.jctkr-label')
                            .hover(function(){
                                output.pauseAnim();
                                output.conveyorAnimate('reverse');
                            }, function(){
                                output.pauseAnim();
                                output.conveyorAnimate('normal');
                            }).click(function(){
                                return false;
                            });
                        }
                        output.conveyorAnimate('normal');
                    };
        
                    if ( $listRawWidth >= $parent1stThreshold ){
                        conveyorInit();
                    }
                    else if ( initialization_forced ){
                        var $itemsWidth, $containerWidth = 0;
                        var itemsReplicate = function(){
                            var $listItems1stClone = $list.clone().children('li');
                            $listItems1stClone.each(function(){
                                $(this).addClass('clone');
                            });
                            $list.append($listItems1stClone);
        
                            $itemsWidth = $list.width();
                            $containerWidth = $list.parent().width();
        
                            if ( $itemsWidth < $containerWidth ){
                                itemsReplicate();
                            }
                            else {
                                conveyorInit();
                                return false;
                            }
                        };
        
                        itemsReplicate();
        
                        while ( $itemsWidth < $containerWidth ) {
                            if ( $itemsWidth >= $parent1stThreshold ) {
                                conveyorInit();
                                break;
                            }
                            itemsReplicate();
                        }
                    }

                    $self.addClass('jctkr-initialized');

                });

                if ( paused_oninit ){
                    output.pauseAnim();
                }

            },

            'destroy': function(){

                $self.each(function(){

                    output.pauseAnim();

                    $(this)
                    .unbind().removeData()
                    .removeClass('jctkr-wrapper jctkr-initialized');

                    $list
                    .unbind().removeData()
                    .removeAttr('style')
                    .find('.clone').remove();

                });

            },

            'conveyorAnimate': function(action){

                var tw = $list.width();
                var tp = $list.position().left;
                var operator = '-';
                var direction = 'normal';
                var tcal;

                if (action !== undefined && action === 'reverse'){
                    tcal = (tw / 2);
                    if (tp > 0){
                        $list.css('left', '-' + tcal + 'px');
                        output.conveyorAnimate('reverse');
                        return;
                    }
                    operator = '+';
                    direction = 'reverse';
                }
                else {
                    tcal = -1 * (tw / 2);
                    if (tp < tcal){
                        var toffs = -1 * (tcal - tp);
                        $list.css('left', toffs + 'px');
                        output.conveyorAnimate(direction);
                        return;
                    }
                }

                $list.stop().animate({
                    left: operator + '=10px'
                }, cycle_duration, 'linear', function(){
                    output.conveyorAnimate(direction);
                });

            },

            'pauseAnim': function(){
                $list.stop();
            },

            'playAnim': function(){
                output.conveyorAnimate('normal');
            },

        };

        output.init();
        return output;

    };

})(jQuery, window, document);