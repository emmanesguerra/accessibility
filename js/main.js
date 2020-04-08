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

var _fontSizeCtr = "{{ fontSizeCtr }}";
var _fontSizeCtrInc = "{{ fontSizeCtrInc }}";
var _letterSpaceCtr = "{{ letterSpaceCtr }}";
var _cursorUrl = "{{ cursorUrl }}";
var _legibleFontFamily = "{{ legibleFontFamily }}";
var _borderFocusWidth = "{{ borderFocusWidth }}";
var _borderFocusStyle = "{{ borderFocusStyle }}";
var _borderFocusColor = "{{ borderFocusColor }}";
var _voiceKey = "{{ voiceKey }}";
var _mainCssUrl = "{{ mainCssUrl }}";
var _iconCssUrl = "{{ iconCssUrl }}";
    
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
