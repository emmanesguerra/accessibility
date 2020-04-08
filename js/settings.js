class AccessibilitySettings
{
    blockElements = "p, h1, h2, h3, h4, h5, h6, ol, ul, pre, address, blockquote, dl, div, fieldset, form, hr, noscript, table, li";

    inlineElements = "b, big, small, tt, abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var, a, bdo, img, map, object, q, script, span, sub, sup, button, input, label, select, textarea";

    excludedElements = [
        'SCRIPT',
        'IMG',
        'I',
        'OPTION'
    ];

    currentFocusedElement = null;

    counter = 0;
    
    contrastStyles = [
        '',
        'acc-invert-bg-theme',
        'acc-grayscale-theme'
    ];
    
    contrastIndex = 0;
        
    constructor(fontSizeCtr, highLightLinks, letterSpaceCtr, bigCursor, legibleFonts, keyboardNav, enableToolTip, useSpeech, bgThemeCtr) {
        this._fontSizeCtr = fontSizeCtr;
        this._highLightLinks = highLightLinks;
        this._letterSpaceCtr = letterSpaceCtr;
        this._bigCursor = bigCursor;
        this._legibleFonts = legibleFonts;
        this._keyboardNav = keyboardNav;
        this._enableToolTip = enableToolTip;
        this._useSpeech = useSpeech;
        this._bgThemeCtr = bgThemeCtr;
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

    get enableToolTip() {
        return this._enableToolTip;
    }

    set enableToolTip(x) {
        this._enableToolTip = x;
    }

    get useSpeech() {
        return this._useSpeech;
    }

    set useSpeech(x) {
        this._useSpeech = x;
    }

    get bgThemeCtr() {
        return this._bgThemeCtr;
    }

    set bgThemeCtr(x) {
        this._bgThemeCtr = x;
    }
}

