/*!
 * MIT License
 * 
 * Copyright (c) 2016 Amiran Ramishvili
 * Copyright (c) 2016 Temur Vibliani
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function( $ ) {
    'use strict';

    $(document).ready(function(){

        $.fn.set_err_message_i18n = function() {
            /*
             *  A placeholder function remainder, just in case.
             */
            var init_fn_name = "init_web_form_message_i18n";
            console.error("Please call a " + init_fn_name +
                    " function first, before using this function," +
                    " in order to initialize error message translations");
            throw "Error message i18n is uninitialized!";
        };

        window.init_web_form_message_i18n = function(tr){
            /*
             * This function initializes i18n for custom error messages for web form fields
             * 
             * tr - argument should be a translator function accepting an english string 
             *      as an argument and returning translated (to the desired language) string.
             */


            var messages = {
                required: tr("This field is required."),
                select_required: tr("Please select an item in the list."),
                file_required: tr("Please choose a file."),
                url_required: tr("Please enter a URL."), 
                remote: tr("Please fix this field."), //TOCHECK
                email: tr("Please enter a valid email address."), 
                url: tr("Please enter a valid URL."), 
                date: tr("Please enter a valid date."), 
                dateISO: tr("Please enter a valid date (ISO)."), //TOCHECK
                number: tr("Please enter a number."), 
                digits: tr("Please enter only digits."), //TOCHECK
                creditcard: tr("Please enter a valid credit card number."), //TOCHECK
                equalTo: tr("Please enter the same value again."), //TOCHECK
                accept: tr("Please enter a value with a valid extension."), //TOCHECK
                maxlength: tr("Please enter no more than {0} characters."), 
                minlength: tr("Please enter at least {0} characters."), 
                rangelength: tr("Please enter a value between {0} and {1} characters long."), //TOCHECK
                range: tr("Please enter a value between {0} and {1}."), //TOCHECK
                max: tr("Please enter a value less than or equal to {0}."), 
                min: tr("Please enter a value greater than or equal to {0}."), 
                step: tr("Please enter a valid value. The two nearest valid values are {0} and {1}."),  //added
                pattern: tr("Please match the requested format: {0}."), //added
                select: tr("Please select an item in the list.") //added
            };


            var init_error_message = function(e) {
                e.target.setCustomValidity("");
                if (!e.target.validity.valid) {
                    var msg;
                    if(e.target.validity.valueMissing && e.target.hasAttribute('required')){
                        var tagname = $( e.target ).prop("tagName").toUpperCase();
                        if ( tagname === "SELECT"){
                            msg = messages.select_required;
                        }
                        else if (e.target.type == "file") {
                            msg = messages.file_required;
                        }
                        else if (e.target.type == "url") {
                            msg = messages.url_required;
                        } else {
                            msg = messages.required;
                        }
                    }
                    else if(e.target.validity.badInput && e.target.type == 'number'){
                        msg = messages.number;
                    }
                    else if(e.target.validity.typeMismatch && e.target.type == 'email'){
                        msg = messages.email;
                    }
                    else if(e.target.validity.typeMismatch && e.target.type == 'url'){
                        msg = messages.url;
                    }
                    else if(e.target.validity.patternMismatch && e.target.getAttribute("pattern") != 'undefined'){
                        msg = messages.pattern.replace('{0}', e.target.pattern);
                    }

                    else if(e.target.validity.rangeUnderflow && e.target.type == 'number' && e.target.getAttribute("min") != 'undefined'){
                        msg = messages.min.replace('{0}', e.target.min);
                    }

                    else if(e.target.validity.rangeOverflow && e.target.type == 'number' && e.target.getAttribute("max") != 'undefined'){
                        msg = messages.max.replace('{0}', e.target.getAttribute('max'));
                    }
                    else if(e.target.validity.stepMismatch && e.target.type == 'number' && e.target.getAttribute("step") != 'undefined'){
                        var start, step, val, min, max;
                        start = 0;
                        if(e.target.getAttribute("min") != 'undefined') start = parseInt(e.target.getAttribute("min"));
                        step = parseInt(e.target.e.target.getAttribute("step"));
                        val = parseInt(e.target.e.target.getAttribute("value"));
                        min = Math.floor((val)/step)*step;
                        max = min + step;
                        msg = messages.step;
                        msg = msg.replace('{0}', min);
                        msg = msg.replace('{1}', max);
                    }
                    else if(e.target.validity.tooLong && e.target.getAttribute("maxlength") != 'undefined' ){
                        msg = messages.maxlength.replace('{0}', e.target.maxlength);
                    }
                    else if(e.target.validity.tooShort && e.target.getAttribute("minlength") != 'undefined'){
                        msg = messages.minlength.replace('{0}', e.target.getAttribute("minlength"));
                    }
                    else if(e.target.type == 'date'){
                        msg = messages.date;
                    }
                    else {
                        msg = tr("Invalid value");
                    }
                    e.target.setCustomValidity(msg);
                }
            };


            $.fn.set_err_message_i18n = function() {
                this.each(function(i, e_target){
                    e_target.oninvalid = init_error_message;
                    e_target.oninput = function(e) {
                        e.preventDefault();
                        init_error_message(e);
                    };
                });
                return this;
            };

        };

    });

}( jQuery ));

