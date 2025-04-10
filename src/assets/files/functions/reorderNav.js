// Fonction pour réoriganiser le NAV
export const reorderNav = (data) => {
    const itemAtIndex4 = data.splice(4, 1); // Retirer l'élément d'index 4
      data.unshift(itemAtIndex4[0]); // Ajouter cet élément au début du tableau

      // Enlever les deux derniers éléments
      data.splice(-2, 2); // Retire les deux derniers éléments du tableau
      return data;
}