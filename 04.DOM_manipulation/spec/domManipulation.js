describe('domManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement, domSelector;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]+select>(option[value="awesome"]+option[value="cool"])'
    );

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];

    domSelector = new dom();
  });

  it('should be able to remove a HTML element', function() {

    expect(document.contains(selectedElement)).toBe(true);

    domSelector.remove(selectedElement);

    expect(document.contains(selectedElement)).toBe(false);

  });

  it('should append a HTML element to the given element', function() {

    var newElement = document.createElement('p');

    expect($selectedElement.children().last()[0]).not.toEqual(
      newElement);

    domSelector.append(selectedElement, newElement);

    expect($selectedElement.children().last()[0]).toEqual(newElement);

  });

  it('should prepend a HTML element to the given element', function() {

    var newElement = document.createElement('p');

    expect($selectedElement.children().first()[0]).not.toEqual(
      newElement);

    domSelector.prepend(selectedElement, newElement);

    expect($selectedElement.children().first()[0]).toEqual(newElement);

  });

  it('should be able to add a new HTML element after a given HTML element',
    function() {

      var newElement = document.createElement('p');

      expect($selectedElement.next()[0]).not.toEqual(
        newElement);

      domSelector.after(selectedElement, newElement);

      expect($selectedElement.next()[0]).toEqual(newElement);
    });

  it('should be able to add a new HTML element before a given HTML element',
    function() {

      var newElement = document.createElement('p');

      expect($selectedElement.prev()[0]).not.toEqual(newElement);

      domSelector.before(selectedElement, newElement);

      expect($selectedElement.prev()[0]).toEqual(newElement);
    });

  it('should return a value of a given HTML non-select element', function() {

    expect(domSelector.val($selectedElement.find('input')[0])).toEqual(
      'cuddle bunny');
    expect(domSelector.val($selectedElement.find('h1')[
      0])).toMatch('');

  });

  it('should return a value of a given select HTML element', function() {

    expect(domSelector.val($selectedElement.find('select')[0])).toEqual(
      'awesome');

  });

  it(
    'should not throw exception if the target element is not in the DOM when calling dom.remove',
    function() {

      var $nonExistingElement = $('#toddlersss');
      var nonExistingElement = $nonExistingElement[0];

      expect(function() {
        domSelector.remove(nonExistingElement)
      }).not.toThrowError();

    });

  it(
    'should not throw exception if the target element is not in the DOM when calling dom.after',
    function() {

      var $nonExistingElement = $('#toddlersss');
      var nonExistingElement = $nonExistingElement[0];

      var newElement = document.createElement('p');

      expect(function() {
        domSelector.after(nonExistingElement, newElement)
      }).not.toThrowError();

    });
});
