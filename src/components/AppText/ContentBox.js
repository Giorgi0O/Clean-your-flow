import React from 'react';

function ContentBox({
    title,
    body,
    titleClass,
    bodyClass
}) {
    

    return (
        <div className='w-5/6 h-1/2 flex flex-col justify-center'>
            <p className={titleClass}> {title} </p>
            <span className={`${bodyClass}`}> {body} </span>
        </div>
    );
}

export default ContentBox;
