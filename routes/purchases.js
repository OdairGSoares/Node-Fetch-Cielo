var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo');

/* POST purchase creation. */
router.post('/', function (req, res, next) {

  cielo.purchase(req.body).then((result) => {
    // res.send(result);

    const paymentId = result.Payment.PaymentId;

    cielo.capture(paymentId)
    .then((result) => {
      if (result.Status == 2) {
        res.status(201).send({
          'Status': 'Success',
          'Message': 'Purchase was successfully',
          "PurchaseId": paymentId,
        });
      } else {
        res.status(402).send({
          'Status': 'Failed',
          'Message': 'Purchase not made. Card billing problem',
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
  });
});

/* GET purchase status. */
router.get('/:purchase_id/status', function (req, res, next) {
  //res.send('purchase status');
  cielo.consult(req.params.purchase_id)
  .then((result) => {
    //console.log(result);

    let message = {};

    switch (result.Payment.Status) {
      case 0:
        message = {
          'Status': 'Not Finished',
        };
        break;
      case 1:
        message = {
          'Status': 'Authorized',
        };
        break;
      case 2:
        message = {
          'Status': 'Payment Confirmed',
        };
        break;
      case 3:
        message = {
          'Status': 'Denied',
        };
        break;
      case 10:
        message = {
          'Status': 'Voided',
        };
        break;
      case 11:
        message = {
          'Status': 'Refunded',
        };
        break;
      case 12:
        message = {
          'Status': 'Pending',
        };
        break;
      case 13:
        message = {
          'Status': 'Aborted',
        };
        break;
      case 20:
        message = {
          'Status': 'Scheduled',
        };
        break;
    }

    res.send(message);
  });
});

module.exports = router;