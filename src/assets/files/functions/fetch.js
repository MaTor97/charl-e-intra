export const fetchURL = async (endpoint) => {
  try {
    const response = await fetch('https://intradev.acc-vdc.be/wp-json/wp/v2/' + endpoint);
    if (!response.ok) {
      throw new Error('Erreur réseau : ' + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};
