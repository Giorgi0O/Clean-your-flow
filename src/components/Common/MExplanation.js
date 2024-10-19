import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import TabControlsTitle from './TabControlsTitle';

//icone
import {ReactComponent as PomodoroExplain} from '../../assets/Icons/pomodoro-explain.svg'; 
import {ReactComponent as FlwomodoroExplain} from '../../assets/Icons/flowmodoro-explain.svg'; 

function MExplanation() {

    const { t } = useTranslation();
    const [mode, setMode] = useState('Pomodoro'); // 0 - pomodoro | 1 - flowmodoro 

    return (
        <div className='overflow-hidden'>

            <TabControlsTitle tab1={'Pomodoro'} tab2={'Flowmodoro'} active={mode} setActive={setMode}></TabControlsTitle>
            {
                mode === 'pomodoro' ?
                <div className='center flex-col p-8 '>
                    <div className='w-[150px] h-[150px] m-4 center rounded-full bg-ciano border-2 border-ciano-dark p-4'>
                        <PomodoroExplain></PomodoroExplain>
                    </div>
                    <ul className='text-center list-decimal p-4 text-ciano-dark'>
                        <li> {t('common.mode-explain.pomodoro.step1')} </li>
                        <li> {t('common.mode-explain.pomodoro.step2')} </li>
                        <li> {t('common.mode-explain.pomodoro.step3')} </li>
                        <li> {t('common.mode-explain.pomodoro.step4')} </li>
                    </ul>

                </div>
                :
                <div className='center flex-col justify-between p-8 '>
                    <div className=' w-[150px] h-[150px] m-4 center rounded-full bg-verde border-2 border-verde-dark p-4'>
                        <FlwomodoroExplain/>
                    </div>
                    <ul className='text-center list-decimal p-4 text-verde-dark'>
                        <li> {t('common.mode-explain.flowmodoro.step1')} </li>
                        <li> {t('common.mode-explain.flowmodoro.step2')} </li>
                        <li> {t('common.mode-explain.flowmodoro.step3')} </li>
                        <li> {t('common.mode-explain.flowmodoro.step4')} </li>
                    </ul>
                </div>
            }
            
        </div>
    );
}

export default MExplanation;
