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
  if (typeof options.method === 'undefined') {
    method = 'GET';
  }

  var dataValues = options.data;
  if (typeof options.data === 'undefined') {
    dataValues = '';
  }

  httpRequest.onreadystatechange = doAjaxReq;
  httpRequest.open(method, url);
  httpRequest.send(dataValues);

  return httpRequest;
}
