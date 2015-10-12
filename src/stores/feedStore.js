/* global module:false */
'use strict';

import _ from 'lodash';

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import {
	EventEmitter
}
from 'events';

var CHANGE_EVENT = 'change';
var _feeds = [];

var FeedStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	getAllFeeds: function() {
		return _feeds;
	},
	getFeedByUrl: function(url) {
		return _.find(_feeds, function(feed) {
			return feed.link[0].href == url;
		});
	},
	isExisting: function(searchedFeed) {
		return _.find(_feeds, function(feed) {
			return feed.link[0].href == searchedFeed.link[0].href;
		});
	}
});

Dispatcher.register(function(action) {
	switch (action.actionType) {
		case ActionTypes.ADD_FEED:
			_feeds.push(action.feed);
			FeedStore.emitChange();
			break;
		case ActionTypes.INITIALIZE:
			_feeds = action.initialData.feeds;
			FeedStore.emitChange();
			break;
	}
});

module.exports = FeedStore;