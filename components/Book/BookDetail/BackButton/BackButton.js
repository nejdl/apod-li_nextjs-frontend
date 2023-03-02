import BorderTop from '../../../Blocks/Border/BorderTop';

const BackButton = () => {
    return (
            <div className='backButton_container'>
                {/* <BorderTop /> */}
                <div className='backButton border'>
                    <a href='/'>
                        <div>Back to library</div>
                        <div className='backButton_arrow'></div>
                    </a>
                </div>
            </div>
    )
}

export default BackButton;
