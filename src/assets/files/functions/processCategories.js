import { fetchTopCategories } from "./functions/fetchTopCategories";
import { hasChildren } from "./functions/hasChildrens";
import { reorderNav } from "./functions/reorderNav";
import { subCategoriesPages } from '../assets/files/contentVariables';

export const processCategories = async () => {
    // Récupérer les catégories
    let categories = await fetchTopCategories();
  
    // Réorganiser les catégories
    categories = reorderNav(categories);
  
    // Vérifier les sous-catégories
    const categoriesWithChildren = [];
  
    for (let category of categories) {
      const hasChild = await hasChildren(category.id);
      if (hasChild) {
        categoriesWithChildren.push(category);
      }
    }
  
    // Mettre à jour subCategoriesPages avec les catégories ayant des sous-catégories
    subCategoriesPages.length = 0; // Réinitialiser subCategoriesPages
    categoriesWithChildren.forEach(cat => subCategoriesPages.push(cat.id));
  
    return { categoriesWithChildren };
};
