import React from "react";
import DividerV from "./DividerV";


function TabControlsTitle ( {tab1, tab2, active, setActive}) {


    return(

        <div className='center justify-between'>
            <button onClick={() => {setActive(tab1)}} >
                <h1 className={`font-titolo text-2xl lg:text-4xl text-start ${active === tab1 ? 'text-ciano-dark underline decoration-wavy decoration-ciano': 'text-ciano-light'}`}> 
                    {tab1} 
                </h1>
            </button>

            <div className='w-[5px] h-[50px] '> 
                <DividerV/>
            </div>

            <button onClick={() => {setActive(tab2)}}>
                <h1 className={`font-titolo text-2xl lg:text-4xl text-start ${active === tab2 ? 'text-verde-dark underline decoration-wavy decoration-verde': 'text-verde-light'}`}> 
                    {tab2} 
                </h1>
            </button>
        </div>
    );
}


export default TabControlsTitle