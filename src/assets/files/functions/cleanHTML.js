// Fonction pour décoder une chaîne HTML encodée (ex: "&amp;" devient "&")
export function decodeHtml(html) {
  // On crée dynamiquement un élément <textarea>
  const txt = document.createElement("textarea");

  // On affecte le HTML encodé à sa propriété innerHTML
  txt.innerHTML = html;

  // Le navigateur interprète automatiquement les entités HTML, donc
  // on peut récupérer le texte décodé via `.value`
  return txt.value;
}

// Fonction pour supprimer toutes les balises HTML d'une chaîne
export function stripHtml(html) {
  // On crée dynamiquement un élément <div>
  const tempDiv = document.createElement("div");

  // On place la chaîne HTML dans le innerHTML du <div>,
  // ce qui permet au navigateur de construire le DOM à partir de cette chaîne
  tempDiv.innerHTML = html;

  // On récupère le texte brut sans balises
  // `.textContent` est préféré, mais `.innerText` sert de fallback
  return tempDiv.textContent || tempDiv.innerText || "";
}
