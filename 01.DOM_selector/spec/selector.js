/*global affix, selector*/

describe('Selector', function() {
  'use strict';

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');
  });

  it('should select an empty array if the element does not exist in DOM', function() {

    var selector = '.some-element-not-in-the-dom';
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector(selector);

    expect(selectedElement).toEqual(expectedSelectedElement);
    expect(selectedElement.length).toBe(0);

  });

  it('should select a DOM element with given ID', function() {

    var selector = '#toddler';
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector(selector);

    expect(selectedElement).toEqual(expectedSelectedElement);
  });

  it('should select DOM elements with a given class name', function() {

    var selector = '.hidden';
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector(selector);

    expect(selectedElement).toEqual(expectedSelectedElement);
  });

  it('should select DOM elements with a given tag name', function() {

    var selector = 'span';
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector(selector);

    expect(selectedElement).toEqual(expectedSelectedElement);

  });

  it('should throw an expection for invalid selector', function() {

    var selector = '12312312';
    var expectedSelectedElement = $.makeArray($(selector));

    expect(function() {domSelector(selector)}).toThrowError('Invalid or non existing selector');

  });
});
