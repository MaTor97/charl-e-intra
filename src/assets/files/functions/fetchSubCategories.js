import { fetchURL } from './fetch';

// AVOIR LA LISTE DES SOUS CATEGORIES
export const fetchSubCategories = async (categoryId) => {
  try {
    return await fetchURL(`categories?parent=${categoryId}`);
  } catch (error) {
    console.error("Erreur lors du chargement des sous-catégories :", error);
    return [];
  }
};
