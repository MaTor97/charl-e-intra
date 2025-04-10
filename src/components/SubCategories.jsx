import { useEffect, useState } from 'react';
import { fetchSubCategories } from '../assets/files/functions/fetchSubCategories';

const SubCategories = ({ page, setPage }) => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const loadSubCategories = async () => {
            const data = await fetchSubCategories(page);
            setSubCategories(data);
        };
        loadSubCategories();
    }, [page]);

    return (
        <ul className="subCategories">
                {subCategories.map(subCategory => (
                    <li 
                        key={subCategory.id} 
                        onClick={() => { setPage(subCategory.id); }}
                        >
                        {subCategory.name}
                    </li>
                ))}
        </ul>
    );
};

export default SubCategories;
