import React from 'react';
import './appText.css'

function ContentBox({
    title,
    body,
    titleClass,
    bodyClass
}) {
    

    return (
        <div className='box-text-container'>
            <p className={titleClass}> {title} </p>
            <span className={bodyClass}> {body} </span>
        </div>
    );
}

export default ContentBox;
