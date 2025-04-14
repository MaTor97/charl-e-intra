import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTopCategories } from '../assets/files/functions/fetchTopCategories';
import { fetchURL } from '../assets/files/functions/fetch';

const Nav = ({ selected, setSelected }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchTopCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

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

  const handleSubCategoryClick = (subCategory) => {
    setSubCategories([]);  // Réinitialiser subCategories
    navigate(`/posts?categories=${subCategory.id}`);
  };

  return (
    <nav>
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

      {subCategories.length > 0 && (
        <ul className='subCategories'>
          {subCategories.map((subCategory) => (
            <li 
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory)}
              >
                {subCategory.name}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
