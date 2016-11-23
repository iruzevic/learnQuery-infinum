/*global affix, cssClass*/

describe('CssClassManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
    );

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should add a css class to the element', function() {

    var className = 'test';

    expect($selectedElement.hasClass(className)).toBe(false);

    cssClass.add(selectedElement, className);

    expect($selectedElement.hasClass(className)).toBe(true);

  });

  it('should not overwrite existing css classes', function() {

    var classNameFirst = 'test';
    var classNameSecond = 'another_test';

    $selectedElement.addClass(classNameFirst);

    expect($selectedElement.hasClass(classNameFirst)).toBe(true);

    cssClass.add(selectedElement, classNameSecond);

    expect($selectedElement.hasClass(classNameFirst)).toBe(true);
    expect($selectedElement.hasClass(classNameSecond)).toBe(true);

  });

  it('should remove a specific css class of the element', function() {

    var className = 'test';

    $selectedElement.addClass(className);

    expect($selectedElement.hasClass(className)).toBe(true);

    cssClass.remove(selectedElement, className);

    expect($selectedElement.hasClass(className)).toBe(false);

  });

  it('should toggle a css class of the element', function() {

    var className = 'test';

    expect($selectedElement.hasClass(className)).toBe(false);

    cssClass.toggle(selectedElement, className);

    expect($selectedElement.hasClass(className)).toBe(true);

    cssClass.toggle(selectedElement, className);

    expect($selectedElement.hasClass(className)).toBe(false);

  });

  it('should return true if a HTML element has a given css class', function() {

    var className = 'test';

    $selectedElement.addClass(className);

    var hasClass = cssClass.has(selectedElement, className);

    expect(hasClass).toBe(true);

  });

  it(
    'should return false if a HTML element doesn\'t have a given css class',
    function() {

      var className = 'test';

      var hasClass = cssClass.has(selectedElement, className);

      expect(hasClass).toBe(false);

    });
});
