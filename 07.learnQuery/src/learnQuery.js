var learnQuery = (function() {
  'use strict';

  var eventList = [];

  // Dom selector functions
  var domSelector = function(selectors) {
    'use strict';
    try {
      var selectedElements = document.querySelectorAll(selectors);
      return Array.prototype.slice.call(selectedElements);
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

  // DOM Manipulation
  function createElement(element){
    var elementType = typeof element;

    switch (elementType) {
      case 'string':
        return document.createTextNode(element);

        break;
      case 'object':

        // If object is provided use tag name
        if(element.tagName){
          element = element.tagName;
        }

        return document.createElement(element);
        break;
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

  var getEventPath = function(e) {
    'use strict';
    return e.path;
  };

  return function learnQuery(elementsSelector) {
    'use strict';

    if (!elementsSelector) {
      throw new Error('Selector not provided!');
    }

    var htmlElements = domSelector(elementsSelector);

    return {

      // CSS manipulation functions
      cssProp: function(cssProperty, value) {
        'use strict';

        // check if object or property was passed as argument
        if (typeof cssProperty === 'object') {

          htmlElements.forEach(function(el) {
            setStyleObject(el, cssProperty);
          });
          return this;

        } else {

          var cssPropertyObject = {};
          cssPropertyObject[cssProperty] = value;

          if (value) {

            htmlElements.forEach(function(el) {
              setStyleObject(el, cssPropertyObject);
            });
            return this;

          } else if (cssProperty) {
            return getStylePropertyValue(htmlElements, cssProperty);
          } else {
            return getAllElementStyles(htmlElements);
          }
        }
      },

      // CSS Class Manipulation functions
      addClass: function(className) {

        checkRequiredProperties(className);
        htmlElements.forEach(function(el) {
          el.classList.add(className);
        });
        return this;

      },
      removeClass: function(className) {

        checkRequiredProperties(className);
        htmlElements.forEach(function(el) {
          el.classList.remove(className);
        });
        return this;

      },
      toggleClass: function(className) {

        checkRequiredProperties(className);
        htmlElements.forEach(function(el) {
          el.classList.toggle(className);
        });
        return this;

      },
      hasClass: function(className) {

        checkRequiredProperties(className);

        function checkIfElementContainsClass(element) {
          return element.classList.contains(className);
        }
        return htmlElements.some(checkIfElementContainsClass);

      },

      //DOM Manipulation
      remove: function(element) {

        htmlElements.forEach(function(el) {

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

        htmlElements.forEach(function(el) {
          var htmlElement = createElement(element);
          el.appendChild(htmlElement);
        });

        return this;

      },
      prepend: function(element) {

        htmlElements.forEach(function(el) {
          var htmlElement = createElement(element);
          el.insertBefore(htmlElement, el.firstChild);
        });

        return this;

      },
      after: function(element) {

        htmlElements.forEach(function(el) {
          var htmlElement = createElement(element);
          el.parentNode.insertBefore(htmlElement, el.nextSibling);
        });

        return this;

      },
      before: function(element) {

        htmlElements.forEach(function(el) {
          var htmlElement = createElement(element);
          el.parentNode.insertBefore(htmlElement, el);
        });

        return this;

      },
      val: function() {

        var i = 0;
        for (i; i < htmlElements.length; i++) {
          if (typeof htmlElements[i].value !== 'undefined') {
            return htmlElements[i].value;
          }
        }

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

        htmlElements.forEach(function(el) {
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

        htmlElements.forEach(function(el) {
          var eventObject = new Event(event);
          el.dispatchEvent(eventObject);
        });
        return this;

      },
      off: function(event, callback) {

        htmlElements.forEach(function(el) {
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
        htmlElements.forEach(function(el) {
          learnQuery(elementsSelector).on(event, function(e) {

            var path = getEventPath(e);

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
})();

