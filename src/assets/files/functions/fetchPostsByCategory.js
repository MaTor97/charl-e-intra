import { fetchURL } from './fetch';

export const fetchPostsByCategory = async (categoryId) => {
  try {
    return await fetchURL(`posts?categories=${categoryId}`);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return [];
  }
};
