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

  var addEventListeners = function(element, event, callback) {

    if (!eventList || !eventList[element] || !eventList[element][event]) {

      element.addEventListener(event, function(e) {
        if (typeof eventList[element][event] !== 'undefined') {
          eventList[element][event].forEach(function(call) {
            call(e);
          });
        }
      });

    }

  };

  var removeEventListener = function(element, event, callback) {

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
  };

  var getEventTarget = function(e) {
    return e.target || e.srcElement;
  };

  return {
    on: function(element, event, callback) {

      addEventListeners(element, event, callback);
      setEventListenersList(element, event, callback);

    },
    trigger: function(element, event) {

      var eventObject = new Event(event);
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
          return callback(e);
        }
      }, false);
    }
  };
})();
