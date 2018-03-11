// //'use strict';

const { ipcRenderer } = require('electron');

const BADGE_AUTO_CLEAR_DELAY = 10000; // delay time for badge clear auto

// MONKEY PATCH:
//   fix 'Uncaught TypeError: c.addEventListener is not a function'
//   from mastdon code
//   see https://github.com/tootsuite/mastodon/blob/c1a41181c52216de9ebeecebf418e6d50172139b/app/javascript/mastodon/actions/notifications.js#L60
if (!Notification.prototype.addEventListener) {
  Notification.prototype.addEventListener = function(){};
}

// redirect fix
//ipcRenderer.on('redirect-url', (event, url) => {
//  console.warn('@@redirect-url',event,url);
//  // check and redirect to signin page when not loggdin
//  if (/\/about$/.test(url)) {
//    url = url.replace('/about', '/auth/sign_in');
//  }
//  window.location.assign(url);
//});

//ipcRenderer.on('settings-update', (event, url) => {
//  console.warn('@@settings-update',event,url);
//});

module.exports = (Franz, data) => {

  // save service instance identify 
  const serviceId = data.id; 

  // check if this service is active
  let activeUpdated = false;
  let isActive      = true;

  ipcRenderer.on('settings-update', (sender, settings) => {
    const nextIsActive = serviceId == settings.activeService;
    !activeUpdated && (activeUpdated = isActive != nextIsActive);
    isActive = nextIsActive;
  });

//console.log(`:::@@ isActive=${data.isActive}, isMuted=${data.isMuted}, isNotificationEnabled=${data.isNotificationEnabled}, `);
//console.log(`:::@@ serviceId=${serviceId}`);
/*
  console.log('@@Franz',Franz,this,data);
  const getLatestStatement = () => (((document.querySelector('.status time')||{}).attributes||{})['datetime']||{}).nodeValue;
  const getLatestNotify = () => (document.querySelector('.notification__message span')||{}).innerText;
  
  Franz.latestNotify    = getLatestNotify();
  Franz.latestStatement = getLatestStatement();

  const columnScrollable = document.querySelectorAll('.column .scrollable') || [];
  //console.log('columnScrollable',columnScrollable);
  columnScrollable[1].addEventListener('scroll', (ev) => {
    Franz.latestNotify = getLatestNotify();
  });
  columnScrollable[0].addEventListener('scroll', (ev) => {
    Franz.latestStatement = getLatestStatement();
  });

  const getMessages_ = () => {
    const activeUpdated_ = activeUpdated; activeUpdated = false;
    
    //console.log(`:::== isActive=${data.isActive}, isMuted=${data.isMuted}, isNotificationEnabled=${data.isNotificationEnabled}, `);
    console.log(`:::== serviceId=${serviceId} updateActive=${activeUpdated_} isActive=${isActive}`);

    const ln = getLatestNotify();
    const ls = getLatestStatement();

    if (activeUpdated_ && isActive) {
      Franz.latestNotify = getLatestNotify();
      Franz.latestStatement = getLatestStatement();
    }

    let reply  = ln != Franz.latestNotify    ? 1 : 0;
    let unread = ls != Franz.latestStatement ? 1 : 0;


    //console.warn(`setBadge(${reply}, ${unread}) latestNotify="${Franz.latestNotify}" latestStatement="${Franz.latestStatement}" `);
    Franz.setBadge(reply, unread);
  }
*/

  let replyCount = 0;
  let limitBadgeClear;

  const getMessages = function getMessages() {
    const activeUpdated_ = activeUpdated; activeUpdated = false;

    // check and redirect to signin page when not loggdin  
    if (window.location && /\/about$/.test(window.location.pathname)) {
      const hasSigninLink = !!document.querySelector('[href$="/auth/sign_in"]');
      if (hasSigninLink) {
        window.location.pathname = '/auth/sign_in';
        return;
      }
    }

    // clear replay badge when ...
    if (replyCount) {
      // this service actived
      if (activeUpdated_ && isActive) {
        replyCount = 0;
      }
      // timeout
      if (!isActive && limitBadgeClear) {
        limitBadgeClear = false;
      }
      if (isActive && false !== limitBadgeClear && limitBadgeClear <= Date.now()) {
        replyCount = 0;
        limitBadgeClear = false;
      }
    }

    Franz.setBadge(replyCount);
  };

  Franz.loop(getMessages);

  Franz.onNotify(notification => {
    //console.warn('@@@onNotify',notification);
    ++replyCount;
    limitBadgeClear = Date.now() + BADGE_AUTO_CLEAR_DELAY;

    //if (typeof notification.title !== 'string') {
      //notification.title = ((notification.title.props || {}).content || [])[0] || 'Messenger';
    //}
    //alert(notification.title);
    //return false;
    return notification;
  
  });
};