class Accessibility
{    
    loadJS() {
        var widgetEl = $('<script>', {
            src: '/accessibility/js/methods.js'
        });
        var widgetEl2 = $('<script>', {
            src: '/accessibility/js/settings.js'
        });
        $("head").append(widgetEl);
        $("head").append(widgetEl2);
    }
}

accessibility = new Accessibility();
accessibility.loadJS();

var _fontSizeCtr = "1.75";
var _fontSizeCtrInc = "0.25";
var _letterSpaceCtr = "4";
var _cursorUrl = "url(/accessibility/cursor.png)";
var _legibleFontFamily = "Arial";
var _borderFocusWidth = "2";
var _borderFocusStyle = "dashed";
var _borderFocusColor = "#ff0000";
var _voiceKey = "5";
var _mainCssUrl = "/accessibility/accessibility.css";
var _iconCssUrl = "/accessibility/css/fa-all.css";
    
methods = new AccessibilityMethods(_fontSizeCtr, _fontSizeCtrInc, _letterSpaceCtr, 
        _cursorUrl, _legibleFontFamily, _borderFocusWidth, _borderFocusStyle, _borderFocusColor, _voiceKey,
        _mainCssUrl, _iconCssUrl);
methods.loadCSS();
methods.loadTooltipContainer();
methods.loadWidget();
methods.getPageChildren();

$('#acc-widget-icon').on('click', function () {
    $('#acc-widget-menu-container').toggle();
});
