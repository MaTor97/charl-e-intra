import { fetchURL } from "./fetch";

// AVOIR L'URL WP:FEATUREDMEDIA
export const getPostImage = async (post) => {
  const endpoint = post._links["wp:featuredmedia"]?.[0]?.href.split("wp/v2/")[1];
  if (endpoint) {
    try {
      const route = await fetchURL(endpoint);
      const finalImageURL = route?.guid?.rendered || ''; // Ensure it's declared
      return finalImageURL;
    } catch (err) { 
      console.error("Erreur lors de la récupération de l'image :", err);
      return null; // Optionally return a fallback value or null
    }
  } else {
    return null; // Return null if no endpoint is found
  }
};
