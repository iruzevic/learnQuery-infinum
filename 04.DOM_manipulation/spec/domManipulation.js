describe('domManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement, domSelector;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]+select>(option[value="awesome"]+option[value="cool"])');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];

    domSelector = new dom();
  });

  it('should be able to remove a HTML element', function() {

    expect(selectedElement).not.toBeUndefined();

    domSelector.remove(selectedElement);

    expect($('#toddler')[0]).toBeUndefined();
  });

  it('should append a HTML element to the given element', function() {

    expect($selectedElement.children().last().prop('outerHTML')).not.toEqual('<p></p>');

    domSelector.append(selectedElement, 'p');

    expect($selectedElement.children().last().prop('outerHTML')).toEqual('<p></p>');

  });

  it('should prepend a HTML element to the given element', function() {

    expect($selectedElement.children().first().prop('outerHTML')).not.toEqual('<p></p>');

    domSelector.prepend(selectedElement, 'p');

    expect($selectedElement.children().first().prop('outerHTML')).toEqual('<p></p>');
  });

  it('should be able to add a new HTML element after a given HTML element', function() {

    expect($selectedElement.next().prop('outerHTML')).not.toEqual('<p></p>');

    domSelector.after(selectedElement, 'p');

    expect($selectedElement.next().prop('outerHTML')).toEqual('<p></p>');
  });

  it('should be able to add a new HTML element before a given HTML element', function() {

    expect($selectedElement.prev().prop('outerHTML')).not.toEqual('<p></p>');

    domSelector.before(selectedElement, 'p');

    expect($selectedElement.prev().prop('outerHTML')).toEqual('<p></p>');
  });

  it('should return a value of a given HTML non-select element', function() {

    expect(domSelector.val($selectedElement.find('input')[0])).toEqual('cuddle bunny');
    expect(domSelector.val($selectedElement.find('h1')[0])).toBeUndefined();

  });

  it('should return a value of a given select HTML element', function(){

    expect(domSelector.val($selectedElement.find('select')[0])).toEqual('awesome');

  });

  it('should not throw exception if the target element is not in the DOM when calling dom.remove', function() {

    var $nonExistingElement = $('toddlers');
    var nonExistingElement = $nonExistingElement[0];

    expect(function() {domSelector.remove(nonExistingElement)}).toThrowError('target element not provided or not in dom');

  });

  it('should not throw exception if the target element is not in the DOM when calling dom.after', function() {

    var $nonExistingElement = $('toddlers');
    var nonExistingElement = $nonExistingElement[0];

    expect(function() {domSelector.after(nonExistingElement, 'p')}).toThrowError('target element not provided or not in dom');

  });
});
