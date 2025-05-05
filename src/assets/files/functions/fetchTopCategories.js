import { fetchURL } from './fetch';
import { reorderNav } from './reorderNav'

// AVOIR LA LISTE DES CATEGORIES ET LES REORGANISER DANS L'ORDRE
export const fetchTopCategories = async () => {
  try {
    const data = await fetchURL("categories?parent=0");
    return reorderNav(data)
    
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
    return [];
  }
};
