import ReactMarkdown from 'react-markdown';

const NewsElement = ({ newsElement }) => {
  return (
    <>
      {newsElement.visibility && (
        <div className="newsElementContainer noselect">
          <div className="newsElement">
            <div className="newsTextContainer">
              <div>
                <ReactMarkdown>{newsElement.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsElement;
