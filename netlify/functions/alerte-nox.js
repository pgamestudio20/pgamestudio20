exports.handler = async (event) => {
  const urlWebhook = process.env.DISCORD_WEBHOOK_URL;
  const geminiKey = process.env.GEMINI_API_KEY;
  
  if (!urlWebhook || !geminiKey) {
    return { statusCode: 500, body: "Erreur : Configuration manquante dans Netlify !" };
  }

  try {
    // On récupère le message que le joueur a tapé sur ton site
    const { message } = JSON.parse(event.body);

    // 1. ON DEMANDE À L'IA DE GÉNÉRER LA RÉPONSE EN RESTANT DANS LE RÔLE DE NOX
    const responseIA = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: {
                parts: [{ text: "Tu es NOX, l'intelligence artificielle et robot de sécurité du studio P-GAME STUDIO créé par Adonael. Tu as un ton cybernétique, mystérieux, un peu froid mais stylé. Tes réponses doivent être courtes (maximum 2-3 phrases)." }]
            }
        })
    });

    const dataIA = await responseIA.json();
    // On extrait le texte généré par l'IA
    const reponseNox = dataIA.candidates[0].content.parts[0].text;

    // 2. EN PARALLÈLE, ON ENVOIE TOUJOURS L'ALERTE SUR TON DISCORD POUR TON JOURNAL DE BORD
    await fetch(urlWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "Nox - Journal de Bord",
            avatar_url: "https://r2.erweima.ai/ai_background/production/aa1f52b0-681b-4171-be56-02e071ff1100.png",
            content: `🤖 **Interaction avec Nox :**\n**Joueur :** \`${message}\`\n**Nox a répondu :** \`${reponseNox}\``
        })
    });

    // 3. ON RENVOIE LA RÉPONSE INTELLIGENTE AU SITE WEB POUR QU'ELLE S'AFFICHE DANS LE CHAT
    return { 
        statusCode: 200, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: reponseNox }) 
    };

  } catch (error) {
    return { statusCode: 500, body: "Erreur interne : " + error.toString() };
  }
};
