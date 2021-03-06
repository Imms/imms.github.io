/* */ 
(function(process) {
  'use strict';
  var ReactNativeDOMIDOperations = require('./ReactNativeDOMIDOperations');
  var ReactNativeReconcileTransaction = require('./ReactNativeReconcileTransaction');
  var ReactNativeComponentEnvironment = {
    processChildrenUpdates: ReactNativeDOMIDOperations.dangerouslyProcessChildrenUpdates,
    replaceNodeWithMarkup: ReactNativeDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
    unmountIDFromEnvironment: function() {},
    clearNode: function() {},
    ReactReconcileTransaction: ReactNativeReconcileTransaction
  };
  module.exports = ReactNativeComponentEnvironment;
})(require('process'));
