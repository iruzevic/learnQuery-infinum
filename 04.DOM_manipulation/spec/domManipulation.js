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

    console.log(selectedElement, $selectedElement);

    // domSelector.append(selectedElement, 'p');
    console.log(selectedElement, $selectedElement);

    expect($selectedElement.find('p')[0]).not.toBeUndefined();

  });

  it('should prepend a HTML element to the given element', function() {

    expect($selectedElement.find('p')[0]).toBeUndefined();

    domSelector.prepend(selectedElement, 'p');

    expect($selectedElement.find('p')[0]).not.toBeUndefined();
  });

  it('should be able to add a new HTML element after a given HTML element', function() {

    domSelector.after(selectedElement, 'p');
  });

  it('should be able to add a new HTML element before a given HTML element', function() {

    domSelector.before(selectedElement, 'p');
  });

  it('should return a value of a given HTML non-select element', function() {

    domSelector.val(selectedElement);
  });

  it('should return a value of a given select HTML element', function(){    // code goes here

    domSelector.val(selectedElement);
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.remove', function() {

    selectedElement = 'p';

    expect(function() {domSelector.remove(selectedElement)}).toThrowError('Invalid or non existing element');

  });

  it('should not throw exception if the target element is not in the DOM when calling dom.after', function() {

    expect(function() {domSelector.after(selectedElement, 'p')}).toThrowError('Invalid or non existing element');

  });
});
