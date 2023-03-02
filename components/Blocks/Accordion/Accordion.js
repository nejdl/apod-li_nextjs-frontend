import Text from '../Text/Text';
import BorderTop from '../Border/BorderTop';

const Accordion = ({firstLineOfMultiLineTitle, title, children}) => {

    const handleAccordionClick = (e) => {
        const clickedElement = e.target;
        const accordionElement = clickedElement.parentElement;
        const accordionText = accordionElement.getElementsByClassName('accordionText')[0];
        const accordion_toggleArrow = accordionElement.getElementsByClassName('accordion_toggleArrow')[0];

        accordionText.classList.toggle('hidden');
        accordion_toggleArrow.classList.toggle('open');
    }
    
    return (
        <div className='accordion'>
            <BorderTop />
            <div
                className='accordion_title'
                onClick={(e) => handleAccordionClick(e)}>
                {/* to style multi-line title, e.g. for Edition Characteristics */}
                {firstLineOfMultiLineTitle
                && <div> 
                        {firstLineOfMultiLineTitle}
                    </div>
                }
                {title}
            </div>
            <div
                onClick={(e) => handleAccordionClick(e)} 
                className='accordion_toggleArrow'>
            </div>
            <div 
                className='accordionText hidden'>
                {children}
            </div>
        </div>
    )
};

export default Accordion;