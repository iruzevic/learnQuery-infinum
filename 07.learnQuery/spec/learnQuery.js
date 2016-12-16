/*global affix, learnQuery*/

describe('LearnQuery', function() {
  'use strict';

  var $selectedElement, selectedElement, methods, selector;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]+select>(option[value="awesome"]+option[value="cool"])+select>(option[value="awesome1"]+option[value="cool1"])'
    );

    methods = {
      showLove() {
          console.log('<3 JavaScript <3');
        },
        moreLove() {
          console.log('JS More love');
        }
    };

    spyOn(methods, 'showLove');
    spyOn(methods, 'moreLove');

    selector = '#toddler';
    $selectedElement = $(selector);
    selectedElement = $selectedElement.get(0);

    learnQuery(selector).off();

  });

  it('should allow cssClass method chaining', function() {

    learnQuery(selector).addClass('first').addClass('secound').addClass(
      'third').removeClass('secound');

    expect($selectedElement.hasClass('first')).toBe(true);
    expect($selectedElement.hasClass('secound')).toBe(false);
    expect($selectedElement.hasClass('third')).toBe(true);

  });

  it('should allow dom method chaining', function() {

    var newElementH1 = document.createElement('h1');
    var newElementH2 = document.createElement('h2');
    var newElementH3 = document.createElement('h3');
    var removeElement = $('.subtitle');

    learnQuery(selector)
      .before(newElementH3)
      .after(newElementH1)
      .append(newElementH2)
      .remove(removeElement);

    expect($selectedElement.prev()[0]).toEqual(newElementH3);
    expect($selectedElement.next()[0]).toEqual(newElementH1);
    expect($selectedElement.children().last()[0]).toEqual(newElementH2);
    expect(document.contains(removeElement[0])).toBe(false);

  });

  it('should allow eventListener method chaining', function() {

    learnQuery(selector)
      .on('click', methods.showLove)
      .on('click', methods.moreLove)
      .on('dblclick', methods.showLove)
      .off('dblclick', methods.showLove)
      .trigger('click')
      .trigger('dblclick');

    expect(methods.showLove.calls.count()).toBe(1);
    expect(methods.moreLove.calls.count()).toBe(1);

  });

  it('should allow eventListener to work in different scopes', function() {

    learnQuery(selector).on('click', methods.showLove);
    learnQuery(selector).off('click', methods.showLove);
    learnQuery(selector).trigger('click');

    expect(methods.showLove.calls.count()).toEqual(0);

  });

  it('should allow multiple methods chaining', function() {

    var selector = '.hidden';
    var newElement = document.createElement('h2');
    var $selectedElement = $(selector);
    var expectedSelectedElement = $.makeArray($selectedElement);

    var property1 = 'fontSize';
    var value1 = '50px';

    var hasClass = learnQuery(selector)
      .append(newElement)
      .addClass('newSuperClass')
      .on('click', methods.showLove)
      .trigger('click')
      .cssProp(property1, value1)
      .hasClass('newSuperClass');


    expect(expectedSelectedElement[0].lastChild).toEqual(newElement);
    expect(expectedSelectedElement[0].style.fontSize).toEqual(value1);

    expect(expectedSelectedElement[1].style.fontSize).toEqual(value1);
    expect(expectedSelectedElement[1].lastChild).toEqual(newElement);
    expect($selectedElement.hasClass('newSuperClass')).toBe(true);
    expect(methods.showLove).toHaveBeenCalled();
    expect(hasClass).toBe(true);

  });

  it('should set a CSS attribute of an HTML element', function() {

    var selector = '.hidden';
    var $selectedElement = $(selector);
    var expectedSelectedElement = $.makeArray($selectedElement);

    var property1 = 'fontSize';
    var value1 = '50px';

    var property2 = 'fontWeight';
    var value2 = 'bold';

    var propertyObj = {
      'color': 'red',
      'position': 'relative'
    };

    learnQuery(selector).cssProp(property1, value1).cssProp(property2, value2).cssProp(propertyObj);

    expect(expectedSelectedElement[0].style.fontSize).toEqual(value1);
    expect(expectedSelectedElement[0].style.fontWeight).toEqual(value2);
    expect(expectedSelectedElement[0].style.color).toEqual(propertyObj.color);
    expect(expectedSelectedElement[0].style.position).toEqual(propertyObj.position);

    expect(expectedSelectedElement[1].style.fontSize).toEqual(value1);
    expect(expectedSelectedElement[1].style.fontWeight).toEqual(value2);
    expect(expectedSelectedElement[1].style.color).toEqual(propertyObj.color);
    expect(expectedSelectedElement[1].style.position).toEqual(propertyObj.position);
  });

  it('select value if provided with multiple options should return only first like jQuery ', function () {

    var selector = '#toddler select';

    expect(learnQuery(selector).val()).toEqual('awesome');

  });

});
