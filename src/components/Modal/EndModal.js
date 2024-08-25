import './Modal.css';
import React from 'react';
import Button from '../Buttons/Button'


function EndModal( { 
    endSessionRequest,
    setEndSessionRequest,
    setEndSession
}) {
    return (
        <div className='bg-end-request' style={{ display: `${endSessionRequest ? '' : 'none'}`}} >
            <div className='end-card'>
                <p className='default-font'> Are you sure you want to end the session ? </p>

                <div className='end-button'>
                    <Button 
                        text={'Continue'}
                        iconName={'play-end'} 
                        color={'ciano'} 
                        operation={() => setEndSessionRequest(false)} 
                        fixedWidth={50}></Button>
                    <Button text={'End'} iconName={'x-circle'} color={'pink'} fixedWidth={50} operation={() =>{ setEndSession(true); setEndSessionRequest(false); }}></Button>
                </div>
            </div>
        </div>
    );
}

export default EndModal;
