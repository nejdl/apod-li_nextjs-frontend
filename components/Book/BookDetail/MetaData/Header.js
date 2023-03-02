import { useEffect } from 'react';
import latinize from 'latinize';

import MetaData from './MetaData/MetaData';
import Year from './Year/Year';
import Volumes from './Volumes/Volumes';
import BorderTop from '../../../Blocks/Border/BorderTop';

const Header = ({ content }) => {
  // sort meta data alphabetically
  const sortAlphabetically = (thisContent) => {
    thisContent.sort((a, b) =>
      // sort names in lowercase and with removed diacritics
      latinize(a.name.toLowerCase()) > latinize(b.name.toLowerCase()) ? 1 : -1
    );

    return thisContent;
  };

  const authors = sortAlphabetically(content.authors);
  const artistGroups = sortAlphabetically(content.artist_groups);
  const publishers = sortAlphabetically(content.publishers);
  const platforms = sortAlphabetically(content.platforms);
  const year = content.year;
  const yearNonNumerical = content.year_non_numerical;
  const volumes = content.volumes;
  const volumesNonNumerical = content.volumes_non_numerical;
  const locations = content.locations;
  const genres = sortAlphabetically(content.genres);
  const subjects = sortAlphabetically(content.subjects);
  const metaSubjects = sortAlphabetically(content.meta_subjects);
  const methods = sortAlphabetically(content.methods);
  const editionCharacteristics = sortAlphabetically(
    content.edition_characteristics
  );
  const isbn = content.isbn;

  const hasHeader = () => {
    if (
      authors.length === 0 &&
      artistGroups.length === 0 &&
      publishers.length === 0 &&
      platforms.length === 0 &&
      year === null &&
      (yearNonNumerical === null || yearNonNumerical === undefined) &&
      volumes === null &&
      (volumesNonNumerical === null || volumesNonNumerical === undefined) &&
      locations.length === 0 &&
      genres.length === 0 &&
      subjects.length === 0 &&
      metaSubjects.length === 0 &&
      (isbn === null || isbn === '' || isbn === ' ') &&
      editionCharacteristics.length === 0 &&
      methods.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const hasAuthor = () => {
    if (authors.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {hasHeader() && (
        <div className='BookDetail_MetaDataContainer'>
          {/* hightlighted author meta data */}
          {hasAuthor() && (
            <div className='BookDetail_MetaData_Author'>
              <BorderTop />
              <div>
                <MetaData title='Author' content={authors} />
              </div>
            </div>
          )}
          <div className='BookDetail_MetaData_HeaderContainer'>
            {/* meta data header */}
            <BorderTop />
            <div className='BookDetail_MetaData_Header'>
              {/* Column 1 */}
              {/* <div> */}
              {/* <MetaData 
                                title='Author'
                                content={authors} /> */}
              {/* </div> */}
              {/* Column 2 */}
              <div>
                <MetaData title='Platform' content={platforms} />
                <MetaData title='Publisher' content={publishers} />
                <MetaData title='Artist Group' content={artistGroups} />
                <MetaData title='Location' content={locations} />
              </div>
              {/* Column 3 */}
              <div>
                {/* <MetaData 
                                title='Year'
                                content={year} /> */}
                <Year
                  title='Year'
                  year={year}
                  yearNonNumerical={yearNonNumerical}
                />
                {/* <MetaData 
                                content={formatVolumes()} /> */}
                <Volumes
                  volumes={volumes}
                  volumesNonNumerical={volumesNonNumerical}
                />
                <MetaData
                  // to style multi-line title, e.g. for Edition Characteristics
                  firstLineOfMultiLineTitle='Edition'
                  title='Characteristics'
                  content={editionCharacteristics}
                  isbn={isbn}
                />
              </div>
              {/* Column 4 */}
              <div>
                <MetaData title='Genre' content={genres} />
                <MetaData title='Method' content={methods} />
              </div>
              {/* Column 5 */}
              <div>
                {/* <MetaData 
                                title='Meta Subject'
                                content={metaSubjects} /> */}
                <MetaData title='Subject' content={subjects} />
              </div>
              {/* Column 6 */}
              {/* <div>
                        </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
