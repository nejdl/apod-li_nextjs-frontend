import { nanoid } from 'nanoid';

import {
  groupEventsByYear,
  groupReferenceByYear,
} from '../../Filter/FilterLogic/FilterLogic';

import HtmlHead from '../../HtmlHead/HtmlHead';
import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
import Title from '../../Blocks/Title/Title';
import Block from '../../Blocks/Block';
import ContentBlockEvents from './ContentBlocks/ContentBlockEvents';
import ContentBlockReferences from './ContentBlocks/ContentBlockReferences';
import Text from '../../Blocks/Text/Text';
import BorderTop from '../../Blocks/Border/BorderTop';
import BorderBottom from '../../Blocks/Border/BorderBottom';
import ContentPageImageGallery from './ImageGallery/ContentPageImageGallery';

const ContentPage = ({
  pageTitle,
  subtitle,
  className,
  visibility,
  content,
  imageGalleries,
  visibilityHiddenText,
  menuOrder,
}) => {
  if (!visibilityHiddenText) {
    visibilityHiddenText = {
      text: 'This page is currently being edited or does not exist. You will be automatically redirected to the library. ',
    };
  }

  const redirectToRoot = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className='siteBody subpage'>
      <div className={className}>
        <HtmlHead pageTitle={pageTitle} />
        <NavigationBar menuOrder={menuOrder} />

        <div className='mainSection subPage'>
          <div className={` blur greyTransparent ${className} contentPage`}>
            <Title title={pageTitle} subtitle={subtitle} />

            <div className='contentSection'>
              <BorderTop />
              {!visibility ? (
                <div>
                  {redirectToRoot()}
                  <Text content={visibilityHiddenText} />
                </div>
              ) : (
                <>
                  {content.map((block) => {
                    const componentType = block.__component;

                    if (componentType === 'text-blocks.references') {
                      // IF BLOCK IS MULTIPLE REFERENCES
                      // get array of references inside block, group references by year & return with year seperators
                      const references = block.Reference;
                      const referencesGroupedByYears =
                        groupReferenceByYear(references);
                      return (
                        <ContentBlockReferences
                          key={nanoid()}
                          referencesGroupedByYears={referencesGroupedByYears}
                        />
                      );
                    } else if (componentType === 'text-blocks.events') {
                      // IF BLOCK IS MULTIPLE EVENTS
                      // get array of events inside block, group events by year, sort years descending & return with year seperator
                      const events = block.event;
                      const eventsGroupedByYears = groupEventsByYear(events);
                      eventsGroupedByYears.sort((a, b) =>
                        a.year < b.year ? 1 : b.year < a.year ? -1 : 0
                      );
                      return (
                        <ContentBlockEvents
                          key={nanoid()}
                          eventsGroupedByYears={eventsGroupedByYears}
                        />
                      );
                    } else {
                      // IF BLOCK IS SINGLE BLOCK
                      // just render as the specific block
                      return (
                        <Block
                          key={nanoid()}
                          blockType={componentType}
                          content={block}
                        />
                      );
                    }
                  })}

                  <ContentPageImageGallery imageGalleries={imageGalleries} />
                </>
              )}
              <BorderBottom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
