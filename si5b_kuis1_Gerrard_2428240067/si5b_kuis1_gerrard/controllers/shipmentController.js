const shipmentModel = require('../models/shipmentModel');

const VALID_STATUSES = ['diproses', 'dikirim', 'diterima'];

function validateShipmentPayload(data) {
  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      message: 'Body harus berupa objek JSON',
    };
  }

  const requiredFields = ['nomorResi', 'pengirim', 'penerima', 'beratKg', 'statusPengiriman'];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return {
        valid: false,
        message: `Field ${field} wajib diisi`,
      };
    }
  }

  if (typeof data.nomorResi !== 'string' || data.nomorResi.trim() === '') {
    return {
      valid: false,
      message: 'nomorResi harus berupa string',
    };
  }

  if (typeof data.pengirim !== 'string' || data.pengirim.trim() === '') {
    return {
      valid: false,
      message: 'pengirim harus berupa string',
    };
  }

  if (typeof data.penerima !== 'string' || data.penerima.trim() === '') {
    return {
      valid: false,
      message: 'penerima harus berupa string',
    };
  }

  if (typeof data.beratKg !== 'number' || Number.isNaN(data.beratKg)) {
    return {
      valid: false,
      message: 'beratKg harus berupa number',
    };
  }

  if (!VALID_STATUSES.includes(data.statusPengiriman)) {
    return {
      valid: false,
      message: 'statusPengiriman harus salah satu dari diproses, dikirim, atau diterima',
    };
  }

  return {
    valid: true,
    data: {
      nomorResi: data.nomorResi.trim(),
      pengirim: data.pengirim.trim(),
      penerima: data.penerima.trim(),
      beratKg: data.beratKg,
      statusPengiriman: data.statusPengiriman,
    },
  };
}

function getAllShipments(req, res, next) {
  try {
    const { statusPengiriman } = req.query;

    if (statusPengiriman) {
      const validStatus = ['diproses', 'dikirim', 'diterima'];

      if (!validStatus.includes(statusPengiriman)) {
        return res.status(400).json({
          status: 'error',
          message: 'statusPengiriman tidak valid',
          data: null,
        });
      }

      const filteredShipments = shipmentModel.getShipmentsByStatus(statusPengiriman);
      return res.status(200).json({
        status: 'success',
        message: 'Data shipment berdasarkan status berhasil ditampilkan',
        data: filteredShipments,
      });
    }

    const shipments = shipmentModel.getAllShipments();
    return res.status(200).json({
      status: 'success',
      message: 'Semua data shipment berhasil ditampilkan',
      data: shipments,
    });
  } catch (error) {
    return next(error);
  }
}

function getShipmentById(req, res, next) {
  try {
    const { id } = req.params;
    const shipment = shipmentModel.getShipmentById(id);

    if (!shipment) {
      return res.status(404).json({
        status: 'error',
        message: 'Shipment tidak ditemukan',
        data: null,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Shipment berdasarkan ID berhasil ditampilkan',
      data: shipment,
    });
  } catch (error) {
    return next(error);
  }
}

function createShipment(req, res, next) {
  try {
    const validation = validateShipmentPayload(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.message,
        data: null,
      });
    }

    const newShipment = shipmentModel.createShipment(validation.data);

    return res.status(201).json({
      status: 'success',
      message: 'Shipment baru berhasil ditambahkan',
      data: newShipment,
    });
  } catch (error) {
    return next(error);
  }
}

function updateShipment(req, res, next) {
  try {
    const { id } = req.params;
    const validation = validateShipmentPayload(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.message,
        data: null,
      });
    }

    const updatedShipment = shipmentModel.updateShipment(id, validation.data);

    if (!updatedShipment) {
      return res.status(404).json({
        status: 'error',
        message: 'Shipment tidak ditemukan',
        data: null,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Shipment berhasil diubah',
      data: updatedShipment,
    });
  } catch (error) {
    return next(error);
  }
}

function deleteShipment(req, res, next) {
  try {
    const { id } = req.params;
    const isDeleted = shipmentModel.deleteShipment(id);

    if (!isDeleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Shipment tidak ditemukan',
        data: null,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment,
};
