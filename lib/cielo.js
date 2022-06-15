const fetch = require('node-fetch');

class Cielo {
  static purchase(params) {

    return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 
        'Content-Type': 'application/json',
        'MerchantId': '44abba7d-bf92-4838-8bb5-62ba4fb24329',
        'MerchantKey': 'BVTYMTDNKJCRANNMTIVYJCEFOLOCCYWZTYFWMUFT',
      },
    })
    .then(res => res.json());
  }

  static capture(paymentId) {

    return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/' + paymentId + '/capture', {
      method: 'put',
      headers: { 
        'Content-Type': 'application/json',
        'MerchantId': '44abba7d-bf92-4838-8bb5-62ba4fb24329',
        'MerchantKey': 'BVTYMTDNKJCRANNMTIVYJCEFOLOCCYWZTYFWMUFT',
      },
    })
    // .then(res => console.log(res))
    .then(res => res.json());
  }

  static consult(paymentId) {

    return fetch('https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/' + paymentId, {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json',
        'MerchantId': '44abba7d-bf92-4838-8bb5-62ba4fb24329',
        'MerchantKey': 'BVTYMTDNKJCRANNMTIVYJCEFOLOCCYWZTYFWMUFT',
      },
    })
    .then(res => res.json());
  }
}

module.exports = Cielo;