const shipments = [
  {
    id: 1,
    nomorResi: 'EXP-GERRARD-001',
    pengirim: 'Gerrard',
    penerima: 'Andi',
    beratKg: 2.5,
    statusPengiriman: 'diproses',
  },
  {
    id: 2,
    nomorResi: 'EXP-GERRARD-002',
    pengirim: 'Dina',
    penerima: 'Budi',
    beratKg: 4,
    statusPengiriman: 'dikirim',
  },
  {
    id: 3,
    nomorResi: 'EXP-GERRARD-003',
    pengirim: 'Sari',
    penerima: 'Gerrard',
    beratKg: 1.2,
    statusPengiriman: 'diterima',
  },
];

function getAllShipments() {
  return shipments;
}

function getShipmentById(id) {
  const shipmentId = Number(id);
  return shipments.find((shipment) => shipment.id === shipmentId) || null;
}

function getShipmentsByStatus(status) {
  return shipments.filter((shipment) => shipment.statusPengiriman === status);
}

function createShipment(data) {
  const nextId = shipments.length > 0 ? Math.max(...shipments.map((shipment) => shipment.id)) + 1 : 1;

  const newShipment = {
    id: nextId,
    ...data,
  };

  shipments.push(newShipment);
  return newShipment;
}

function updateShipment(id, data) {
  const shipmentId = Number(id);
  const index = shipments.findIndex((shipment) => shipment.id === shipmentId);

  if (index === -1) {
    return null;
  }

  shipments[index] = {
    ...shipments[index],
    ...data,
  };

  return shipments[index];
}

function deleteShipment(id) {
  const shipmentId = Number(id);
  const index = shipments.findIndex((shipment) => shipment.id === shipmentId);

  if (index === -1) {
    return false;
  }

  shipments.splice(index, 1);
  return true;
}

module.exports = {
  getAllShipments,
  getShipmentById,
  getShipmentsByStatus,
  createShipment,
  updateShipment,
  deleteShipment,
};
