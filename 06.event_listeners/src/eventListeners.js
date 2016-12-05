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

  var getEventTarget = function(e) {
    return e.target || e.srcElement;
  };

  var getEventPath = function(e) {
    return e.path;
  };

  return {
    on: function(element, event, callback) {

      if (!element) {
        throw new Error('Element not provided');
      }

      if (!eventList || !eventList[element] || !eventList[element][event]) {

        element.addEventListener(event, function(e) {
          if (typeof eventList[element][event] !== 'undefined') {
            eventList[element][event].forEach(function(call) {
              call(e);
            });
          }
        });

      }

      setEventListenersList(element, event, callback);

    },
    trigger: function(element, event) {

      var eventObject = new Event(event);
      element.dispatchEvent(eventObject);

    },
    off: function(element, event, callback) {

      if (!element) {
        throw new Error('Element not provided');
      }

      if (!callback && !event) {

        eventList[element] = {};

      } else if (!callback) {

        eventList[element][event] = [];

      } else {

        var callbackIndex = eventList[element][event].indexOf(callback);

        if (callbackIndex !== -1) {
          eventList[element][event].splice(callbackIndex, 1);
        }

      }
    },
    delegate: function(monitoredElement, className, event, callback) {
      eventListener.on(monitoredElement, event, function(e) {

        var path = getEventPath(e);
        var target = getEventTarget(e);

        if (className === '') {
          return false;
        }

        for (var pathItem of path) {
          if (pathItem === monitoredElement) {
            break;
          }

          if (pathItem.classList.contains(className)) {
            return callback(e);
          }
        }
      });
    }
  };
})();
