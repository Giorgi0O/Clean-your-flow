import React, {useState} from "react";
import './Switch.css'

function Switch({selectedMode, setSelectedMode }){


    const handleRadioChange = (value) => {
      setSelectedMode(value);
    };

    return (
        <div className='radio-inputs'>
            <label className={`radio bg-pomodoro ${selectedMode === 'pomodoro' ? 'bg-pomodoro-active' : ' '}`}>
                <input 
                    type="radio"
                    name="radio"
                    value='pomodoro'
                    checked={selectedMode === 'pomodoro'}
                    onChange={() => handleRadioChange('pomodoro')} 
                />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_38_617)">
                        <path d="M17.9763 3.91217L17.5244 4.10185C16.8312 4.39195 16.4212 4.76991 16.0683 5.15206C16.3919 5.30269 16.7029 5.49516 16.9986 5.72528C17.6583 6.26224 18.1032 6.84244 18.4519 7.61231L18.9763 8.76294L17.7211 8.60813C16.8215 8.49934 16.219 8.70018 15.6346 8.89404C15.3961 8.97493 15.152 9.05582 14.8968 9.11161C14.9135 9.21761 14.9261 9.325 14.9344 9.431C14.9902 10.067 14.9052 10.7127 14.6848 11.3501C14.3905 12.1493 13.9888 12.7574 13.3738 13.3376L12.9596 13.7267L12.4895 13.4087C11.7908 12.9331 11.2957 12.3961 10.8842 11.6667C10.6095 11.1535 10.4324 10.629 10.357 10.0907C10.0697 10.1409 9.78522 10.1507 9.50628 10.1618C8.89261 10.1855 8.25662 10.2092 7.45467 10.6304L6.33473 11.2204L6.41702 9.9582C6.47141 9.1158 6.68201 8.41705 7.10321 7.69181C7.35844 7.27061 7.6583 6.9052 8.00418 6.59836C7.92469 6.52863 7.84658 6.4561 7.76987 6.38497C7.31799 5.96796 6.85077 5.5356 5.98466 5.26642L4.77545 4.88986L5.51604 4.23853C1.33473 5.49794 0 9.17577 0 13.3041C0 19.0865 5.37239 23.7741 12 23.7741C18.6262 23.7741 24 19.0865 24 13.3041C24 9.04188 22.4616 4.99306 17.9763 3.91217Z" fill="#0D5355"/>
                        <path d="M8.83264 6.82428C8.39331 7.12972 8.01674 7.5286 7.71409 8.0293C7.41702 8.53976 7.17713 9.13111 7.12274 9.98467C8.89819 9.05161 10.0042 9.76989 11.0405 9.05859C11.0181 9.28174 11.0126 9.5021 11.0321 9.72386C11.0697 10.258 11.2232 10.7838 11.5007 11.2999C11.7908 11.8145 12.1771 12.3208 12.887 12.802C13.5091 12.2148 13.8103 11.6527 14.0153 11.0976C14.2078 10.5453 14.2762 10.0028 14.2273 9.46863C14.1981 9.12135 14.1186 8.77825 13.9944 8.43934C15.1172 8.60113 15.9149 7.65413 17.8061 7.88704C17.4519 7.1074 17.0181 6.63878 16.5607 6.2664C16.1004 5.90517 15.6081 5.66668 15.0879 5.53697C14.9805 5.50908 14.8745 5.48955 14.7643 5.47281C15.4198 4.9233 15.841 4.02093 17.2511 3.43237C16.5551 2.93167 15.9456 2.7392 15.364 2.64436C14.7838 2.55929 14.2385 2.59555 13.7225 2.74199C13.2064 2.88425 12.7183 3.1339 12.2636 3.5035C12.0893 3.65134 11.9205 3.82149 11.7573 4.00838C11.1311 1.98467 10.3919 0.369606 10.325 0.225952L9.84101 0.450499C9.85635 0.485366 10.629 2.16737 11.2678 4.24966C11.2343 4.21898 11.1981 4.18969 11.1618 4.16459C10.675 3.83962 10.166 3.63739 9.63738 3.54534C9.11158 3.4505 8.56207 3.46584 7.99443 3.60531C7.42399 3.75733 6.83683 4.00559 6.19247 4.57044C7.90098 5.10182 8.30545 6.18411 9.24687 6.57463C9.10461 6.65134 8.96514 6.73223 8.83264 6.82428ZM12.3835 5.79359C12.3905 5.79359 12.3975 5.79778 12.4031 5.79917C12.378 5.81033 12.3515 5.82428 12.3264 5.83683C12.3445 5.82288 12.364 5.80894 12.3835 5.79359Z" fill="#0D5355"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_38_617">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>

            </label>
            <label className={`radio bg-pomodoro ${selectedMode === 'flowmodoro' ? 'bg-flowmodoro-active' : ''}`}>
                <input 
                    type="radio"
                    name="radio"
                    value='flowmodoro'
                    checked={selectedMode === 'flowmodoro'}
                    onChange={() => handleRadioChange('flowmodoro')} 
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_38_592)">
                        <path d="M11.9996 14.9995C13.6565 14.9995 14.9996 13.6564 14.9996 11.9995C14.9996 10.3427 13.6565 8.99951 11.9996 8.99951C10.3428 8.99951 8.99963 10.3427 8.99963 11.9995C8.99963 13.6564 10.3428 14.9995 11.9996 14.9995Z" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 9C13 9 14 7 14 5C14 3 12 1 12 1C12 1 10 3 10 5C10 7 11 9 11 9" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 11C9 11 7 10 5 10C3 10 1 12 1 12C1 12 3 14 5 14C7 14 9 13 9 13" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 15C13 15 14 17 14 19C14 21 12 23 12 23C12 23 10 21 10 19C10 17 11 15 11 15" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15 11C15 11 17 10 19 10C21 10 23 12 23 12C23 12 21 14 19 14C17 14 15 13 15 13" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.5858 9.17179C10.5858 9.17179 9.87868 7.05047 8.46447 5.63626C7.05026 4.22205 4.22183 4.22205 4.22183 4.22205C4.22183 4.22205 4.22183 7.05047 5.63604 8.46469C7.05026 9.8789 9.17158 10.586 9.17158 10.586" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.17152 13.4142C9.17152 13.4142 7.0502 14.1213 5.63599 15.5355C4.22177 16.9497 4.22177 19.7782 4.22177 19.7782C4.22177 19.7782 7.0502 19.7782 8.46441 18.364C9.87863 16.9497 10.5857 14.8284 10.5857 14.8284" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.8285 13.4142C14.8285 13.4142 16.9498 14.1213 18.364 15.5355C19.7782 16.9497 19.7782 19.7782 19.7782 19.7782C19.7782 19.7782 16.9498 19.7782 15.5356 18.364C14.1214 16.9497 13.4143 14.8284 13.4143 14.8284" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.4142 9.17179C13.4142 9.17179 14.1213 7.05047 15.5355 5.63626C16.9497 4.22205 19.7782 4.22205 19.7782 4.22205C19.7782 4.22205 19.7782 7.05047 18.364 8.46469C16.9497 9.8789 14.8284 10.586 14.8284 10.586" stroke="#C1DEBA" stroke-opacity="0.4" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_38_592">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </label>
        </div>
    );
};

export default Switch;
