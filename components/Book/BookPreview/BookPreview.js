import latinize from 'latinize';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import MetaData from './MetaData/MetaData';
import Coverimage from './Coverimage/Coverimage';
import BorderTop from '../../Blocks/Border/BorderTop';
import BorderBottom from '../../Blocks/Border/BorderBottom';

const BookPreview = ({ content, setSessionStorageOnClick }) => {
  const sortAlphabetically = (thisContent) => {
    thisContent.sort((a, b) =>
      // sort names in lowercase and with removed diacritics
      latinize(a.name.toLowerCase()) > latinize(b.name.toLowerCase()) ? 1 : -1
    );
    return thisContent;
  };

  const title = content.title;
  const titleFormatted = content.title_formatted;
  // show formatted title if filled in
  let titleToShow = title;
  if (titleFormatted && titleFormatted !== '' && titleFormatted !== ' ') {
    titleToShow = (
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {titleFormatted}
      </ReactMarkdown>
    );
  }
  const subtitle = content.subtitle;
  const slug = content.slug;
  const authors = sortAlphabetically(content.authors);
  const platforms = sortAlphabetically(content.platforms);
  const year = content.year;
  const startYear = content.start_year;
  const endYear = content.end_year;
  const genres = sortAlphabetically(content.genres);
  const subjects = sortAlphabetically(content.subjects);
  const metaSubjects = sortAlphabetically(content.meta_subjects);
  const methods = sortAlphabetically(content.methods);
  const editionCharacteristics = sortAlphabetically(
    content.edition_characteristics
  );
  const coverimage = content.coverimage;

  const hasProperty = (property) => {
    if (
      property !== null &&
      property !== undefined &&
      property !== '' &&
      property !== ' ' &&
      property.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className='BookPreview_container blur greyTransparent'
      onClick={setSessionStorageOnClick}
    >
      <Link href={'/' + slug}>
        {/* open link in new tab */}
        <a target='_blank'>
          {/* <a> */}
          <div className='BookPreview_header'>
            <BorderTop />
            {/* <div className='BookPreview_metaData BookPreview_metaDataContainerTop_authors'>
                <div>
                  <MetaData 
                    content={authors}
                    contentType='authors' />
                </div>
              </div> */}
            <div className='BookPreview_title'>{titleToShow}</div>
            {hasProperty(subtitle) && (
              <div className='BookPreview_subtitle'>{subtitle}</div>
            )}

            <div className='BookPreview_metaData BookPreview_metaDataContainer_authors'>
              <div>
                <MetaData content={authors} contentType='authors' />
              </div>
            </div>
            <div className='BookPreview_metaData'>
              <div>
                <span className='BookPreview_metaData_gradient'></span>
                {/* <MetaData 
                                    content={authors}
                                    contentType='authors' /> */}
                <MetaData content={year} contentType='year' />
                <MetaData content={platforms} contentType='platforms' />
                {/* <MetaData 
                                    content={editionCharacteristics}
                                    contentType='editionCharacteristics' /> */}
              </div>
              <div>
                <span className='BookPreview_metaData_gradient'></span>
                <MetaData content={genres} contentType='genres' />
                <MetaData content={subjects} contentType='subjects' />
                {/* <MetaData 
                                    content={metaSubjects}
                                    contentType='metaSubjects' /> */}
                <MetaData content={methods} contentType='methods' />
              </div>
            </div>
            <Coverimage content={coverimage} />
            <BorderBottom />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BookPreview;
