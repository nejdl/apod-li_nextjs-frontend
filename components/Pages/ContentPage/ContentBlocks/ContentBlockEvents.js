import { nanoid } from 'nanoid';

import BorderTop from'../../../Blocks/Border/BorderTop';
import Block from'../../../Blocks/Block';

const ContentBlockEvents = ({ eventsGroupedByYears }) => {
    return (
        <div key={nanoid()}>
            {eventsGroupedByYears.map(( eventsGroupedByYear ) => (
                <div key={eventsGroupedByYear.year}>
                    <BorderTop />
                    <div className='block_event_year'>
                        {eventsGroupedByYear.year}
                    </div>
                    {eventsGroupedByYear.record.map((event) => (
                        <Block 
                            key={event.id}
                            blockType={'text-blocks.event'}
                            content={event}
                            eventsAreGrouped />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ContentBlockEvents;