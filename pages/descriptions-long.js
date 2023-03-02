import { getDataOfPosts } from '../api/api';
import { libraryMenuItem } from '../components/Navigation/MenuItems';

import { transformMenuItemToSlug } from '../components/Navigation/MenuItems';
import { transformMenuItemToApiSlug } from '../components/Navigation/MenuItems';

import latinize from 'latinize';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

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
  // sort meta data alphabetically
  const sortAlphabetically = (thisContent) => {
    thisContent.sort((a, b) =>
      // sort names in lowercase and with removed diacritics
      latinize(a.name.toLowerCase()) > latinize(b.name.toLowerCase()) ? 1 : -1
    );

    return thisContent;
  };

  const sortPostsData = (thisContent) => {
    // sort by year
    const sortedPostsData = thisContent.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }

      // if it has the same year
      if (a.year === b.year) {
        // sort by author name

        if (
          sortAlphabetically(a.authors)[0].name.toLowerCase() <
          sortAlphabetically(b.authors)[0].name.toLowerCase()
        ) {
          return -1;
        }

        if (
          sortAlphabetically(a.authors)[0].name.toLowerCase() >
          sortAlphabetically(b.authors)[0].name.toLowerCase()
        ) {
          return 1;
        }
      }

      return 0;
    });

    return sortedPostsData;
  };

  const hasNumberMetaData = (number) => {
    if (number && number > 0) {
      return true;
    } else {
      // console.log(number);
      return false;
    }
  };

  const hasStringMetaData = (string) => {
    if (string !== null && string !== undefined && string.trim() !== '') {
      return true;
    } else {
      return false;
    }
  };

  const hasArrayMetaData = (array) => {
    if (array.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const [shownPostsData, setShownPostsData] = useState([]);

  useEffect(() => {
    // filter out invisible posts
    const visiblePostsData = postsData.filter(
      (postData) => postData.visibility === true
    );

    // filter out posts data without year / author
    const postsDataWithYearAndAuthor = visiblePostsData.filter(
      (postData) =>
        hasNumberMetaData(postData.year) && hasArrayMetaData(postData.authors)
    );

    // sort post data by year and name
    const postsDataSortedByYearAndDate = sortPostsData(
      postsDataWithYearAndAuthor
    );

    setShownPostsData(postsDataSortedByYearAndDate);
  }, []);

  return (
    <div className='siteBody_descriptions'>
      <h1>DESCRIPTIONS LONG</h1>
      {shownPostsData.length < 1 ? (
        <div className='value'>Loading...</div>
      ) : (
        <div className='value'>
          {shownPostsData.length} visible publications
        </div>
      )}
      <hr />
      {shownPostsData.map((post) => {
        // if (post.visibility) {
        return (
          // PUBLICATION
          <div key={post.id}>
            {/* TITLE */}
            <h1>{post.title}</h1>
            {/* SUBTITLE */}
            {hasStringMetaData(post.subtitle) && <h2>{post.subtitle}</h2>}
            {/* AUTHORS */}
            {/* {hasArrayMetaData(post.authors) && (
              <div className='property'>Author:</div>
            )} */}
            {post.authors.length === 1 ? (
              <div className='property'>Author:</div>
            ) : post.authors.length > 1 ? (
              <div className='property'>Authors:</div>
            ) : (
              ''
            )}
            {sortAlphabetically(post.authors).map((author) => (
              <div className='value' key={'author' + author.id}>
                {author.firstName} {author.name}
              </div>
            ))}
            {/* YEAR */}
            {(hasNumberMetaData(post.year) ||
              hasStringMetaData(post.year_non_numerical)) && (
              <div className='property'>Year:</div>
            )}
            {hasStringMetaData(post.year_non_numerical) ? (
              <div className='value'>{post.year_non_numerical}</div>
            ) : (
              <div className='value'>{post.year}</div>
            )}
            {/* PUBLISHERS */}
            {hasArrayMetaData(post.publishers) && (
              <div className='property'>Publisher:</div>
            )}
            {sortAlphabetically(post.publishers).map((publisher) => (
              <div className='value' key={'publisher' + publisher.id}>
                {publisher.name}
              </div>
            ))}
            {/* ARTIST GROUP */}
            {/* {hasArrayMetaData(post.artist_groups) && (
                <div className='property'>Artist Group:</div>
              )}
              {sortAlphabetically(post.artist_groups).map((artistGroup) => (
                <div className='value' key={'artistGroup' + artistGroup.id}>
                  {artistGroup.name}
                </div>
              ))} */}

            {/* GENRES */}
            {hasArrayMetaData(post.genres) && (
              <div className='property'>Genre:</div>
            )}
            {sortAlphabetically(post.genres).map((genre) => (
              <div className='value' key={'genre' + genre.id}>
                {genre.name}
              </div>
            ))}
            {/* METHODS */}
            {hasArrayMetaData(post.methods) && (
              <div className='property'>Method:</div>
            )}
            {sortAlphabetically(post.methods).map((method) => (
              <div className='value' key={'method' + method.id}>
                {method.name}
              </div>
            ))}
            {/* SUBJECTS */}
            {hasArrayMetaData(post.subjects) && (
              <div className='property'>Subject:</div>
            )}
            {sortAlphabetically(post.subjects).map((subject) => (
              <div className='value' key={'subject' + subject.id}>
                {subject.name}
              </div>
            ))}

            {/* VOLUMES */}
            {(hasNumberMetaData(post.volumes) ||
              hasStringMetaData(post.volumes_non_numerical)) && (
              <div className='property'>Volumes:</div>
            )}
            {hasStringMetaData(post.volumes_non_numerical) ? (
              <div className='value'>{post.volumes_non_numerical}</div>
            ) : (
              <div className='value'>{post.volumes}</div>
            )}
            {/* PLATFORM */}
            {hasArrayMetaData(post.platforms) && (
              <div className='property'>Platform:</div>
            )}
            {sortAlphabetically(post.platforms).map((platform) => (
              <div className='value' key={'platform' + platform.id}>
                {platform.name}
              </div>
            ))}
            {/* EDITION CHARACTERISTICS / ISBN */}
            {(hasArrayMetaData(post.edition_characteristics) ||
              hasStringMetaData(post.isbn)) && (
              <div className='property'>Edition Characteristics:</div>
            )}
            {sortAlphabetically(post.edition_characteristics).map(
              (edition_characteristic) => {
                if (edition_characteristic.name !== 'ISBN') {
                  return (
                    <div
                      className='value'
                      key={'edition_characteristic' + edition_characteristic.id}
                    >
                      {edition_characteristic.name}
                    </div>
                  );
                }
              }
            )}
            {hasStringMetaData(post.isbn) && (
              <div className='value'>
                {post.isbn.startsWith('ISBN ')
                  ? post.isbn
                  : 'ISBN ' + post.isbn}
              </div>
            )}
            {/* FORMAT */}
            {hasArrayMetaData(post.formats) && (
              <div className='property'>Format:</div>
            )}
            {sortAlphabetically(post.formats).map((format) => (
              <div className='value' key={'format' + format.id}>
                {format.name}
              </div>
            ))}
            {/* MATERIALITIES */}
            {hasArrayMetaData(post.materialities) && (
              <div className='property'>Materialities:</div>
            )}
            {sortAlphabetically(post.materialities).map((materiality) => {
              if (materiality.name !== 'unpaginated') {
                return (
                  <div className='value' key={'materiality' + materiality.id}>
                    {materiality.name}
                  </div>
                );
              }
            })}
            {/* PAGES */}
            {(hasNumberMetaData(post.pages) ||
              post.materialities.find(
                (materiality) => materiality.name === 'unpaginated'
              )) && <div className='property'>Pages:</div>}
            {hasNumberMetaData(post.pages) && (
              <div className='value'>{post.pages}</div>
            )}
            {post.materialities.find(
              (materiality) => materiality.name === 'unpaginated'
            ) && <div className='value'>unpaginated</div>}

            {/* DESCRIPTION */}
            <ReactMarkdown>{post.description}</ReactMarkdown>

            {/* PUBLICATION GROUP */}
            {post.publication_group.map((publicationGroupItem) => (
              // PUBLICATION GROUP ITEM
              <div key={'publicationGroup' + publicationGroupItem.id}>
                {/* PUBLICATION GROUP ITEM / TITLE */}
                <h3>{publicationGroupItem.title}</h3>
                {/* PUBLICATION GROUP ITEM / SUBTITLE */}
                {hasStringMetaData(publicationGroupItem.subtitle) && (
                  <h4>{publicationGroupItem.subtitle}</h4>
                )}
                {/* PUBLICATION GROUP ITEM / AUTHORS */}
                {hasArrayMetaData(publicationGroupItem.authors) && (
                  <div className='property'>Author:</div>
                )}
                {sortAlphabetically(publicationGroupItem.authors).map(
                  (author) => (
                    <div className='value' key={'author' + author.id}>
                      {author.firstName} {author.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / YEAR */}
                {(hasNumberMetaData(publicationGroupItem.year) ||
                  hasStringMetaData(
                    publicationGroupItem.year_non_numerical
                  )) && <div className='property'>Year:</div>}
                {hasStringMetaData(publicationGroupItem.year_non_numerical) ? (
                  <div className='value'>
                    {publicationGroupItem.year_non_numerical}
                  </div>
                ) : (
                  <div className='value'>{publicationGroupItem.year}</div>
                )}
                {/* PUBLICATION GROUP ITEM / PUBLISHERS */}
                {hasArrayMetaData(publicationGroupItem.publishers) && (
                  <div className='property'>Publisher:</div>
                )}
                {sortAlphabetically(publicationGroupItem.publishers).map(
                  (publisher) => (
                    <div className='value' key={'publisher' + publisher.id}>
                      {publisher.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / ARTIST GROUP */}
                {hasArrayMetaData(publicationGroupItem.artist_groups) && (
                  <div className='property'>Artist Group:</div>
                )}
                {sortAlphabetically(publicationGroupItem.artist_groups).map(
                  (artistGroup) => (
                    <div className='value' key={'artistGroup' + artistGroup.id}>
                      {artistGroup.name}
                    </div>
                  )
                )}

                {/* PUBLICATION GROUP ITEM / GENRES */}
                {hasArrayMetaData(publicationGroupItem.genres) && (
                  <div className='property'>Genre:</div>
                )}
                {sortAlphabetically(publicationGroupItem.genres).map(
                  (genre) => (
                    <div className='value' key={'genre' + genre.id}>
                      {genre.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / METHODS */}
                {hasArrayMetaData(publicationGroupItem.methods) && (
                  <div className='property'>Method:</div>
                )}
                {sortAlphabetically(publicationGroupItem.methods).map(
                  (method) => (
                    <div className='value' key={'method' + method.id}>
                      {method.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / SUBJECTS */}
                {hasArrayMetaData(publicationGroupItem.subjects) && (
                  <div className='property'>Subject:</div>
                )}
                {sortAlphabetically(publicationGroupItem.subjects).map(
                  (subject) => (
                    <div className='value' key={'subject' + subject.id}>
                      {subject.name}
                    </div>
                  )
                )}

                {/* PUBLICATION GROUP ITEM / VOLUMES */}
                {(hasNumberMetaData(publicationGroupItem.volumes) ||
                  hasStringMetaData(
                    publicationGroupItem.volumes_non_numerical
                  )) && <div className='property'>Volumes:</div>}
                {hasStringMetaData(
                  publicationGroupItem.volumes_non_numerical
                ) ? (
                  <div className='value'>
                    {publicationGroupItem.volumes_non_numerical}
                  </div>
                ) : (
                  <div className='value'>{publicationGroupItem.volumes}</div>
                )}
                {/* PUBLICATION GROUP ITEM / PLATFORM */}
                {hasArrayMetaData(publicationGroupItem.platforms) && (
                  <div className='property'>Platform:</div>
                )}
                {sortAlphabetically(publicationGroupItem.platforms).map(
                  (platform) => (
                    <div className='value' key={'platform' + platform.id}>
                      {platform.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / EDITION CHARACTERISTICS / ISBN */}
                {(hasArrayMetaData(
                  publicationGroupItem.edition_characteristics
                ) ||
                  hasStringMetaData(publicationGroupItem.isbn)) && (
                  <div className='property'>Edition Characteristics:</div>
                )}
                {sortAlphabetically(
                  publicationGroupItem.edition_characteristics
                ).map((edition_characteristic) => {
                  if (edition_characteristic.name !== 'ISBN') {
                    return (
                      <div
                        className='value'
                        key={
                          'edition_characteristic' + edition_characteristic.id
                        }
                      >
                        {edition_characteristic.name}
                      </div>
                    );
                  }
                })}
                {hasStringMetaData(publicationGroupItem.isbn) && (
                  <div className='value'>
                    {publicationGroupItem.isbn.startsWith('ISBN ')
                      ? publicationGroupItem.isbn
                      : 'ISBN ' + publicationGroupItem.isbn}
                  </div>
                )}
                {/* PUBLICATION GROUP ITEM / FORMAT */}
                {hasArrayMetaData(publicationGroupItem.formats) && (
                  <div className='property'>Format:</div>
                )}
                {sortAlphabetically(publicationGroupItem.formats).map(
                  (format) => (
                    <div className='value' key={'format' + format.id}>
                      {format.name}
                    </div>
                  )
                )}
                {/* PUBLICATION GROUP ITEM / MATERIALITIES */}
                {hasArrayMetaData(publicationGroupItem.materialities) && (
                  <div className='property'>Materialities:</div>
                )}
                {sortAlphabetically(publicationGroupItem.materialities).map(
                  (materiality) => {
                    if (materiality.name !== 'unpaginated') {
                      return (
                        <div
                          className='value'
                          key={'materiality' + materiality.id}
                        >
                          {materiality.name}
                        </div>
                      );
                    }
                  }
                )}
                {/* PUBLICATION GROUP ITEM / PAGES */}
                {(hasNumberMetaData(publicationGroupItem.pages) ||
                  publicationGroupItem.materialities.find(
                    (materiality) => materiality.name === 'unpaginated'
                  )) && <div className='property'>Pages:</div>}
                {hasNumberMetaData(publicationGroupItem.pages) && (
                  <div className='value'>{publicationGroupItem.pages}</div>
                )}
                {publicationGroupItem.materialities.find(
                  (materiality) => materiality.name === 'unpaginated'
                ) && <div className='value'>unpaginated</div>}

                {/* PUBLICATION GROUP ITEM / DESCRIPTION */}
                <ReactMarkdown>
                  {publicationGroupItem.description}
                </ReactMarkdown>
              </div>
            ))}

            <hr />
          </div>
        );
        // }
      })}
    </div>
  );
};

export default DescriptionsPage;
