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

    var selector = '#toddler';
    var property = 'fontSize';
    var value = '50px';
    var expectedPropertyValue = '';

    cssProp(selector, property, value);

    expectedPropertyValue = $selectedElement.css(property);

    expect(cssProp(selector, property)).toEqual(expectedPropertyValue);
  });

  it('should return an existing CSS property value of an HTML element', function() {

    var selector = '#toddler';
    var property = 'fontSize';
    var value = '50px';
    var expectedPropertyValue = '';

    cssProp(selector, property, value);

    expectedPropertyValue = $selectedElement.css(property);

    expect(cssProp(selector, property)).toEqual(expectedPropertyValue);

  });

  it('should set multiple CSS properties of an HTML element', function() {

    var selector = '#toddler';
    var propertyObj = {
      'font-size' : '40px',
      'color'     : 'red',
      'position'  : 'relative'
    };
    var expectedPropertyValues = '';

    cssProp(selector, propertyObj);

    expectedPropertyValues = $selectedElement.attr('style');

    expect(cssProp(selector)).toMatch(expectedPropertyValues);
  });

  it('should properly set CSS properties if called multiple times on different HTML elements', function() {

    var property = 'fontSize';
    var selectorValueArray = [
      {
        selector: '#toddler',
        value: '50px',
      },
      {
        selector: '.learn-query-testing',
        value: '25px',
      },
      {
        selector: '#toddler',
        value: '15px'
      }
    ];

    selectorValueArray.forEach( function (arrayItem){

      cssProp(arrayItem.selector, property, arrayItem.value);

      expect(cssProp(arrayItem.selector, property)).toEqual($(arrayItem.selector).css(property));

    });


  });
});
