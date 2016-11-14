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
  });

  it('should return an existing CSS property value of an HTML element', function() {
    // code goes here
  });

  it('should set multiple CSS properties of an HTML element', function() {
    // code goes here
  });

  it('should properly set CSS properties if called multiple times on different HTML elements', function() {
    // code goes here
  });
});
