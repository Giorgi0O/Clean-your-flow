import React from "react";



function DropDownMenu({children}) 
{

    return (
        <div className="dropdown dropdown-hover dropdown-left">
            <div tabIndex="0" role="button" className="bg-none border-none m-1 rotate-90"> ...</div>
            <ul tabIndex="0" className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li> 
                    {children}
                </li>
            </ul>
        </div>
    );
}

export default DropDownMenu;