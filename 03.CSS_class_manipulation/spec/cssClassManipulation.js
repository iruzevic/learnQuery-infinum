/*global affix, cssClass*/

describe('CssClassManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should add a css class to the element', function() {
    // code goes here
  });

  it('should not overwrite existing css classes', function() {
    // code goes here
  });

  it('should remove a specific css class of the element', function() {
    // code goes here
  });

  it('should toggle a css class of the element', function() {
    // code goes here
  });

  it('should return true if a HTML element has a given css class', function() {
    // code goes here
  });

  it('should return false if a HTML element doesn\'t have a given css class', function() {
    // code goes here
  });
});
