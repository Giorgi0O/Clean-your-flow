import React from 'react';
import BPrimary from './BPrimary'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clearLocalStorage } from '../../utils/utils';


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
            clearLocalStorage();
            navigator('/');
        }
        else {
            setEndSession(true);
            setEndSessionRequest(false);
        }
    }

    return (
        <div className={`${endSessionRequest ? 'center w-screen h-screen z-[110] fixed bg-opacity-50 bg-black p-8' : 'hidden'}`} style={{ display: `${endSessionRequest ? '' : 'none'}` }} >
            <div className='card card-mirror-rosa bg-base-100/70 h-auto center w-[350px] overflow-hidden p-8 z-[101]'>
                <button onClick={() => setEndSessionRequest(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <p className='font-corpo my-2 font-bold text-center text-rosa-dark  text-lg'> {t('flow-session.end-session.body-end')} </p>

                <div className='center'>
                    <BPrimary
                        text={t('common.button.end-session')}
                        color={'secondary'}
                        fixedWidth={50}
                        operation={terminate}
                    >
                        {/* <IconXcircle className='icon-primary stroke-[1px] stroke-rosa-dark'></IconXcircle> */}
                    </BPrimary>
                </div>
            </div>
        </div>
    );
}

export default MEnd;
