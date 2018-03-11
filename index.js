//'use strict';

const webContentsEvents = {
  'before-input-event': 'event_beforeInputEvent',
  'certificate-error': 'event_certificateError',
//  'console-message': 'event_consoleMessage',
  'context-menu': 'event_contextMenu',
  'crashed': 'event_crashed',
  'cursor-changed': 'event_cursorChanged',
  'destroyed': 'event_destroyed',
  'devtools-closed': 'event_devtoolsClosed',
  'devtools-focused': 'event_devtoolsFocused',
  'devtools-opened': 'event_devtoolsOpened',
  'devtools-reload-page': 'event_devtoolsReloadPage',
  'did-attach-webview': 'event_didAttachWebview',
  'did-change-theme-color': 'event_didChangeThemeColor',
  'did-fail-load': 'event_didFailLoad',
  'did-finish-load': 'event_didFinishLoad',
  'did-frame-finish-load': 'event_didFrameFinishLoad',
  'did-get-redirect-request': 'event_didGetRedirectRequest',
  'did-get-response-details': 'event_didGetResponseDetails',
  'did-navigate': 'event_didNavigate',
  'did-navigate-in-page': 'event_didNavigateInPage',
  'did-start-loading': 'event_didStartLoading',
  'did-stop-loading': 'event_didStopLoading',
  'dom-ready': 'event_domReady',
  'found-in-page': 'event_foundInPage',
  'login': 'event_login',
  'media-paused': 'event_mediaPaused',
  'media-started-playing': 'event_mediaStartedPlaying',
  'new-window': 'event_newWindow',
  'page-favicon-updated': 'event_pageFaviconUpdated',
  'paint': 'event_paint',
  'plugin-crashed': 'event_pluginCrashed',
  'select-bluetooth-device': 'event_selectBluetoothDevice',
  'select-client-certificate': 'event_selectClientCertificate',
  'update-target-url': 'event_updateTargetUrl',
  'will-attach-webview': 'event_willAttachWebview',
  'will-navigate': 'event_willNavigate',
  'will-prevent-unload': 'event_willPreventUnload',  
};
  
module.exports = Franz => class Mastodon extends Franz {

  constructor(...args) {
    let _temp;
    return _temp = super(...args), this.events = 
    //{ 'did-get-redirect-request': '_redirectFix', }
    {}//webContentsEvents
    , console.log('@@this', this)
    , _temp;
  }

event_beforeInputEvent (event) { console.warn('Event: before-input-event', event); }
event_certificateError (event) { console.warn('Event: certificate-error', event); }
event_consoleMessage (event) { console.warn('Event: console-message', event); }
event_contextMenu (event) { console.warn('Event: context-menu', event); }
event_crashed (event) { console.warn('Event: crashed', event); }
event_cursorChanged (event) { console.warn('Event: cursor-changed', event); }
event_destroyed (event) { console.warn('Event: destroyed', event); }
event_devtoolsClosed (event) { console.warn('Event: devtools-closed', event); }
event_devtoolsFocused (event) { console.warn('Event: devtools-focused', event); }
event_devtoolsOpened (event) { console.warn('Event: devtools-opened', event); }
event_devtoolsReloadPage (event) { console.warn('Event: devtools-reload-page', event); }
event_didAttachWebview (event) { console.warn('Event: did-attach-webview', event); }
event_didChangeThemeColor (event) { console.warn('Event: did-change-theme-color', event); }
event_didFailLoad (event) { console.warn('Event: did-fail-load', event); }
event_didFinishLoad (event) { console.warn('Event: did-finish-load', event); }
event_didFrameFinishLoad (event) { console.warn('Event: did-frame-finish-load', event); }
event_didGetRedirectRequest (event) { console.warn('Event: did-get-redirect-request', event); }
event_didGetResponseDetails (event) { console.warn('Event: did-get-response-details', event); }
event_didNavigate (event) { console.warn('Event: did-navigate', event); }
event_didNavigateInPage (event) { console.warn('Event: did-navigate-in-page', event); }
event_didStartLoading (event) { console.warn('Event: did-start-loading', event); }
event_didStopLoading (event) { console.warn('Event: did-stop-loading', event); }
event_domReady (event) { console.warn('Event: dom-ready', event); }
event_foundInPage (event) { console.warn('Event: found-in-page', event); }
event_login (event) { console.warn('Event: login', event); }
event_mediaPaused (event) { console.warn('Event: media-paused', event); }
event_mediaStartedPlaying (event) { console.warn('Event: media-started-playing', event); }
event_newWindow (event) { console.warn('Event: new-window', event); }
event_pageFaviconUpdated (event) { console.warn('Event: page-favicon-updated', event); }
event_paint (event) { console.warn('Event: paint', event); }
event_pluginCrashed (event) { console.warn('Event: plugin-crashed', event); }
event_selectBluetoothDevice (event) { console.warn('Event: select-bluetooth-device', event); }
event_selectClientCertificate (event) { console.warn('Event: select-client-certificate', event); }
event_updateTargetUrl (event) { console.warn('Event: update-target-url', event); }
event_willAttachWebview (event) { console.warn('Event: will-attach-webview', event); }
event_willNavigate (event) { console.warn('Event: will-navigate', event); }
event_willPreventUnload (event) { console.warn('Event: will-prevent-unload', event); }

  //_redirectFix(event) {
  //  //console.log('@@_redirectFix',event,this);
  //  //this.send('ping', event.newURL);
  //  if (event.newURL !== undefined && event.oldURL !== undefined && event.isMainFrame) {
  //    if (event.isMainFrame) {
  //      //const webview = document.querySelector('webview')
  //      const webview = this;
  //      console.log('@@_redirectFix',event);
  //      setTimeout(() => this.send('redirect-url', event.newURL), 100);
  //      event.preventDefault();
  //    }
  //  }
  //}

  async validateUrl(url) {
    try {
      const res = await window.fetch(`${url}/api/v1/instance/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // check url field in API response
      return Object.hasOwnProperty.call(data, 'uri');
    } catch (err) {
      console.error(err);
    }
    return false;
  }

};
