// ============================================
// LISTE DES JEUX — P-GAME STUDIO
// ============================================
//
// Pour ajouter un nouveau jeu :
// 1. Copie un bloc { ... } ci-dessous (avec les accolades)
// 2. Colle-le juste avant le "];" à la fin
// 3. Change les valeurs (titre, genre, description, lien, date)
// 4. N'oublie pas la virgule "," entre chaque jeu
// 5. Sauvegarde le fichier, recharge la page : c'est tout !
//
// GENRES DISPONIBLES (tu peux écrire ce que tu veux, mais ça doit
// rester court pour bien s'afficher) :
// "Plateforme / Aventure", "Action / Hack & Slash", "RPG",
// "Beat 'em up", "Survival Horror", "FPS", "Puzzle"...
//
// LIEN : mets l'URL itch.io, Netlify (ou autre). Si le jeu n'est pas
// encore jouable, laisse "" (vide) entre les guillemets et le bouton
// ne s'affichera pas.
//
// DATE : format "AAAA-MM" (année-mois), ex: "2025-02" pour Février 2025.
// Laisse "" (vide) si tu ne veux pas afficher de date.
// ============================================

const jeux = [
  {
    titre: "Scale Breaker",
    genre: "Plateforme / Aventure",
    description: "Un samouraï capable de changer de taille à volonté grâce à un poison qui a rétréci tous les autres habitants. Lui seul a appris à le maîtriser — et il s'en sert pour affronter les robots de Katachi Corp et la détruire.",
    lien: "https://adonacj.itch.io/scale-breaker",
    date: "Mai-2026"
  },

  {
    titre: "The last sentinel",
    genre: "Survival Horror",
    description: "Incarnez Karl et survivez aux hordes de zombies 🧟‍♂️💥.",
    lien: "https://thelastsentinel.netlify.app",
    date: "Fevrier-2026"
  },

  // 👇 Exemple de nouveau jeu (à copier/modifier, puis enlève "//" devant chaque ligne)
  // {
  //   titre: "Nom de ton jeu",
  //   genre: "Survival Horror",
  //   description: "Description courte de ton jeu en 1-2 phrases.",
  //   lien: "https://tonlien.itch.io/ton-jeu",
  //   date: "2025-02"
  // },

];

