/*global ajaxReq*/

describe('AjaxRequest', function() {
  'use strict';

  beforeEach(function() {
    jasmine.Ajax.install();

    this.onSuccessSpy = jasmine.createSpy('successs');
    this.onFailureSpy = jasmine.createSpy('failure');
    this.onCompleteSpy = jasmine.createSpy('complete');

    jasmine.Ajax.stubRequest('/infinum/index').andReturn({
      status: 200,
      responseText: '{ "response": "incredible cool things" }'
    });
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should make a successful ajax request', function() {
    ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should make POST ajax request', function() {
    var test= ajaxReq('/infinum/index', {
      method: 'POST',
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should call a custom function with proper context on failure', function() {
    // code goes here
  });

  it('should call a custom function with proper context on success', function() {
    // code goes here
  });

  it('should call a custom function with proper context when request is completed', function() {
    // code goes here
  });
});
