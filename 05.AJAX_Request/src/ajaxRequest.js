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
      if (ajaxStatus === 200) {
        var data = JSON.parse(ajaxRequest.responseText);
        options.success.call(context, data, ajaxStatus, ajaxRequest);
      } else {
        options.failure.call(context, 'failure', ajaxRequest);
      }
      options.complete.call(context, 'done', ajaxRequest);
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
