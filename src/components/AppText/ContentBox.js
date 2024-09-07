import React from 'react';
import './appText.css'

function ContentBox({
    title,
    body
}) {
    

    return (
        <div className='box-text-container'>
            <p className='titolo-font color-dark-ciano'> {title} </p>
            <span className='font-corpo2 color-dark-ciano'> {body} </span>
        </div>
    );
}

export default ContentBox;
