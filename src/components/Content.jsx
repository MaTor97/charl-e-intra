import Article from './FakeArticle';

const Content = ({ page }) => {
    return (
        <div className="content">
            {page === 'Article' ?
                 <Article />
            : null}
        </div>
    );
}

export default Content;