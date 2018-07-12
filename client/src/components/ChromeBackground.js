import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';

const aliases = {
  'user-clicked-alias': () => {
    var editorExtensionId = 'noikhccpojdclobaamiinlaiiojpfhdc';
    chrome.runtime.sendMessage(editorExtensionId, {
      greeting: 'barnacles (shudder)'
    });
  }
};

const store = createStore(rootReducer, applyMiddleware(alias(aliases)));

export default ChromeBackground;
