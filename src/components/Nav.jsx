import { useEffect, useState } from 'react';
import { fetchTopCategories } from '../../src/assets/files/functions/fetchTopCategories';

const Nav = ({ setPage, selected, setSelected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchTopCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
      setSelected(categoryId);
      setPage(categoryId);
  };

  return (
    <nav>
      <ul>
        {categories.map(category => (
          <li 
            key={category.id} 
            onClick={() => handleCategoryClick(category.id)}  
            className={selected === category.id ? 'selected' : 'others'}
            >
              {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
