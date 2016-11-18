var eventListener = (function() {
  'use strict';

  var eventList = {};

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
    if (!element['on' + event]) {
      init = function() {

        // any clear comments.
      };
    } else {
      init = element['on' + event];
    }

    element['on' + event] = function() {
      init();
      callback();
    };



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
      element.removeEventListener(event, callback, false);
    }
  };
})();
