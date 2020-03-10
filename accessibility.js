/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class AccessibilitySettings
{
    constructor(fontSizeCtr, highLightLinks, letterSpaceCtr, bigCursor, legibleFonts, keyboardNav) {
        this._fontSizeCtr = fontSizeCtr;
        this._highLightLinks = highLightLinks;
        this._letterSpaceCtr = letterSpaceCtr;
        this._bigCursor = bigCursor;
        this._legibleFonts = legibleFonts;
        this._keyboardNav = keyboardNav;
    }
    
    get fontSizeCtr() {
        return this._fontSizeCtr;
    }
    
    set fontSizeCtr(x) {
        this._fontSizeCtr = x;
    }
    
    get highLightLinks() {
        return this._highLightLinks;
    }
    
    set highLightLinks(x) {
        this._highLightLinks = x;
    }
    
    get letterSpaceCtr() {
        return this._letterSpaceCtr;
    }
    
    set letterSpaceCtr(x) {
        this._letterSpaceCtr = x;
    }
    
    get bigCursor() {
        return this._bigCursor;
    }
    
    set bigCursor(x) {
        this._bigCursor = x;
    }
    
    get legibleFonts() {
        return this._legibleFonts;
    }
    
    set legibleFonts(x) {
        this._legibleFonts = x;
    }
    
    get keyboardNav() {
        return this._keyboardNav;
    }
    
    set keyboardNav(x) {
        this._keyboardNav = x;
    }
}

class AccessibilityFuncs 
{
    constructor(fontSizeCtr) {
        this.settings = new AccessibilitySettings(1, false, 1, false, false, false);
    }
    
    loadWidget() {
        var widgetEl = $('<div>', {
           id: 'accwidget',
        });
        widgetEl.css("background", "#fcfcfc");
        widgetEl.css("position", "fixed");
        widgetEl.css("top", "20px");
        widgetEl.css("right", "20px");
        widgetEl.css("z-index", "9999");
        widgetEl.css("float", "left");
        widgetEl.css("width", "35px");
        widgetEl.css("height", "35px");
        widgetEl.css("cursor", "pointer");
        widgetEl.css("border-radius", "50%");
        $("body").append(widgetEl);
    }
    
    increaseFont = function () {
        if(this.settings.fontSizeCtr > 1.3) {
            this.settings.fontSizeCtr = 1;
            $('*').css('font-size', '');
        } else {
            var bodySize = $('*').css('font-size').replace ( /[^\d.]/g, '' );
            this.settings.fontSizeCtr = this.settings.fontSizeCtr + .10;
            $('*').css('font-size', this.settings.fontSizeCtr * bodySize);
        }
    }
    
    highLightLinks = function () {
        if(this.settings.highLightLinks) {
            this.settings.highLightLinks = false;
            $('a').css('background', '');
        } else {
            this.settings.highLightLinks = true;
            $('a').css('background', 'yellow');
        }
    }
    
    increaseLetterSpace = function () {
        if(this.settings.letterSpaceCtr > 4) {
            this.settings.letterSpaceCtr = 0;
            $('*').css('letter-spacing', '');
        } else {
            this.settings.letterSpaceCtr = this.settings.letterSpaceCtr + 1;
            $('*').css('letter-spacing', this.settings.letterSpaceCtr + 'px');
        }
    }
    
    increaseCursorSize = function () {
        if(this.settings.bigCursor) {
            this.settings.bigCursor = false;
            $('*').css('cursor', '');
        } else {
            this.settings.bigCursor = true;
            $('*').css('cursor', 'url(/javascript/cursor.png), auto');
        }
    }
    
    useLegibleFonts = function () {
        if(this.settings.legibleFonts) {
            this.settings.legibleFonts = false;
            $('*').css('font-family', '');
        } else {
            this.settings.legibleFonts = true;
            $('*').css('font-family', 'Arial');
            $('i').css('font-family', '');
        }
    }
    
    useKeyboardNav = function () {
        if(this.settings.keyboardNav) {
            this.settings.keyboardNav = false;
            console.log(this.settings.keyboardNav);
            $('*').off('keydown');
        } else {
            this.settings.keyboardNav = true;
            console.log(this.settings.keyboardNav);
            var root = $('body');
            
            
            
            children.each(function(index, element) {
                console.log(element);
                console.log(index);
                element.keydown(function(event) {
                    switch(event.keyCode)
                    {
                        case 37:
                            $('*').css( "border", "" );
                            $(this).next().css( "border", "1px dashed red " ).focus();
                            break;
                        case 39:
                            $('*').css( "border", "" );
                            $(this).prev().css( "display", "inline" ).focus();
                            break;
                        case 13:
                            break;
                        case 27:
                            break;
                        default:
                            break;
                    }
                }).click(function() {
                    $(this).css( "border", "1px dashed red" ).focus();
                });
            });
        }
    }
}

accessibility = new AccessibilityFuncs();
accessibility.loadWidget();
$('#accwidget').on('click', function() {
    accessibility.useKeyboardNav();
});