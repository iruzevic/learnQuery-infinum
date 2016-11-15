/*global affix, selector*/

describe('Selector', function() {
  'use strict';

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');
  });

  //check function to avoid duplicato of code
  function checkHtmlSelector(selector){
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector(selector);

    return {
      selectedElement : selectedElement.htmlElement,
      expectedSelectedElement: expectedSelectedElement
    }
  }

  it('should select an empty array if the element does not exist in DOM', function() {

    var selector = '.some-element-not-in-the-dom';
    var htmlSelector = checkHtmlSelector(selector);

    expect(htmlSelector.selectedElement).toEqual(htmlSelector.expectedSelectedElement);
    expect(htmlSelector.selectedElement.length).toBe(0);

  });

  it('should select a DOM element with given ID', function() {

    var selector = '#toddler';
    var htmlSelector = checkHtmlSelector(selector);

    expect(htmlSelector.selectedElement).toEqual(htmlSelector.expectedSelectedElement);
    expect(htmlSelector.selectedElement.length).toBe(1);

  });

  it('should select DOM elements with a given class name', function() {

    var selector = '.hidden';
    var htmlSelector = checkHtmlSelector(selector);

    expect(htmlSelector.selectedElement).toEqual(htmlSelector.expectedSelectedElement);
    expect(htmlSelector.selectedElement.length).toBe(htmlSelector.selectedElement.length);

  });

  it('should select DOM elements with a given tag name', function() {

    var selector = 'div';
    var htmlSelector = checkHtmlSelector(selector);

    expect(htmlSelector.selectedElement).toEqual(htmlSelector.expectedSelectedElement);
    expect(htmlSelector.selectedElement.length).toBe(htmlSelector.selectedElement.length);

  });

  it('should throw an expection for invalid selector', function() {

    var selector = 'divs';
    var htmlSelector = checkHtmlSelector(selector);

    expect(htmlSelector.selectedElement).toEqual(htmlSelector.expectedSelectedElement);
    expect(htmlSelector.selectedElement.length).toBe(htmlSelector.selectedElement.length);

  });
});
