function notFoundHandler(req, res) {
  return res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
}

function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'JSON tidak valid',
      data: null,
    });
  }

  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  return res.status(statusCode).json({
    status: 'error',
    message,
    data: null,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
