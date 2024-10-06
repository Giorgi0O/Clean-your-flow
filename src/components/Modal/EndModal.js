import React from 'react';
import Button from '../Buttons/Button'
import { useNavigate } from 'react-router-dom';


function EndModal( { 
    endSessionRequest,
    setEndSessionRequest,
    setEndSession,
    returnHome
}) {

    const navigator = useNavigate();

    const restartReturnHome = () => {
        localStorage.clear();
        navigator('/');
    }
    
    return (
        <div className={`${endSessionRequest ? 'center w-screen h-screen z-[110] fixed bg-opacity-50 bg-black' : 'hidden'}`} style={{ display: `${endSessionRequest ? '' : 'none'}`}} >

            <div className='card bg-base-100 center  w-[350px] overflow-hidden center  p-8 z-[101]'>
                <button onClick={() => setEndSessionRequest(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <p className='font-corpo my-2 font-bold text-center text-rosa-dark  text-lg'> Are you sure you want to end the session ? </p>

                <div className='center'>
                    {
                        returnHome ?
                            <Button 
                                text={'End session'} 
                                iconName={'x-circle'} 
                                color={'secondary'} 
                                fixedWidth={50} 
                                operation={restartReturnHome}
                            ></Button>
                        :
                            <Button 
                                text={'End session'} 
                                iconName={'x-circle'} 
                                color={'secondary'} 
                                fixedWidth={50} 
                                operation={() =>{ setEndSession(true); setEndSessionRequest(false); }}
                            ></Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default EndModal;
