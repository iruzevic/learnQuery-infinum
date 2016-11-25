function ajaxReq(url, options) {
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
}
