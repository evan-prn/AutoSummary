async function generateSummary(text) {
    const response = await fetch('/generateSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    });

    const data = await response.json();
    
    console.log("Résumé généré : ", data.summary);  // Débogage : afficher le résumé généré dans la console
    return data.summary;
}
