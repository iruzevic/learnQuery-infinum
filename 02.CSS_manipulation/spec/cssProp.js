/*global affix, cssProp*/

describe('cssProp', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
    );

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];

  });

  it('should set a CSS attribute of an HTML element', function() {
    var property = 'fontSize';
    var value = '50px';

    cssProp(selectedElement, property, value);

    expect($selectedElement.css(property)).toEqual(value);
  });

  it('should return an existing CSS property value of an HTML element',
    function() {

      var property = 'color';

      expect($selectedElement.css(property)).toEqual(cssProp(
        selectedElement, property));

    });

  it('should set multiple CSS properties of an HTML element', function() {

    var propertyObj = {
      'font-size': '40px',
      'color': 'red',
      'position': 'relative'
    };

    cssProp(selectedElement, propertyObj);

    expect($selectedElement.attr('style')).toMatch(selectedElement.style
      .cssText);
  });

  it(
    'should properly set CSS properties if called multiple times on different HTML elements',
    function() {

      var property = 'fontSize';
      var $anotherSelectedElement = $('.learn-query-testing');
      var anotherSelectedElement = $anotherSelectedElement[0];

      cssProp(selectedElement, property, 0);
      cssProp(selectedElement, property, '20px');

      cssProp(anotherSelectedElement, property, '20px');
      cssProp(anotherSelectedElement, property, '40px');

      expect($selectedElement.css(property)).toEqual('20px');
      expect($anotherSelectedElement.css(property)).toEqual('40px');
    });
});
