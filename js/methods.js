class AccessibilityMethods
{
    

    constructor(fontSizeCtr, fontSizeCtrInc, letterSpaceCtr, cursorUrl, legibleFontFamily, 
                    borderFocusWidth, borderFocusStyle, borderFocusColor, voiceKey, mainCssUrl, iconCssUrl) {
        this._fontSizeCtr = fontSizeCtr;
        this._fontSizeCtrInc = fontSizeCtrInc;
        this._letterSpaceCtr = letterSpaceCtr;
        this._cursorUrl = cursorUrl;
        this._legibleFontFamily = legibleFontFamily;
        this._borderFocusWidth = borderFocusWidth;
        this._borderFocusStyle = borderFocusStyle;
        this._borderFocusColor = borderFocusColor;
        this._voiceKey = voiceKey;
        this._mainCssUrl = mainCssUrl;
        this._iconCssUrl = iconCssUrl;
        
        var sizeCtr = 1, highLightLinks = false, spaceCtr = 1, bigCursor = false, 
            legibleFonts = false, keyboardNav = false, enableToolTip = false, useSpeech = false,
            bgThemeCtr = 0;
    
        this.settings = new AccessibilitySettings(sizeCtr, highLightLinks, spaceCtr, 
                                bigCursor, legibleFonts, keyboardNav, enableToolTip, useSpeech,
                                bgThemeCtr);
    }

    increaseFont = function () {
        var reset = false;
        if (this.settings.fontSizeCtr > this._fontSizeCtr) {
            this.settings.fontSizeCtr = 1;
            $('body *').css('font-size', '');
            $('#acc-bigger-text').removeClass('active');
            reset = true;
        } else {
            $('#acc-bigger-text').addClass('active');
            var el = $('body [data-acc-font-size]');
            this.settings.fontSizeCtr = this.settings.fontSizeCtr + this._fontSizeCtrInc;
            var vm = this;
            $.each(el, function() {
                var bodySize = $(this).data('acc-font-size').replace(/[^\d.]/g, '');
                $(this).css('font-size', vm.settings.fontSizeCtr * bodySize);
            });
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Font size is normal');
            } else {
                this.speak('Font size increased');
            }
        }
    }

    highLightLinks = function () {
        var reset = false;
        if (this.settings.highLightLinks) {
            this.settings.highLightLinks = false;
            $('body a').css('background', '');
            $('#acc-highlight-links').removeClass('active');
            reset = true;
        } else {
            $('#acc-highlight-links').addClass('active');
            this.settings.highLightLinks = true;
            $('body a').css('background', 'yellow');
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Highlighting links disabled');
            } else {
                this.speak('Highlighting links enabled');
            }
        }
    }

    increaseLetterSpace = function () {
        var reset = false;
        if (this.settings.letterSpaceCtr > this._letterSpaceCtr) {
            this.settings.letterSpaceCtr = 0;
            $('body *').css('letter-spacing', '');
            $('#acc-text-spacing').removeClass('active');
            reset = true;
        } else {
            $('#acc-text-spacing').addClass('active');
            this.settings.letterSpaceCtr = this.settings.letterSpaceCtr + 1;
            $('body *').css('letter-spacing', this.settings.letterSpaceCtr + 'px');
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Letter spacing is normal');
            } else {
                this.speak('Letter space increased');
            }
        }
    }

    increaseCursorSize = function () {
        var reset = false;
        if (this.settings.bigCursor) {
            this.settings.bigCursor = false;
            $('*').css('cursor', '');
            $('#acc-change-cursor').removeClass('active');
            reset = true;
        } else {
            $('#acc-change-cursor').addClass('active');
            this.settings.bigCursor = true;
            $('*').css('cursor', this._cursorUrl + ', auto');
            $('.acc-widget-menu li').css('cursor', '');
            $('.acc-widget-menu li h3').css('cursor', '');
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Cursor size is normal');
            } else {
                this.speak('Cursor size increased');
            }
        }
    }

    useLegibleFonts = function () {
        var reset = false;
        if (this.settings.legibleFonts) {
            this.settings.legibleFonts = false;
            $('body *').css('font-family', '');
            $('#acc-legible-fonts').removeClass('active');
            reset = true;
        } else {
            $('#acc-legible-fonts').addClass('active');
            this.settings.legibleFonts = true;
            $('body *').css('font-family', this._legibleFontFamily);
            $('body i').css('font-family', '');
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Disabled legible fonts');
            } else {
                this.speak('Enable legible fonts');
            }
        }
    }

    enableToolTip = function () {
        var reset = false;
        if (this.settings.enableToolTip) {
            this.settings.enableToolTip = false;
            $("data-tooltip").off('hover');
            $('#acc-use-tooltips').removeClass('active');
            reset = true;
        } else {
            $('#acc-use-tooltips').addClass('active');
            this.settings.enableToolTip = true;
            $("*[data-tooltip]").hover(function () {
                $('#acc-widget-tooltip').toggle();
                $('#acc-widget-tooltip').html($(this).data('tooltip'));
                var position = this.getBoundingClientRect();
                $('#acc-widget-tooltip').css('top', position.bottom);
                $('#acc-widget-tooltip').css('left', position.left);
            });
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Disabled tool tips');
            } else {
                this.speak('Enable tool tips');
            }
        }
    }

    getPageChildren = function () {
        var children = $('body').children();
        this.getChildren(children);
    }

    getChildren = function (children) {
        var vm = this;
        children.each(function () {
            if ($(this).children().length > 0 && $(this).find(vm.settings.blockElements)) {
                var children1 = $(this).children();
                vm.getChildren(children1);
            } else {
                if (!$(this).is(':empty') && ($.inArray($(this).prop('tagName'), vm.settings.excludedElements) < 0)) {
                    $(this).addClass('acc-node-navi');
                    $(this).attr('data-acc-node-ctr', vm.settings.counter);
                    $(this).attr('data-acc-font-size', $(this).css('font-size'));
                    vm.settings.counter++;
                }
            }
        });
    }

    useKeyboardNav = function () {
        var reset = false;
        if (this.settings.keyboardNav) {
            this.settings.keyboardNav = false;
            $('.acc-node-navi').off('click');
            $('.acc-node-navi').removeClass('acc-focus');
            $('body').off('keydown');
            this.settings.currentFocusedElement = null;
            $('#acc-keyboard-nav').removeClass('active');
            reset = true;
        } else {
            $('#acc-keyboard-nav').addClass('active');
            this.settings.keyboardNav = true;
            var vm = this;
            $('.acc-node-navi').on('click', function () {
                $('.acc-node-navi').removeClass('acc-focus');
                $(this).addClass('acc-focus');
                vm.settings.currentFocusedElement = $(this);
                if (vm.settings.useSpeech) {
                    vm.speak($(this).text());
                }
            });

            $('body').on('keydown', function (event) {
                $('.acc-node-navi').removeClass('acc-focus');
                switch (event.keyCode)
                {
                    case 37: // LEFT
                        if (vm.settings.currentFocusedElement) {
                            vm.setFocusedElement('minus');
                        } else {
                            $('.acc-node-navi:first').addClass('acc-focus');
                            vm.settings.currentFocusedElement = $('.acc-node-navi:first');
                            $(vm.currentFocusedElement).parent().trigger('mouseover');
                            $(vm.currentFocusedElement).trigger('mouseover');
                            if (vm.settings.useSpeech) {
                                vm.speak($('.acc-node-navi:first').text());
                            }
                        }
                        break;
                    case 39: // RIGHT
                        if (vm.settings.currentFocusedElement) {
                            vm.setFocusedElement('plus');
                        } else {
                            $('.acc-node-navi:first').addClass('acc-focus');
                            vm.settings.currentFocusedElement = $('.acc-node-navi:first');
                            $(vm.settings.currentFocusedElement).parent().trigger('mouseover');
                            $(vm.settings.currentFocusedElement).trigger('mouseover');
                            if (vm.settings.useSpeech) {
                                vm.speak($('.acc-node-navi:first').text());
                            }
                        }
                        break;
                    case 13: // ENTER
                        $(vm.settings.currentFocusedElement).trigger('click');
                        break;
                    case 27: //ESC
                        vm.settings.currentFocusedElement = null;
                        break;
                    default:
                        break;
                }
            });
        }
        
        if (this.settings.useSpeech) {
            if (reset) {
                this.speak('Disabled keyboard navigation');
            } else {
                this.speak('Enable keyboard navigation');
            }
        }
    }

    setFocusedElement = function (action) {
        var key = this.settings.currentFocusedElement.attr('data-acc-node-ctr');
        if (action == 'plus')
            var curr = parseInt(key) + 1;
        else
            var curr = parseInt(key) - 1;
        var str = ".acc-node-navi[data-acc-node-ctr='" + curr + "']";
        $(str).addClass('acc-focus');
        this.settings.currentFocusedElement = $(str);
        if (this.settings.useSpeech) {
            this.speak($(str).text());
        }
    }

    speak = function (txt) {
        var available_voices = window.speechSynthesis.getVoices();
        var english_voice = available_voices[this._voiceKey];

        if(english_voice) {
            var utter = new SpeechSynthesisUtterance();
            utter.rate = 1;
            utter.pitch = 0.5;
            utter.text = txt;
            utter.voice = english_voice;

            window.speechSynthesis.speak(utter);
        } else {
            var vm = this;
            setTimeout(function () { vm.speak(txt); }, 10)
        }
    }

    useSpeech = function () {
        this.settings.useSpeech = !this.settings.useSpeech;
        if(this.settings.useSpeech) {
            $('#acc-read-page').addClass('active');
            this.speak('Enable text speech');
        } else {
            $('#acc-read-page').removeClass('active');
            this.speak('Disable text speech');
        }
    }
    
    useContrast = function () {
        this.settings.bgThemeCtr = this.settings.bgThemeCtr + 1;
        $('#acc-contrast').addClass('active');
        if (typeof this.settings.contrastStyles[this.settings.bgThemeCtr] === 'undefined') {
            this.settings.bgThemeCtr = 0;
            $('#acc-contrast').removeClass('active');
        }
        
        $('html').removeClass();
        $('html').addClass(this.settings.contrastStyles[this.settings.bgThemeCtr]);
        
        if (this.settings.useSpeech) {
            switch(this.settings.bgThemeCtr)
            {
                case 0:
                    this.speak('Color contrast is normal');
                    break;
                case 1:
                    this.speak('Inverted theme enabled');
                    break;
                case 2:
                    this.speak('Grayscale theme enabled');
                    break;
            }
        }
    }

    loadCSS() {
        var widgetEl = $('<link>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: this._mainCssUrl
        });
        var widgetEl2 = $('<link>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: this._iconCssUrl
        });
        $("head").append(widgetEl);
        $("head").append(widgetEl2);
        $("<style type='text/css'> .acc-focus{ border: "+ this._borderFocusWidth +"px "+ this._borderFocusStyle +" "+ this._borderFocusColor +" !important;} </style>").appendTo("head");
    }

    loadWidget() {
        var widgetEl = $('<div>', {
            id: 'acc-widget'
        });
        var widgetEl2 = $('<div>', {
            id: 'acc-widget-container',
            html: '<i id="acc-widget-icon" class="fa fa-universal-access" style="font-size: 36px;"></i>'
        });
        widgetEl.append(widgetEl2);
        $("body").after(widgetEl);

        this.loadMenu();
    }

    loadMenu() {
        $('#acc-widget-container').append("\<div id='acc-widget-menu-container'>\n\
<h3>Accessibility Menu</h3>\n\
<ul class='acc-widget-menu'>\n\
<li class='half' onClick='methods.useKeyboardNav()'><span id='acc-keyboard-nav'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-keyboard' aria-hidden='true'></i> <p>Keyboard Nav</p></span></li>\n\
<li class='half' onClick='methods.useSpeech()'><span id='acc-read-page'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-volume-up' aria-hidden='true'></i> <p>Read Page</p></span></li>\n\
<li class='half' onClick='methods.useContrast()'><span id='acc-contrast'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-tv' aria-hidden='true'></i> <p>Contrast +</p></span></li>\n\
<li class='half' onClick='methods.highLightLinks()'><span id='acc-highlight-links'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-link' aria-hidden='true'></i> <p>Highlight Links</p></span></li>\n\
<li class='half' onClick='methods.increaseFont()'><span id='acc-bigger-text'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-text-height' aria-hidden='true'></i> <p>Bigger Text</p></span></li>\n\
<li class='half' onClick='methods.increaseLetterSpace()'><span id='acc-text-spacing'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-text-width' aria-hidden='true'></i> <p>Text Spacing</p></span></li>\n\
<li class='half'><span id='acc-stop-animation'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-ban' aria-hidden='true'></i> <p>Stop Animations</p></span></li>\n\
<li class='half' onClick='methods.useLegibleFonts()'><span id='acc-legible-fonts'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-font' aria-hidden='true'></i></i> <p>Legible Fonts</p></span></li>\n\
<li class='half' onClick='methods.increaseCursorSize()'><span id='acc-change-cursor'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-mouse-pointer' aria-hidden='true'></i> <p>Cursor</p></span></li>\n\
<li class='half' onClick='methods.enableToolTip()'><span id='acc-use-tooltips'> <i class='acc-check fa fa-check-circle'></i> <i class='fa fa-flag' aria-hidden='true'></i> <p>Tooltips</p></span></li>\n\
<li class='full'><span>Reset All</span></li>\n\
<li class='half'><span>Page Structure</span></li>\n\
<li class='half'><span>Move/Hide</span></li>\n\
</ul></div>");
    }

    loadTooltipContainer() {

        var toolTipEl = $('<div>', {
            id: 'acc-widget-tooltip'
        });
        $("body").after(toolTipEl);
    }
}