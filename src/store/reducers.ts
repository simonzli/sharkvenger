/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import {
  detectorReducer,
  directorReducer,
  conversationReducer,
} from 'store/slices';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  return combineReducers({
    detector: detectorReducer,
    director: directorReducer,
    conversation: conversationReducer,
  });
}
