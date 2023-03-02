import { getDataOfPosts } from '../api/api';
import { libraryMenuItem } from '../components/Navigation/MenuItems';

import { transformMenuItemToSlug } from '../components/Navigation/MenuItems';
import { transformMenuItemToApiSlug } from '../components/Navigation/MenuItems';

import ReactMarkdown from 'react-markdown';

let pageTitle = libraryMenuItem;
const apiSlug = transformMenuItemToApiSlug(pageTitle);

export const getStaticProps = async () => {
  // get data of slugs of posts
  const postsData = await getDataOfPosts(apiSlug);

  return {
    props: {
      postsData,
    },
  };
};

const DescriptionsPage = ({ postsData }) => {
  return (
    <div className='siteBody_descriptions'>
      {postsData.map((post) => {
        if (post.visibility) {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <h2>{post.subtitle}</h2>
              {post.authors.map((author) => (
                <div key={'author' + author.id}>
                  <small>
                    {author.firstName} {author.name}
                  </small>
                </div>
              ))}
              {post.publishers.map((publisher) => (
                <div key={'publisher' + publisher.id}>
                  <small>{publisher.name}</small>
                </div>
              ))}
              <div>
                <small>{post.year}</small>
              </div>
              {post.artist_groups.map((artistGroup) => (
                <div key={'artistGroup' + artistGroup.id}>
                  {artistGroup.name}
                </div>
              ))}
              <ReactMarkdown>{post.description}</ReactMarkdown>

              <br />
              {post.publication_group.map((publicationGroup) => (
                <div key={'publicationGroup' + publicationGroup.id}>
                  <h3>{publicationGroup.title}</h3>
                  <h4>{publicationGroup.subtitle}</h4>
                  <div>
                    <small>{publicationGroup.year}</small>
                  </div>
                  <ReactMarkdown>{publicationGroup.description}</ReactMarkdown>
                  <br />
                </div>
              ))}

              <br />
              <hr />
            </div>
          );
        }
      })}
    </div>
  );
};

export default DescriptionsPage;
