'use strict';
var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/constants');
var ActionTypes = AppConstants.ActionTypes;

var ServerActions = {
  receiveEvents: function (data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EVENTS,
      data: data
    });
  },

  receiveFeedings: function (data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FEEDINGS,
      data: data
    });
  },

  receiveBabies: function (data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BABIES,
      data: data
    });
  },

  receiveFeeders: function (data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FEEDERS,
      data: data
    });
  },

  successfulEventPost: function (data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SUCCESSFUL_EVENT_POST,
      data: data
    });
  }
};

module.exports = ServerActions;
