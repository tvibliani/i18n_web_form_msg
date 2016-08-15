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


function tr(str){
    return "TRANSLATED " + str;
}

var messages = {
    required: tr("This field is required."), //found
    remote: tr("Please fix this field."), //??
    email: tr("Please enter a valid email address."), //found
    url: tr("Please enter a valid URL."), //found
    date: tr("Please enter a valid date."), //found
    dateISO: tr("Please enter a valid date (ISO)."), //??
    number: tr("Please enter a number."), //found
    digits: tr("Please enter only digits."), //??
    creditcard: tr("Please enter a valid credit card number."), //??
    equalTo: tr("Please enter the same value again."), //??
    accept: tr("Please enter a value with a valid extension."), //??
    maxlength: tr("Please enter no more than {0} characters."), //found
    minlength: tr("Please enter at least {0} characters."), //found
    rangelength: tr("Please enter a value between {0} and {1} characters long."), //??
    range: tr("Please enter a value between {0} and {1}."), //??
    max: tr("Please enter a value less than or equal to {0}."), //found
    min: tr("Please enter a value greater than or equal to {0}."), //found
    step: tr("Please enter a valid value. The two nearest valid values are {0} and {1}."),  //added
    pattern: tr("Please match the requested format: {0} . "), //added
    select: tr("Please select an item in the list.") //added
};


$('input, select').on('change', function() {
    var e = $(this).get(0);

    e.setCustomValidity("");
    if (!e.validity.valid) {
        var msg;
        if(e.validity.valueMissing && e.hasAttribute('required')){
            msg = messages.required;
        }
        else if(e.validity.badInput && e.type == 'number'){
            msg = messages.number;
        }
        else if(e.validity.typeMismatch && e.type == 'email'){
            msg = messages.email;
        }
        else if(e.validity.typeMismatch && e.type == 'urld'){
            msg = messages.url;
        }
        else if(e.validity.patternMismatch && e.getAttribute("pattern") != 'undefined'){
            msg = messages.pattern.replace('{0}', e.pattern);
        }

        else if(e.validity.rangeUnderflow && e.type == 'number' && e.getAttribute("min") != 'undefined'){
            msg = messages.min.replace('{0}', e.min);
        }

        else if(e.validity.rangeOverflow && e.type == 'number' && e.getAttribute("max") != 'undefined'){
            msg = messages.max.replace('{0}', e.getAttribute('max'));
        }
        else if(e.validity.stepMismatch && e.type == 'number' && e.getAttribute("step") != 'undefined'){
            var start, step, val, min, max;
            start = 0;
            if(e.getAttribute("min") != 'undefined') start = parseInt(e.getAttribute("min"));
            step = parseInt(e.e.getAttribute("step"));
            val = parseInt(e.e.getAttribute("value"));
            min = Math.floor((val)/step)*step;
            max = min + step;
            msg = messages.step;
            msg = msg.replace('{0}', min);
            msg = msg.replace('{1}', max);
        }
        else if(e.validity.tooLong && e.getAttribute("maxlength") != 'undefined' ){
            msg = messages.maxlength.replace('{0}', e.maxlength);
        }
        else if(e.validity.tooShort && e.getAttribute("minlength") != 'undefined'){
            msg = messages.minlength.replace('{0}', e.getAttribute("minlength"));
        }
        else if(e.type == 'date'){
            msg = messages.date;
        }
        else {
            msg = tr(e.validationMessage);
        }
        e.setCustomValidity(msg);
    }

});
;

