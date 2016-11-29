/*global affix, learnQuery*/

describe('LearnQuery', function() {
  'use strict';

  var $selectedElement, selectedElement, methods, selector;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
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

    learnQuery(selector).after(newElementH1).append(newElementH2).before(
      newElementH3);

    expect($selectedElement.next()[0]).toBe(newElementH1);
    expect($selectedElement.children().last()[0]).toBe(newElementH2);
    expect($selectedElement.prev()[0]).toBe(newElementH3);

  });

  it('should allow eventListener method chaining', function() {

    learnQuery(selector).on('click', methods.showLove).on('click',
      methods.moreLove).trigger('click');

    expect(methods.showLove.calls.count()).toBe(1);
    expect(methods.moreLove.calls.count()).toBe(1);

  });

  it('should allow multiple methods chaining', function() {

    var newElement = document.createElement('h1');

    learnQuery(selector).after(newElement).addClass('newSuperClass').on(
      'click', methods.showLove).trigger('click');

    expect($selectedElement.next()[0]).toBe(newElement);
    expect($selectedElement.hasClass('newSuperClass')).toBe(true);
    expect(methods.showLove).toHaveBeenCalled();

  });
});
