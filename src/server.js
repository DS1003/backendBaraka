// Démarrage du serveur Express (ESM)
import app from './app.js';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`--- 🚀 Serveur backend SaaS lancé sur le port ${PORT}`);
});
