export const fetchLogin = async (endpoint, options = {}) => {
  try {
    const response = await fetch('/wp-json/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options.body || {}),
    });

    if (!response.ok) {
      throw new Error('Erreur réseau : ' + response.status);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('text/html')) {
      const htmlData = await response.text();
      return htmlData;  // Retourner le HTML pour affichage
    }

    const data = await response.json();  // Sinon, traiter comme JSON
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};
