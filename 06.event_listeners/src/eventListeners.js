var eventListener = (function() {
  'use strict';

  var eventList = {};

  // var f = EventTarget.prototype.addEventListener;
  // EventTarget.prototype.addEventListener = function(type, fn, capture) {
  //   this.f = f;
  //   this.f(type, fn, capture);
  //   alert('Added Event Listener: on' + type);
  // };

  var getAllEventListeners = function(element, event) {
    var eventsAray = [];
    if (event) {
      eventsAray = eventList[element];
    } else {
      eventsAray = eventList[element][event];
    }

    return eventsAray;
  };

  var hasEventListener = function(element, event, callback) {
    if (!eventList || !eventList[element] || !eventList[element][event]) {
      return false;
    }

    for (var i = 0; i < eventList[element][event].length; i++) {
      if (eventList[element][event][i] === callback) {
        return true;
      }
    }

    return false;
  };



  var setAddEventListenerList = function(element, event, callback) {

    if (!eventList[element]) {
      eventList[element] = [];
    }

    if (!eventList[element][event]) {
      eventList[element][event] = [];
    }

    eventList[element][event].push(callback);
  };

  var addTheSameEventListener = function(element, event, callback) {

    var init;
    var eventAction = 'on' + event;
    if (!element[eventAction]) {
      init = function() {

        // any clear comments.
      };
    } else {
      init = element[eventAction];
    }

    element[eventAction] = function() {
      init();
      callback();
    };
  };

  var removeAllEventListeners = function(element) {

  };

  return {
    on: function(element, event, callback) {

      if (hasEventListener(element, event, callback)) {
        addTheSameEventListener(element, event, callback);
      } else {
        element.addEventListener(event, callback);
      }

      setAddEventListenerList(element, event, callback);
    },
    trigger: function(element, event) {
      var eventObject = new Event(event);

      element.addEventListener(event, function() {

        // callback
      });
      element.dispatchEvent(eventObject);
    },
    off: function(element, event, callback) {

      if (!callback && !event) {
        element.removeEventListener(event, callback, false);
      } else if (!callback) {
        var eventsArray = getAllEventListeners(element, event);
        console.log(eventsArray);
        for (var i = 0; i < eventsArray.length; i++) {
          element.removeEventListener(event, eventsArray[i]);
        }
      } else {
        console.log('c');
        // removeAllEventListeners(element);
        element.removeEventListener(event, callback, false);
      }
    }
  };
})();
