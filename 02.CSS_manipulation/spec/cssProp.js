/*global affix, cssProp*/

describe('cssProp', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];

  });

  it('should set a CSS attribute of an HTML element', function() {
    // code goes here

    var selector = '#toddler';
    var property = 'font-size';
    var value = '50px';

    cssProp(selector, property, value);

    expect($selectedElement.css(property)).toEqual(value);
  });

  it('should return an existing CSS property value of an HTML element', function() {
    // code goes here
    var selector = '#toddler';
    var property = 'fontSize';
    var value = '50px';
    var getvalue = '';

    cssProp(selector, 'fontSize', value);
    getvalue = cssProp(selector, property);

    expect($selectedElement.css(property)).toEqual(getvalue);

  });

  it('should set multiple CSS properties of an HTML element', function() {
    // code goes here
    var selector = '#toddler';
    var propertyObj = {
      'font-size' : '40px',
      'color'     : 'red',
      'position'  : 'relative'
    };
    var getvalues = '';

    cssProp(selector, propertyObj);
    // getvalues = cssProp(selector, property);

    console.log($selectedElement.attr('style'));
    // expect($selectedElement.attr('style')).toEqual(propertyObj);
  });

  it('should properly set CSS properties if called multiple times on different HTML elements', function() {
    // code goes here
  });
});
