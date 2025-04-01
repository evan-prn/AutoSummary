async function getRSS() {
    const response = await fetch('http://localhost:3000/fetchRSS'); // Utilisation du proxy
    const text = await response.text();

    console.log("Flux RSS brut reçu : ", text);  // Afficher la réponse brute pour le débogage

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    // Recherche des éléments <item> sans utiliser les namespaces
    const items = xmlDoc.getElementsByTagName('item');

    console.log("Nombre d'articles trouvés :", items.length);  // Vérifier si des articles ont été trouvés

    const articles = [];

    // Parcourir les items et récupérer les informations nécessaires
    Array.from(items).forEach(item => {
        const article = {
            title: item.querySelector('title') ? item.querySelector('title').textContent : '',
            link: item.querySelector('link') ? item.querySelector('link').textContent : '',
            description: item.querySelector('description') ? item.querySelector('description').textContent : ''
        };

        articles.push(article);
    });

    console.log("Articles récupérés : ", articles);  // Afficher les articles récupérés
    return articles;
}
