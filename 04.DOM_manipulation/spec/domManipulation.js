describe('domManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement, domSelector;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

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

    expect($selectedElement.find('p')[0]).toBeUndefined();

    domSelector.append(selectedElement, 'p');

    expect($selectedElement.find('p')[0]).not.toBeUndefined();

  });

  it('should prepend a HTML element to the given element', function() {
    // code goes here

    expect($selectedElement.find('p')[0]).toBeUndefined();

    domSelector.prepend(selectedElement, 'p');

    expect($selectedElement.find('p')[0]).not.toBeUndefined();
  });

  it('should be able to add a new HTML element after a given HTML element', function() {
    // code goes here
  });

  it('should be able to add a new HTML element before a given HTML element', function() {
    // code goes here
  });

  it('should return a value of a given HTML non-select element', function() {
    // code goes here
  });

  it('should return a value of a given select HTML element', function(){
    // code goes here
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.remove', function() {
    // code goes here
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.after', function() {
    // code goes here
  });
});
