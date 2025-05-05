import { useEffect, useRef, useState } from 'react';
import { fetchTopCategories } from '../assets/files/functions/fetchTopCategories';
import { fetchURL } from '../assets/files/functions/fetch';

const Nav = ({ selected, setSelected, navigate }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const subCategoriesRef = useRef(null);

  // Initialise le nav avec ses catégories, sous-catégories et gère les cliques
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchTopCategories();
      setCategories(data);
    };
    loadCategories();

    // Gestion du clique hors des sous catégories pour faire disparaitre le menu
    const handleClickOutside = (event) => {
      if (
        subCategoriesRef.current &&
        !subCategoriesRef.current.contains(event.target)
      ) {
        setSubCategories([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Gestion du clique sur les catégories
  const handleCategoryClick = async (category) => {
    setSelected(category.id);
    const data = await fetchURL(`categories?parent=${category.id}`);
    if (data.length > 0) {
      setSubCategories(data);
    } else {
      setSubCategories([]);
      navigate(`/posts?categories=${category.id}`);
    }
  };

  // Gestion du clique sur les sous catégories
  const handleSubCategoryClick = (subCategory) => {
    setSubCategories([]); 
    navigate(`/posts?categories=${subCategory.id}`);
  };

  return (
    <nav>
      {/* CATEGORIES */}
      <ul>
        {categories.map((category) => (
          <li 
            key={category.id} 
            onClick={() => handleCategoryClick(category)}
            className={selected === category.id ? 'selected' : ''}
            >
            {category.name}
          </li>
        ))}
      </ul>

      {/* SOUS CATEGORIES*/}  
      {subCategories.length > 0 && (
        <ul className='subCategories' ref={subCategoriesRef}>
          <div className="transparent-blur"></div>
          {subCategories.map((subCategory) => (
            <li 
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory)}
              >
                {subCategory.name}
            </li>
          ))}
            {/* FOND DU SOUS MENU TRANSPARENT */}
            <li id='fond' onClick={() => setSubCategories([])}></li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
