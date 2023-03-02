import Header from '../MetaData/Header';
import Format from '../MetaData/Format/Format';
import Description from '../Description/Description';
import Links from '../Links/Links';
import OpacLinks from '../Links/OpacLinks';
import Bibliography from '../Bibliography/Bibliography';
import BorderTop from '../../../Blocks/Border/BorderTop';

const PublicationGroup = ({ content }) => {
  const title = content.title;
  const subtitle = content.subtitle;

  return (
    <>
      {content.visibility && (
        <div>
          {(title || subtitle) && (
            <>
              <BorderTop />
              <div className='BookDetail_PublicationGroup_title'>{title}</div>
              <div className='BookDetail_PublicationGroup_subtitle'>
                {subtitle}
              </div>
            </>
          )}
          <Header content={content} />
          <Description title='Description' content={content} />
          <Format content={content} />
          <div className='BookDetail_Footer'>
            <Links content={content} isPublicationGroup />
            <OpacLinks content={content} isPublicationGroup />
            <Bibliography content={content} />
          </div>
        </div>
      )}
    </>
  );
};

export default PublicationGroup;
