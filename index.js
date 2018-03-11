//'use strict';
  
module.exports = Franz => class Mastodon extends Franz {

  constructor(...args) {
    let _temp;
    return _temp = super(...args), this.events = 
    {}
    , _temp;
  }

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
