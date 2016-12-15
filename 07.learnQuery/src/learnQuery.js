// Dom selector functions
var domSelector = function(selectors) {
  'use strict';
  try {
    var selectedElement = document.querySelectorAll(selectors);
    return Array.prototype.slice.call(selectedElement);
  } catch (e) {
    throw new Error('Invalid or non existing selector');
  }
};

// CSS manipulation functions
function setStyleObject(element, propertyObject) {
  'use strict';

  var prop;

  for (prop in propertyObject) {
    if (propertyObject.hasOwnProperty(prop)) {
      element.style[prop] = propertyObject[prop];
    }
  }
}

function getStylePropertyValue(element, cssPropertyValue) {
  'use strict';

  return window.getComputedStyle(element).getPropertyValue(cssPropertyValue);
}

function getAllElementStyles(element) {
  'use strict';

  return element.style.cssText;
}

// CSS Class Manipulation functions
function checkRequiredProperties(className) {
  'use strict';
  if (typeof className === 'undefined') {
    throw new Error('Class Name not provided');
  }
}

//Event Listeners
var setEventListenersList = function(element, eventList, event, callback) {
  'use strict';
  if (!eventList[element]) {
    eventList[element] = [];
  }
  if (!eventList[element][event]) {
    eventList[element][event] = [];
  }
  eventList[element][event].push(callback);
};

var getEventTarget = function(e) {
  'use strict';
  return e.target || e.srcElement;
};

var getEventPath = function(e) {
  'use strict';
  return e.path;
};


function learnQuery(elementsSelector) {
  'use strict';

  if (!elementsSelector) {
    throw new Error('Selector not provided!');
  }

  var eventList = [];

  var htmlElement = domSelector(elementsSelector);

  return {

    // CSS manipulation functions
    cssProp: function(htmlElement, cssProperty, value) {
      'use strict';

      if (!htmlElement) {
        throw new Error('HTML Element not provided');
      }

      // check if object or property was passed as argument
      if (typeof cssProperty === 'object') {

        setStyleObject(htmlElement, cssProperty);
        return this;

      } else {

        var cssPropertyObject = {};
        cssPropertyObject[cssProperty] = value;

        if (value) {

          setStyleObject(htmlElement, cssPropertyObject);
          return this;

        } else if (cssProperty) {

          return getStylePropertyValue(htmlElement, cssProperty);

        } else {

          return getAllElementStyles(htmlElement);

        }

      }
    },

    // CSS Class Manipulation functions
    addClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.forEach(function(el) {
        el.classList.add(className);
      });
      return this;
    },
    removeClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.forEach(function(el) {
        el.classList.remove(className);
      });
      return this;
    },
    toggleClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.forEach(function(el) {
        el.classList.toggle(className);
      });
      return this;
    },
    hasClass: function(className) {
      checkRequiredProperties(className);
      return htmlElement.classList.contains(className);
    },

    //DOM Manipulation
    remove: function(element) {

      htmlElement.forEach(function(el) {

        if (document.contains(el) === false) {
          return null;
        }

        if (typeof element === 'undefined') {

          // If element is not provider remove by selector
          el.parentNode.removeChild(el);

        } else {

          // If object is provided

          var i;

          // If string is provided convert to object
          if(typeof element === 'string') {

            element = document.querySelectorAll(element);

          }

          for (i = 0; i < element.length; i++) {

            el.removeChild(element[i]);
          }
        }
      });

      return this;
    },
    append: function(element) {

      htmlElement.forEach(function(el) {
        if (document.contains(el) === false) {
          return null;
        }

        // If object is provided use tag name
        if(element.tagName){
          element = element.tagName;
        }

        el.appendChild(document.createElement(element));
      });

      return this;

    },
    prepend: function(element) {

      htmlElement.forEach(function(el) {
        if (document.contains(el) === false) {
          return null;
        }

        // If object is provided use tag name
        if(element.tagName){
          element = element.tagName;
        }

        el.insertBefore(document.createElement(element), el.firstChild);
      });

      return this;

    },
    after: function(element) {

      htmlElement.forEach(function(el) {
        if (document.contains(el) === false) {
          return null;
        }

        // If object is provided use tag name
        if(element.tagName){
          element = element.tagName;
        }

        el.parentNode.insertBefore(document.createElement(element), el.nextSibling);
      });

      return this;

    },
    before: function(element) {

      htmlElement.forEach(function(el) {

        if (document.contains(el) === false) {
          return null;
        }

        // If object is provided use tag name
        if(element.tagName){
          element = element.tagName;
        }

        el.parentNode.insertBefore(document.createElement(element), el);
      });

      return this;

    },
    val: function() {

      var returnValue = '';
      if (typeof htmlElement.value !== 'undefined') {
        returnValue = htmlElement.value;
      }
      return returnValue;
    },

    //Ajax Request
    ajaxReq: function(url, options) {
      'use strict';

      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return false;
      }

      function doAjaxReq() {

        var ajaxRequest = httpRequest;
        var ajaxStatus = httpRequest.status;
        var context = options.context;

        if (httpRequest.readyState === 4) {
          var data = JSON.parse(ajaxRequest.responseText);
          if (ajaxStatus === 200) {
            if (typeof options.success !== 'undefined') {
              options.success.call(context, data, ajaxStatus, ajaxRequest);
            }
          } else if (typeof options.failure !== 'undefined') {
            options.failure.call(context, data, ajaxStatus, ajaxRequest);
          }
          if (typeof options.complete !== 'undefined') {
            options.complete.call(context, data, ajaxRequest);
          }
        }
      }

      var method = options.method;
      if (options.method !== 'POST') {
        method = 'GET';
      }

      httpRequest.onreadystatechange = doAjaxReq;
      httpRequest.open(method, url);
      httpRequest.send(options.data);

      return httpRequest;
    },

    //Event Listeners
    on: function(event, callback) {

      htmlElement.forEach(function(el) {
        if (!el) {
          throw new Error('Element not provided');
        }

        if (!eventList ||
          !eventList[el] ||
          !eventList[el][event]) {

          el.addEventListener(event, function(e) {
            if (typeof eventList[el][event] !== 'undefined') {
              eventList[el][event].forEach(function(call) {
                call(e);
              });
            }
          });

        }

        setEventListenersList(el, eventList, event, callback);
      });
      return this;
    },
    trigger: function(event) {

      htmlElement.forEach(function(el) {
        var eventObject = new Event(event);
        el.dispatchEvent(eventObject);
      });
      return this;

    },
    off: function(event, callback) {

      htmlElement.forEach(function(el) {
        if (!el) {
          throw new Error('Element not provided');
        }

        if (!callback && !event) {

          eventList[el] = {};

        } else if (!callback) {

          eventList[el][event] = [];

        } else {

          var callbackIndex = eventList[el][event].indexOf(
            callback);

          if (callbackIndex !== -1) {
            eventList[el][event].splice(callbackIndex, 1);
          }

        }
      });

      return this;
    },
    delegate: function(className, event, callback) {
      htmlElement.forEach(function(el) {
        learnQuery(elementsSelector).on(event, function(e) {

          var path = getEventPath(e);
          var target = getEventTarget(e);

          if (className === '') {
            return false;
          }

          for (var pathItem of path) {
            if (pathItem === el) {
              break;
            }

            if (pathItem.classList.contains(className)) {
              return callback(e);
            }
          }
        });
      });
      return this;
    }

  };

}
