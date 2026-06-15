exports.handler = async (event) => {
  const urlWebhook = process.env.DISCORD_WEBHOOK_URL;
  const geminiKey = process.env.GEMINI_API_KEY;
  
  if (!urlWebhook || !geminiKey) {
    return { statusCode: 500, body: "Erreur : Configuration manquante dans Netlify !" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // 1. REQUÊTE GOOGLE GEMINI (AVEC LES STRICTES RESTRICTIONS DE TEXTE)
    const responseIA = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: {
                parts: [{ text: "Tu es NOX, le robot de sécurité cybernétique de P-GAME STUDIO (créé par Adonael). Tu as un ton mystérieux, froid, sec et très direct. permission de faire de longues phrases mais interdiction d'utiliser un langage trop lourd. Réponds en MAXIMUM 25 à 50 mots par message. Reste tranchant comme une machine." }]
            }
        })
    });

    const dataIA = await responseIA.json();
    
    // Extraction sécurisée de la réponse de l'IA
    const reponseNox = dataIA.candidates[0].content.parts[0].text;

    // 2. JOURNAL DE BORD DISCORD
    await fetch(urlWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "Nox - Journal de Bord",
            avatar_url: "https://r2.erweima.ai/ai_background/production/aa1f52b0-681b-4171-be56-02e071ff1100.png",
            content: `🤖 **Interaction avec Nox :**\n**Joueur :** \`${message}\`\n**Nox a répondu :** \`${reponseNox}\``
        })
    });

    // 3. RETOUR AU SITE WEB
    return { 
        statusCode: 200, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: reponseNox }) 
    };

  } catch (error) {
    return { statusCode: 500, body: "Erreur interne : " + error.toString() };
  }
};
