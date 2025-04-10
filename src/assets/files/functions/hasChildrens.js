import { fetchURL } from "./fetch"
import { reorderNav } from "./reorderNav"

export const main = async () => {
  let categories = await fetchURL("categories?parent=0");
  categories = reorderNav(categories);

  const hasChildren = async (categoryId) => {
      const children = await fetchURL(`categories?parent=${categoryId}`);
      return children.length > 0;
    };

  // Vérifier pour chaque catégorie si elle a des enfants
  const categoriesWithChildrenCheck = await Promise.all(
    categories.map(async (cat) => {
      const hasChild = await hasChildren(cat.id);
      return {
        ...cat,
        hasChildren: hasChild
      };
    })
  );

  // Séparer les catégories avec et sans enfants
  const withChildren = categoriesWithChildrenCheck.filter(cat => cat.hasChildren);
  const subCategory = []
  withChildren.map(children => {
    subCategory.push(children.id)
  })
  return subCategory
}
