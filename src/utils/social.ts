declare const FB: any;

const env = require('Root/env.json');

export const facebookInit = () => {
  // tslint:disable no-string-literal
  window['fbAsyncInit'] = function () {
    FB.init({
      appId: env.fbAppId,
      version: 'v2.11',
    });
  };

  // Load the SDK Asynchronously
  (function (d) {
    let js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';
    ref.parentNode.insertBefore(js, ref);
  }(document));
};

export const facebookShare = (title: string, description: string, url: string, pictureUrl?: string) => {
  const defaultPictureUrl = window.location.protocol + '//' + window.location.host +
    '/public/assets/images/landing/xchangerate.png';
    // '/public/assets/images/fb-site.png';

  FB.ui(
    {
      method: 'share_open_graph',
      action_type: 'og.shares',
      display: 'popup',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': title,
          'og:description': description,
          'og:image': pictureUrl || defaultPictureUrl
        }
      })
    },
    function (response: any) {
    });
};
