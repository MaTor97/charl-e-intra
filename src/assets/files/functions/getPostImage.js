import { fetchURL } from "./fetch";

export const getPostImage = async (post) => {
  const endpoint = post._links["wp:attachment"]?.[0]?.href.split("wp/v2/")[1];
  if (endpoint) {
    try {
      const route = await fetchURL(endpoint);
      const finalImageURL = route[0]?.guid?.rendered || ''; // Ensure it's declared
      return finalImageURL;
    } catch (err) {
      console.error("Erreur lors de la récupération de l'image :", err);
      return null; // Optionally return a fallback value or null
    }
  } else {
    return null; // Return null if no endpoint is found
  }
};
