const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware pour gérer les requêtes JSON
app.use(bodyParser.json());

// Route pour récupérer le flux RSS
app.get('/fetchRSS', async (req, res) => {
    try {
      const response = await axios.get('https://www.actuia.com/feed/');
      console.log("Réponse brute RSS:", response.data);  // Débogage : afficher la réponse brute
      res.json(response.data); // Renvoi des données RSS au frontend
    } catch (error) {
      console.error("Erreur lors de la récupération du RSS:", error);
      res.status(500).json({ error: 'Erreur lors de la récupération du flux RSS' });
    }
  });

// Route pour générer le résumé avec OpenAI
app.post('/generateSummary', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `Résume en 3 phrases :\n\n${text}`,
            max_tokens: 100,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer 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` // Remplace par ta clé API OpenAI
            }
        });

        const summary = response.data.choices[0].text.trim();
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la génération du résumé' });
    }
});

// Servir les fichiers statiques (CSS, JS, HTML) depuis le dossier public
app.use(express.static('public'));

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
