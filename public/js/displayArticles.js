async function displayArticles() {
	const articles = await getRSS();
	const container = document.getElementById('rss-feed-container');

	for (let article of articles) {
		const summary = await generateSummary(article.description);

		console.log("Affichage de l'article : ", article.title, summary);  // Débogage : afficher l'article et le résumé

		const articleElement = document.createElement('div');
		articleElement.classList.add('article');

		articleElement.innerHTML = `
      <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
      <p>${summary}</p>
    `;

		container.appendChild(articleElement);
	}
}

displayArticles();

