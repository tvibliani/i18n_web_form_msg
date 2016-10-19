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

        var fn_name = "web_form_message_i18n";
        var initialisator_fn_name = "init_" + fn_name;
        var setup_msg_fn_name = "set_" + fn_name;

        $.fn[setup_msg_fn_name] = function() {
            /*
             *  A placeholder function remainder, just in case.
             */
            console.error("Please call a " + initialisator_fn_name +
                    " function first, before using this function," +
                    " in order to initialize error message translations");
            throw "Error message i18n is uninitialized!";
        };

        window[initialisator_fn_name] = function(tr){
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
                select: tr("Please select an item in the list."), //added
                unknown_invalid_value: tr("Invalid value"),
            };


            var set_error_message = function(e) {
                var field = e.target;
                field.setCustomValidity("");
                if (!field.validity.valid) {
                    var msg;
                    if(field.validity.valueMissing && field.hasAttribute('required')){
                        var tagname = $( field ).prop("tagName").toUpperCase();
                        if ( tagname === "SELECT"){
                            msg = messages.select_required;
                        }
                        else if (field.type == "file") {
                            msg = messages.file_required;
                        } else {
                            msg = messages.required;
                        }
                    }
                    else if(field.validity.typeMismatch) {
                        if (field.type == 'email'){
                            msg = messages.email;
                        }
                        else if(field.type == 'url'){
                            msg = messages.url;
                        }
                    }
                    else if(field.validity.patternMismatch) {
                        if(field.getAttribute("pattern") != 'undefined'){
                            msg = messages.pattern.replace('{0}', field.pattern);
                        }
                    }
                    else if(field.validity.tooLong) {
                        if(field.getAttribute("maxlength") != 'undefined' ){
                            msg = messages.maxlength.replace('{0}', field.maxlength);
                        }
                    }
                    else if(field.validity.tooShort) {
                        if(field.getAttribute("minlength") != 'undefined'){
                            msg = messages.minlength.replace('{0}', field.getAttribute("minlength"));
                        }
                    }

                    else if(field.validity.rangeUnderflow) {
                        if(field.type == 'number' && field.getAttribute("min") != 'undefined'){
                            msg = messages.min.replace('{0}', field.min);
                        }
                    }
                    else if(field.validity.rangeOverflow) {
                        if(field.type == 'number' && field.getAttribute("max") != 'undefined'){
                            msg = messages.max.replace('{0}', field.getAttribute('max'));
                        }
                    }
                    else if(field.validity.stepMismatch) {
                        if(field.type == 'number' && field.getAttribute("step") != 'undefined'){
                            var start, step, val, min, max;
                            start = 0;
                            if(field.getAttribute("min") != 'undefined') start = parseInt(field.getAttribute("min"));
                            step = parseInt(field.getAttribute("step"));
                            val = parseInt(field.getAttribute("value"));
                            min = Math.floor((val)/step)*step;
                            max = min + step;
                            msg = messages.step;
                            msg = msg.replace('{0}', min);
                            msg = msg.replace('{1}', max);
                        }
                    }
                    else if(field.validity.badInput) {
                        if(field.type == 'number'){
                            msg = messages.number;
                        }
                    }
                    else if(field.validity.customError) {
                        // TODO
                    }
                    else if(field.type == 'date'){ //FIXME: move it to the third level
                        msg = messages.date;
                    }

                    if (msg === undefined) {
                        msg = messages.unknown_invalid_value;
                    }
                    field.setCustomValidity(msg);
                }
            };


            $.fn[setup_msg_fn_name] = function() {
                this.each(function(i, e_target){
                    e_target.oninvalid = set_error_message;
                    e_target.oninput = function(e) {
                        e.preventDefault();
                        set_error_message(e);
                    };
                });
                return this;
            };

        };

    });

}( jQuery ));

