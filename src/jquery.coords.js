/*
 * jquery.coords
 * https://github.com/ducksboard/gridster.js
 *
 * Copyright (c) 2012 ducksboard
 * Licensed under the MIT, GPL licenses.
 */

;(function($, window, document, undefined){
    /**
    * Coords description
    *
    * @class Coords
    * @param {HTMLElement|Object} obj HTMLElement or a literal Object with the left, top, width and height properties.
    * @constructor
    */
    function Coords(obj) {
        if (obj[0] && $.isPlainObject(obj[0])) {
            this.data = obj[0];
        }else {
            this.el = obj;
        }

        this.isCoords = true;
        this.coords = {};
        this.init();
        return this;
    }

    var fn = Coords.prototype;

    fn.init = function(){
        this.set();
        this.original_coords = this.get();
    };

    fn.set = function() {
        var el = this.el;
        if (el) {
            this.data = el.offset();
            this.data.width || (this.data.width = el.width());
            this.data.height || (this.data.height = el.height());
        }

        var d = this.data;

        this.coords.x1 = d.left;
        this.coords.y1 = d.top;
        this.coords.x2 = d.left + d.width;
        this.coords.y2 = d.top + d.height;
        this.coords.cx = d.left + (d.width / 2);
        this.coords.cy = d.top + (d.height / 2);
        this.coords.width  = d.width;
        this.coords.height = d.height;
        this.coords.el  = el || false ;

        return this;
    };

    fn.update = function(data){
        if (!data && !this.el) {
            return this;
        }

        if (data) {
            var new_data = $.extend(this.data, data);
            this.data = new_data;
        }
        this.set();
        return this;
    };

    fn.get = function(){
        return this.coords;
    };

    //jQuery adapter
    $.fn.coords = function() {
        if (this.data('coords') ) {
            return this.data('coords');
        }

        var ins = new Coords(this, arguments[0]);
        this.data('coords', ins);
        return ins;
    };

}(jQuery, window, document));
