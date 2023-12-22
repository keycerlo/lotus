
// function
if (!window.jsBridge) {
  window.jsBridge = {}
}
var hostName = location.host

function getSearch({key = null} = {}) {
  var search = location.search
  if (search) {
    search = search.slice(1)
    search = search.split('&')
    var data = {}
    for( var i = 0; i < search.length; i++) {
      var item = search[i].split('=')
      data[item[0]] = item[1]
    }
    search = data
  } else {
    search = {}
  }
  if (key) {
    return search[key]
  } else {
    return search
  }

}

function getUnexpiredStorage({key = '', timer = 604800000} = {}) {
  let data = localStorage.getItem(key) || ''
  if (data) {
    data = data.split(',')
    if (+new Date() - data[0] * 1  < timer) {
      data = data[1]
    } else {
      data = ''
    }
  }
  return data
}

// s2s
var storageEnableS2s = getUnexpiredStorage({key: 'enableS2s', timer: 315360000000})
if (getSearch({key: 'enableS2s'}) == 1) {
  window.enableS2s = {
    appToken: getSearch({key: 'appToken'}),
    appId: getSearch({key: 'appId'}),
    afUid: getSearch({key: 'afUid'}),
    adjUid: getSearch({key: 'adjUid'}),
    gaid: getSearch({key: 'gaid'}),
    deviceOs: getSearch({key: 'deviceOs'}),
    packageName: getSearch({key: 'packageNam'}) || getSearch({key: 'packageName'})
  }
  localStorage.setItem('enableS2s', +new Date() + ',' + encodeURIComponent(JSON.stringify(window.enableS2s)))
} else if (storageEnableS2s) {
  window.enableS2s = JSON.parse(decodeURIComponent(storageEnableS2s))
} else {
  // tiktok
  var searchTiktokKey =  getSearch({key: 'ttPixel'})
  if (searchTiktokKey) {
    localStorage.setItem('ttPixel', +new Date() + ',' + searchTiktokKey)
    window.tiktokKey = [searchTiktokKey]
  } else if (getUnexpiredStorage({key: 'ttPixel'})) {
    window.tiktokKey = [getUnexpiredStorage({key: 'ttPixel'})]
  }

  // gtag
  var searchGtagId = getSearch({key: 'gtagId'})
  var searchGtagConvId = getSearch({key: 'gtagConvId'})
  var searchGtagConvType = getSearch({key: 'gtagConvType'})
  if (searchGtagId && searchGtagConvId) {
    window.gtagData = {
      gtagId: searchGtagId,
      gtagConvId: decodeURIComponent(searchGtagConvId),
      gtagConvType: searchGtagConvType || '1'
    } 
    localStorage.setItem('gtagPixel', +new Date() + ',' + encodeURIComponent(JSON.stringify(window.gtagData)))
  } else if (getUnexpiredStorage({key: 'gtagPixel'})) {
    window.gtagData = JSON.parse(decodeURIComponent(getUnexpiredStorage({key: 'gtagPixel'})))
  } else {
    window.gtagData = {
      gtagId: "UA-223714522-3",
      gtagConvId: "11021122176/jyUDCKKyvIMYEID1o4cp",
      gtagConvType: '1'
    } 
  }

  // fb
  var searchFbqKey = getSearch({key: 'fbPixel'})
  if (searchFbqKey) {
    localStorage.setItem('fbPixel', +new Date() + ',' + searchFbqKey)
    window.fbqKey = [searchFbqKey]
  } else if (getUnexpiredStorage({key: 'fbPixel'})) {
    window.fbqKey = [getUnexpiredStorage({key: 'fbPixel'})]
  }

  // kwai
  var searchKwaiqKey = getSearch({key: 'kwaiPixel'})
  if (searchKwaiqKey) {
    localStorage.setItem('kwaiPixel', +new Date() + ',' + searchKwaiqKey)
    window.kwaiqKey = searchKwaiqKey
  } else if (getUnexpiredStorage({key: 'kwaiPixel'})) {
    window.kwaiqKey = [getUnexpiredStorage({key: 'kwaiPixel'})]
  }

  // bigo
  var searchBigoKey = getSearch({key: 'bigoPixel'})
  if (searchBigoKey) {
    localStorage.setItem('bigoPixel', +new Date() + ',' + searchBigoKey)
    window.bigoKey = searchBigoKey
  } else if (getUnexpiredStorage({key: 'bigoPixel'})) {
    window.bigoKey = getUnexpiredStorage({key: 'bigoPixel'})
  }
}





