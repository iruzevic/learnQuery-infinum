var domSelector = function(selectors) {
  'use strict';


  function toArray(nl) {
      for(var a=[], l=nl.length; l--; a[l]=nl[l]);
      return a;
  }


  function getHtmlSelector(selectors){

    var selector = document.querySelectorAll(selectors);

    return toArray(selector);

  }

  return {
    htmlElement : getHtmlSelector(selectors)
  }
};
