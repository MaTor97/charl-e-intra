import { fetchURL } from './fetch';
import { reorderNav } from './reorderNav'

export const fetchTopCategories = async () => {
  try {
    const data = await fetchURL("categories?parent=0");
    return reorderNav(data)
    
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
    return [];
  }
};
