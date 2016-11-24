function doAjaxReq(url, options) {
  'use strict';

  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    return false;
  }

  function alertContents() {

    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        return httpRequest.responseText;
      } else {
        throw new Error('There was a problem with the request.');
      }
    }
  }

  var method = options.method;

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open(method, url);
  httpRequest.send();

  return httpRequest;
}

function ajaxReq(url, options) {
  'use strict';

  var ajaxRequest = doAjaxReq(url, options);
  var ajaxStatus = ajaxRequest.status;
  var context = options.context;

  if (ajaxStatus === 200) {
    var data = JSON.parse(ajaxRequest.responseText);
    options.success.call(context, data, ajaxStatus, {});
  } else {
    options.failure.call(context, {}, ajaxStatus, 'failure');
  }
  options.complete.call(context, {}, ajaxStatus);
}
