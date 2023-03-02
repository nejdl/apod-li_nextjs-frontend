import BorderTop from'../Border/BorderTop';

const Event = ({content, eventsAreGrouped}) => {
    const title = content.title;
    const subtitle = content.subtitle;
    const url = content.url;
    const date = content.date;
    const endDate = content.endDate;

    const formatDate = (date) => {
        let datePart = date.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];

        return day+'.'+month+'.'+year;
    }

    return (
        <>
            {!eventsAreGrouped 
            && <BorderTop /> }
            <div className='block_event'>
                <div className='block_event_date'>
                    <div className='block_event_startDate' >
                        {formatDate(date)}
                    </div>
                    {endDate !== null
                    && <div className='block_event_endDate'>
                            {formatDate(endDate)}
                        </div>
                    }
                </div>
                <div className='block_event_info'>
                    <a className='block_event_url' href={url}>
                        <div className='block_event_title'>{title}</div>
                    </a>
                    <div className='block_event_subtitle'>{subtitle}</div>
                    {/* <a className='block_event_url' href={url}>{url}</a> */}
                </div>
            </div>
        </>
    );
};

export default Event;