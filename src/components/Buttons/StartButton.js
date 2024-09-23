import React from 'react';

function StartButton({ operation, type }) {


    return (
        <button className={`btn w-52 m-4 border-ciano-dark  ${type === 1 || type === 2 ? 'bg-ciano-light hover:bg-ciano-light hover:border-ciano-light' : 'bg-verde-light hover:bg-verde-light hover:border-verde-light'}`} onClick={operation}>
            {
                (type === 1 || type === 3) &&
                (
                    <svg 
                        width="28"
                        height="28"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            className={`${type === 1 ? 'stroke-ciano-dark' : 'stroke-verde-dark' }`}
                            d="M16 29.3334C23.3638 29.3334 29.3333 23.3638 29.3333 16C29.3333 8.63622 23.3638 2.66669 16 2.66669C8.63621 2.66669 2.66667 8.63622 2.66667 16C2.66667 23.3638 8.63621 29.3334 16 29.3334Z"
                            stroke="#0D5355"
                            strokeWidth="2px"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path 
                            className={`${type === 1 ? 'stroke-ciano-dark' : 'stroke-verde-dark' }`}
                            d="M13.3333 10.6667L21.3333 16L13.3333 21.3334V10.6667Z"
                            stroke="#0D5355"
                            strokeWidth="2px"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )
            }
            {
                type === 2 &&
                (
                    <svg 
                        width="28" 
                        height="28"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect 
                            x="0.5" 
                            y="0.5" 
                            width="27"
                            height="27"
                            rx="13.5"
                            stroke="#0D5355"
                            strokeWidth="1.5px"
                        />
                        <path
                            d="M5.75 8V12.5M5.75 12.5H10.25M5.75 12.5L9.23 9.23C10.0361 8.42353 11.0333 7.8344 12.1286 7.51758C13.2239 7.20075 14.3817 7.16656 15.4938 7.41819C16.6059 7.66982 17.6361 8.19907 18.4884 8.95656C19.3407 9.71405 19.9871 10.6751 20.3675 11.75M22.25 20V15.5M22.25 15.5H17.75M22.25 15.5L18.77 18.77C17.9639 19.5765 16.9667 20.1656 15.8714 20.4824C14.7761 20.7992 13.6183 20.8334 12.5062 20.5818C11.3941 20.3302 10.3639 19.8009 9.5116 19.0434C8.65935 18.2859 8.01288 17.3249 7.6325 16.25"
                            stroke="#0D5355"
                            strokeWidth="1.5px"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                )
            }
            <span className={`font-titolo text-2xl ${type === 1 || type === 2 ? 'text-ciano-dark' : 'text-verde-dark'}`}> { type === 1 || type === 3 ? "Start" : ''} { type === 2 ? "Restart" : ''} </span>
        </button>
    );
}


export default StartButton