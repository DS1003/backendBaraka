// Middleware de gestion des erreurs globales
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    details: err.details || null
  });
}

export default  errorHandler ;
