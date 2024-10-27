import React from 'react';
import BPrimary from './BPrimary'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconXcircle } from '../../assets/Icons/x-circle.svg';


function MEnd({
    endSessionRequest,
    setEndSessionRequest,
    setEndSession,
    returnHome
}) {

    const { t } = useTranslation();
    const navigator = useNavigate();

    const terminate = () => {
        if (returnHome) {
            restartReturnHome();
        }
        else {
            setEndSession(true);
            setEndSessionRequest(false);
        }
    }

    const restartReturnHome = () => {
        localStorage.clear();
        navigator('/');
    }

    return (
        <div className={`${endSessionRequest ? 'center w-screen h-screen z-[110] fixed bg-opacity-50 bg-black' : 'hidden'}`} style={{ display: `${endSessionRequest ? '' : 'none'}` }} >

            <div className='card bg-base-100 center  w-[350px] overflow-hidden center  p-8 z-[101]'>
                <button onClick={() => setEndSessionRequest(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <p className='font-corpo my-2 font-bold text-center text-rosa-dark  text-lg'> {t('flow-session.end-session.body')} </p>

                <div className='center'>
                    <BPrimary
                        text={t('common.button.end-session')}
                        color={'secondary'}
                        fixedWidth={50}
                        operation={terminate}
                    >
                        <IconXcircle className='icon-primary stroke-[1px] stroke-rosa-dark'></IconXcircle>
                    </BPrimary>
                </div>
            </div>
        </div>
    );
}

export default MEnd;
