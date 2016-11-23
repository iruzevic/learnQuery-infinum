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
      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.showLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(2);
    });


  it(
    'should be able to add the same callback for two different events to an HTML element',
    function() {
      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'dblclick', methods.showLove);

      eventListener.trigger(selectedElement, 'click');
      eventListener.trigger(selectedElement, 'dblclick');

      expect(methods.showLove.calls.count()).toEqual(2);
    });

  it(
    'should be able to add two different callbacks for same event to an HTML element',
    function() {
      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.moreLove);

      $selectedElement.click();

      expect(methods.showLove.calls.count()).toEqual(1);
      expect(methods.moreLove.calls.count()).toEqual(1);
    });

  it('should be able to remove one event handler of an HTML element',
    function() {
      // code goes here

      expect(methods.showLove.calls.count()).toEqual(0);
      expect(methods.moreLove.calls.count()).toEqual(0);

      eventListener.on(selectedElement, 'click', methods.showLove);
      eventListener.on(selectedElement, 'click', methods.moreLove);

      eventListener.off(selectedElement, 'click', methods.showLove);

      eventListener.trigger(selectedElement, 'click');

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
      expect(methods.moreLove).not.toHaveBeenCalled();

    });

  it('should be able to remove all events of a HTML element', function() {
    // code goes here
  });

  it('should trigger a click event on a HTML element', function() {
    // code goes here
  });

  it('should delegate an event to elements with a given css class name',
    function() {
      // code goes here
    });

  it(
    'should not delegate an event to elements without a given css class name',
    function() {
      // code goes here
    });

  it(
    'should delegate an event to elements that are added to the DOM to after delegate call',
    function() {
      // code goes here
    });

  it(
    'should trigger delegated event handler when clicked on an element inside a targeted element',
    function() {
      // code goes here
    });

  it(
    'should not trigger delegated event handler if clicked on container of delegator',
    function() {
      // code goes here
    });

  it(
    'should not trigger delegated event handler if clicked on container of delegator',
    function() {
      // code goes here
    });

  it(
    'should trigger delegated event handler multiple times if event happens on multiple elements',
    function() {
      // code goes here
    });

  it(
    'should not trigger method registered on element A when event is triggered on element B',
    function() {
      // code goes here
    });
});