// Google Tag Manager
  if (window.ggConfig) {
    window.ggKey = ''
    for (var ggKeyI in window.ggConfig) {
      if (hostName.indexOf(ggKeyI) != -1) {
        window.ggKey = window.ggConfig[ggKeyI]
      }
    }
    if (window.ggKey) {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', window.ggKey);
    }
  }
  
// End Google Tag Manager

// Google tag (gtag.js) - Google Analytics
  if (window.gtagData) {
    !function (b, e, v, n, t, s) {
      t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(document, 'script', 'https://www.googletagmanager.com/gtag/js?id='+ window.gtagData.gtagId);

    window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', window.gtagData.gtagId); 
  }
// End Google tag (gtag.js) - Google Analytics

// Meta Pixel Code
  if (!window.fbqKey) {
    window.fbqKey = []
    for (var fbqKeyI in window.fbqConfig) {
      if (hostName.indexOf(window.fbqConfig[fbqKeyI]) != -1) {
        window.fbqKey.push(fbqKeyI)
      }
    }
  }
  if (window.fbqKey.length) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    for (var fbqKeyJ = 0; fbqKeyJ < window.fbqKey.length; fbqKeyJ++) {
      fbq('init', window.fbqKey[fbqKeyJ]);
      fbq('track', 'PageView');
    }
  }

// End Meta Pixel Code


// tiktok 
  if (!window.tiktokKey) {
    window.tiktokKey = []
    for (var tiktokI in window.tiktokConfig) {
      if (hostName.indexOf(window.tiktokConfig[tiktokI]) != -1) {
        window.tiktokKey.push(tiktokI)
      }
    }
  }
  if (window.tiktokKey.length) {
    for (var tiktokKeyJ = 0; tiktokKeyJ < window.tiktokKey.length; tiktokKeyJ++) {
      !function (w, d, t) {
        w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e }, ttq.load = function (e, n) { var i = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; n = document.createElement("script"); n.type = "text/javascript", n.async = !0, n.src = i + "?sdkid=" + e + "&lib=" + t; e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(n, e) };
        ttq.load(window.tiktokKey[tiktokKeyJ]);
        ttq.page();
      }(window, document, 'ttq');
    }
  }
// End tiktok

// kwaiq
  if (!window.kwaiqKey) {
    for (var kwaiqI in window.kwaiqConfig) {
      if (hostName.indexOf(window.kwaiqConfig[kwaiqI]) != -1) {
        window.kwaiqKey = kwaiqI
        break
      }
    }
  }
  if (window.kwaiqKey) {
    !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define && define.amd ? define([],t):"object"==typeof exports?exports.install=t():e.install=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};!function(e){var t=window;t.KwaiAnalyticsObject=e,t[e]=t[e]||[];var n=t[e];n.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];var o=function(e,t){e[t]=function(){var n=Array.from(arguments),o=r([t],n,!0);e.push(o)}};n.methods.forEach((function(e){o(n,e)})),n.instance=function(e){var t=n._i[e]||[];return n.methods.forEach((function(e){o(t,e)})),t},n.load=function(t,r){n._i=n._i||{},n._i[t]=[],n._i[t]._u="https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js",n._t=n._t||{},n._t[t]=+new Date,n._o=n._o||{},n._o[t]=r||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js?sdkid="+t+"&lib="+e;var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(o,i)}}("kwaiq")}])}));
    kwaiq.load(window.kwaiqKey);
    kwaiq.page();
  }
// End kwaiq

// bigo
  if (window.bigoKey) {
    window.bgdataLayer = window.bgdataLayer || [];
    function bge(){bgdataLayer.push(arguments);}
    bge('init', window.bigoKey);

    !function (b, e, v, n, t, s) {
      t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(document, 'script', 'https://api.imotech.video/ad/events.js?pixel_id='+ window.bigoKey)
  }
// bigo end