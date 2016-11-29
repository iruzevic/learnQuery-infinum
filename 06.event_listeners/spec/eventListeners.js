/* global affix*/
/* global eventListener*/

describe('EventListeners', function() {
  'use strict';

  var $selectedElement, selectedElement, methods;

  beforeEach(function() {
    affix(
      '.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]'
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

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should be able to add a click event to an HTML element', function() {

    eventListener.on(selectedElement, 'click', methods.showLove);

    $selectedElement.click();

    expect(methods.showLove).toHaveBeenCalled();

  });

  it(
    'should be able to add the same event+callback two times to an HTML element',
    function() {

      eventListener.off(selectedElement);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.showLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(3);
    });


  it(
    'should be able to add the same callback for two different events to an HTML element',
    function() {

      eventListener.off(selectedElement);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'dblclick', methods.showLove);

      eventListener.trigger(selectedElement, 'click');
      eventListener.trigger(selectedElement, 'dblclick');

      expect(methods.showLove.calls.count()).toEqual(2);
    });

  it(
    'should be able to add two different callbacks for same event to an HTML element',
    function() {

      eventListener.off(selectedElement);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.moreLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(1);
      expect(methods.moreLove.calls.count()).toEqual(1);
    });

  it('should be able to remove one event handler of an HTML element',
    function() {

      eventListener.off(selectedElement);

      expect(methods.showLove.calls.count()).toEqual(0);
      expect(methods.moreLove.calls.count()).toEqual(0);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.moreLove);

      eventListener.off(selectedElement, 'click', methods.showLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(0);
      expect(methods.moreLove.calls.count()).toEqual(1);

    });

  it('should be able to remove all click events of a HTML element',
    function() {

      expect(methods.showLove.calls.count()).toEqual(0);
      expect(methods.moreLove.calls.count()).toEqual(0);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.moreLove);
      eventListener.on(selectedElement, 'dblclick', methods.showLove);

      eventListener.off(selectedElement, 'click');

      eventListener.trigger(selectedElement, 'click');
      eventListener.trigger(selectedElement, 'dblclick');

      expect(methods.showLove.calls.count()).toEqual(1);
      expect(methods.moreLove.calls.count()).toEqual(0);

    });

  it('should be able to remove all events of a HTML element', function() {

    eventListener.on(selectedElement, 'click', methods.showLove);
    eventListener.on(selectedElement, 'click', methods.moreLove);
    eventListener.on(selectedElement, 'dblclick', methods.showLove);
    eventListener.on(selectedElement, 'dblclick', methods.moreLove);

    eventListener.off(selectedElement);

    eventListener.trigger(selectedElement, 'click');
    eventListener.trigger(selectedElement, 'dblclick');

    expect(methods.showLove.calls.count()).toEqual(0);
    expect(methods.moreLove.calls.count()).toEqual(0);

  });

  it('should trigger a click event on a HTML element', function() {

    selectedElement.addEventListener('click', methods.showLove);

    eventListener.trigger(selectedElement, 'click');

    expect(methods.showLove.calls.count()).toEqual(1);
  });

  it('should delegate an event to elements with a given css class name',
    function() {

      eventListener.delegate(selectedElement, 'infinum', 'click', methods
        .showLove);

      $('.infinum').click();

      expect(methods.showLove.calls.count()).toEqual(1);
    });

  it(
    'should not delegate an event to elements without a given css class name',
    function() {

      eventListener.delegate(selectedElement, '', 'click', methods
        .showLove);

      $('.infinum').click();

      expect(methods.showLove.calls.count()).toEqual(0);
    });

  it(
    'should delegate an event to elements that are added to the DOM to after delegate call',
    function() {

      var newElementClass = 'new_element';
      eventListener.delegate(selectedElement, newElementClass,
        'click', methods.showLove);


      $selectedElement.append('<div class="' + newElementClass +
        '"></div>');

      $('.' + newElementClass).click();

      expect(methods.showLove.calls.count()).toEqual(1);

    });

  it(
    'should trigger delegated event handler when clicked on an element inside a targeted element',
    function() {

      var newElementClass = 'new_element';

      eventListener.delegate(selectedElement, 'infinum', 'click', methods
        .showLove);

      $selectedElement.find('.infinum').append('<div class="' +
        newElementClass + '"></div>');

      $('.' + newElementClass).click();

      expect(methods.showLove.calls.count()).toEqual(1);
    });

  it(
    'should not trigger delegated event handler if clicked on container of delegator',
    function() {

      eventListener.delegate(selectedElement, 'infinum', 'click', methods
        .showLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(0);

    });

  it(
    'should trigger delegated event handler multiple times if event happens on multiple elements',
    function() {
      eventListener.delegate(selectedElement, 'subtitle', 'click',
        methods.showLove);

      $('.subtitle').trigger('click');

      expect(methods.showLove.calls.count()).toEqual(2);
      expect($('.subtitle').length).toEqual(2);
    });

  it(
    'should not trigger method registered on element A when event is triggered on element B',
    function() {
      var elementA = $selectedElement.find('.title')[0];
      var elementB = $selectedElement.find('.infinum')[0];

      eventListener.on(elementA, 'click', methods.showLove);
      eventListener.on(elementB, 'click', methods.moreLove);

      $(elementA).trigger('click');

      expect(methods.showLove).toHaveBeenCalled();
      expect(methods.moreLove).not.toHaveBeenCalled();
    });
  it(
    'should trigger delegated event handler when clicked on an element 2 levels inside a targeted element',
    function() {

      var newElementClass1 = 'new_element';
      var newElementClass2 = 'new_element2';

      eventListener.delegate(selectedElement, 'new_element2', 'click',
        methods.showLove);

      $selectedElement.find('.infinum').append('<div class="' +
        newElementClass1 + '"><div class="' +
        newElementClass2 + '"></div><div class="' +
        newElementClass2 + '"></div></div>').append('<div class="' +
        newElementClass2 + '"></div>');

      $('.' + newElementClass2).click();

      expect(methods.showLove.calls.count()).toEqual(3);
    });
});
