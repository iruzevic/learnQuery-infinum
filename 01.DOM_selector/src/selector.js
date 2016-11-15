var domSelector = function(selectors) {
  'use strict';

  function getHtmlSelector(selectors) {

    try {
      var selectedElement = document.querySelectorAll(selectors);
      var selectedElementArray = Array.prototype.slice.call(selectedElement);
      return selectedElementArray;
    } catch (e) {
      throw new Error('Invalid or non existing selector');
    }
  }

  return getHtmlSelector(selectors)
};
