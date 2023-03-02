import { nanoid } from 'nanoid';

import BorderTop from'../../../Blocks/Border/BorderTop';
import Block from'../../../Blocks/Block';

const ContentBlockReferences = ({ referencesGroupedByYears }) => {
    return (
        <div key={nanoid()}>
            {referencesGroupedByYears.map(( referencesGroupedByYear ) => (
                <div key={referencesGroupedByYear.year}>
                    <BorderTop />
                    <div className='block_reference_year'>
                        {referencesGroupedByYear.year}
                    </div>
                    {referencesGroupedByYear.record.map((reference) => (
                        <Block 
                            key={reference.id}
                            blockType={'text-blocks.reference'}
                            content={reference} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ContentBlockReferences;