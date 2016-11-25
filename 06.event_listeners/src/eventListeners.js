var eventListener = (function() {
  'use strict';

  var eventList = {};

  var getAllEventListeners = function(element, event) {
    var eventsAray = [];
    if (event) {
      eventsAray = eventList[element][event];
    } else {
      eventsAray = eventList[element];
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

  var getEventTarget = function(e) {
    var ev = e || window.event;
    return ev.target || ev.srcElement;
  };

  var removeAllEventListeners = function(element, eventsArray) {
    for (var key in eventsArray) {
      if ({}.hasOwnProperty.call(eventsArray, key)) {
        for (var j = 0; j < eventsArray[key].length; j++) {
          element.removeEventListener(key, eventsArray[key][j]);
        }
      }
    }
  };

  var removeEventListenerOfType = function(element, eventsArray, event) {
    for (var i = 0; i < eventsArray.length; i++) {
      element.removeEventListener(event, eventsArray[i]);
    }
  }

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

      var eventsArray = getAllEventListeners(element, event);

      if (!callback && !event) {

        removeAllEventListeners(element, eventsArray);

      } else if (!callback) {

        removeEventListenerOfType(element, eventsArray, event);

      } else {

        element.removeEventListener(event, callback, false);

      }
    },
    delegate: function(monitoredElement, className, event, callback) {

      monitoredElement.addEventListener(event, function(e) {
        var target = getEventTarget(e);

        if (className === '') {
          return false;
        }

        if (target.className === className || target.parentNode.className ===
          className) {
          return callback.call();
        }
      }, false);
    }
  };
})();
