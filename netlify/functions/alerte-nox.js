const fetch = require('node-fetch'); // Si besoin, Netlify gère ça comme un grand

exports.handler = async (event) => {
  // SÉCURITÉ : On récupère le lien Discord caché dans Netlify
  const urlWebhook = process.env.DISCORD_WEBHOOK_URL; 
  
  if (!urlWebhook) {
    return { statusCode: 500, body: "Erreur : Clé secrète manquante !" };
  }

  const { message } = JSON.parse(event.body);

  // C'est le serveur de Netlify qui parle à Discord, pas le navigateur du joueur !
  await fetch(urlWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username: "Nox - Base de Données",
          avatar_url: "https://r2.erweima.ai/ai_background/production/aa1f52b0-681b-4171-be56-02e071ff1100.png",
          content: `⚠️ **Mot inconnu détecté !** Un joueur a écrit : \`${message}\`. Pense à l'ajouter dans connaissancesNox, Créateur ! 💻`
      })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Message envoyé avec succès !" })
  };
};
