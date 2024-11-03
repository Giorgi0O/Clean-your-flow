import React from 'react';
import BPrimary from './BPrimary'
import { useTranslation, Trans } from 'react-i18next';
import { ReactComponent as IconTCompleted } from '../../assets/Icons/task_modal_icon.svg'


function MEndTaskCompleted({
    endTaskCompletedRequest,
    setEndTaskCompletedRequest,
    setEndSession
}) {

    const { t } = useTranslation();

    const terminate = () => {
        setEndSession(true);
        setEndTaskCompletedRequest(false);
    }

    return (
        <div className={`${endTaskCompletedRequest ? 'center w-screen h-screen z-[110] fixed bg-opacity-50 bg-black p-8' : 'hidden'}`} style={{ display: `${endTaskCompletedRequest ? '' : 'none'}` }} >

            <div className='card card-mirror-ciano bg-base-100/70 w-[350px] h-auto overflow-hidden p-8 z-[101]'>
                <button onClick={() => setEndTaskCompletedRequest(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <div className='center flex-col'>
                    <IconTCompleted className='m-4' />
                    <p className='font-corpo my-2 font-bold text-center text-ciano-dark  text-lg'>
                        <Trans i18nKey={'flow-session.end-session.body-task-completed'}>
                            Hai raggiunto i tuoi obiettivi. <br /> Vuoi terminare la sessione ?
                        </Trans>
                    </p>
                </div>

                <div className='center'>
                    <BPrimary
                        text={t('common.button.end-session')}
                        color={'primary'}
                        fixedWidth={50}
                        operation={terminate}
                    >
                        {/* <IconXcircle className='icon-primary stroke-[1px] stroke-ciano-dark'></IconXcircle> */}
                    </BPrimary>
                </div>
            </div>
        </div>
    );
}

export default MEndTaskCompleted;
