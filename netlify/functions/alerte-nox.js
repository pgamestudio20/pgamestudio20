exports.handler = async (event) => {
  const urlWebhook = process.env.DISCORD_WEBHOOK_URL; 
  
  if (!urlWebhook) {
    return { statusCode: 500, body: "Erreur : Clé secrète manquante !" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Fetch moderne intégré de base, plus besoin du vieux 'node-fetch' !
    await fetch(urlWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "Nox - Base de Données",
            avatar_url: "https://r2.erweima.ai/ai_background/production/aa1f52b0-681b-4171-be56-02e071ff1100.png",
            content: `⚠️ **Mot inconnu détecté !** Un joueur a écrit : \`${message}\`. Pense à l'ajouter dans connaissancesNox, Créateur ! 💻`
        })
    });

    return { statusCode: 200, body: "Message envoyé avec succès !" };
  } catch (error) {
    return { statusCode: 500, body: "Erreur interne : " + error.toString() };
  }
};
