var eventListener = (function() {
  'use strict';

  var eventList = [];

  var setEventListenersList = function(element, event, callback) {
    if (!eventList[element]) {
      eventList[element] = [];
    }
    if (!eventList[element][event]) {
      eventList[element][event] = [];
    }
    eventList[element][event].push(callback);
  };

  var getElementsEventListeners = function(element) {
    return eventList[element];
  };

  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {

      obj.addEventListener(type, fn, false);

    } else if (obj.attachEvent) {

      obj.attachEvent('on' + type, function() {

        return fn.call(obj, window.event);

      });
    }
  }

  var addEventListeners = function(element, event, callback) {

    var listeners = getElementsEventListeners(element);
    var eventType;

    var callbackFunction = function(call) {

      element.addEventListener(eventType, call);

      // TODO: Multiple same events on the same element
      // if (eventList[element][event] === callback) {
      //   element.addEventListener(eventType, function() {
      //     callback();
      //   });
      // }

    };

    for (eventType in listeners) {
      if (listeners.hasOwnProperty(eventType)) {
        listeners[eventType].forEach(callbackFunction);
      }
    }
  };

  var removeEventListener = function(element, event, callback) {

    var listeners = getElementsEventListeners(element);
    var eventType;

    var callbackFunction = function(call) {
      if (!callback && !event) {
        element.removeEventListener(eventType, call);
      } else if (!callback) {
        if (event === eventType) {
          element.removeEventListener(eventType, call);
        }
      } else {
        element.removeEventListener(event, callback);
      }
    };

    for (eventType in listeners) {
      if (listeners.hasOwnProperty(eventType)) {
        listeners[eventType].forEach(callbackFunction);
      }
    }

  };

  var getEventTarget = function(e) {
    return e.target || e.srcElement;
  };

  return {
    on: function(element, event, callback) {

      setEventListenersList(element, event, callback);
      addEventListeners(element, event, callback);

    },
    trigger: function(element, event) {

      var eventObject = new Event(event);

      element.addEventListener(event, false);
      element.dispatchEvent(eventObject);

    },
    off: function(element, event, callback) {

      removeEventListener(element, event, callback);

    },
    delegate: function(monitoredElement, className, event, callback) {
      monitoredElement.addEventListener(event, function(e) {
        var target = getEventTarget(e);

        if (className === '') {
          return false;
        }

        if (target.className === className || target.parentNode.className ===
          className) {
          return callback();
        }
      }, false);
    }
  };
})();
