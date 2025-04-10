import { subCategoriesPages } from '../assets/files/contentVariables'; 
import SubCategories from './SubCategories';
import Posts from './Posts'

const Content = ({ page, setPage }) => {
    return (
        <main className="content">
            {console.log("sub = ", subCategoriesPages)}
            {subCategoriesPages.includes(page) ? (
                <SubCategories page={page} setPage={setPage} />
            ) : (
                <Posts page={page} setPage={setPage}/>
            )}
        </main>
    );
};

export default Content;
