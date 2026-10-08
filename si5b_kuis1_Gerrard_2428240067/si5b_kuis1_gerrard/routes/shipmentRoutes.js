const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const cekApiKey = require('../middlewares/cekApiKey');

const router = express.Router();

router.get('/', shipmentController.getAllShipments);
router.get('/:id', shipmentController.getShipmentById);

router.post('/', cekApiKey, shipmentController.createShipment);
router.put('/:id', cekApiKey, shipmentController.updateShipment);
router.delete('/:id', cekApiKey, shipmentController.deleteShipment);

module.exports = router;
