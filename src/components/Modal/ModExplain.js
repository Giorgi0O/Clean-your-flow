import React, { useState } from 'react';
import {ReactComponent as PomodoroExplain} from '../../assets/Icons/pomodoro-explain.svg'; 
import {ReactComponent as FlwomodoroExplain} from '../../assets/Icons/flowmodoro-explain.svg'; 
import DivisorVertical from '../Divisor/DivisorVertical';
import { useTranslation } from 'react-i18next';


function ModeExplain() {

    const { t } = useTranslation();
    const [mode, setMode] = useState(0); // 0 - pomodoro | 1 - flowmodoro 

    return (
        <div className='overflow-hidden'>

            <div className='center justify-between'>
                <button onClick={() => {setMode(0)}} >
                    <h1 className={`font-titolo text-2xl lg:text-4xl text-start ${mode === 0 ? 'text-ciano-dark underline decoration-wavy decoration-ciano': 'text-ciano-light'}`}> 
                        Pomodoro 
                    </h1>
                </button>

                <div className='w-[5px] h-[50px] '> 
                    <DivisorVertical/>
                </div>

                <button onClick={() => {setMode(1)}}>
                    <h1 className={`font-titolo text-2xl lg:text-4xl text-start ${mode === 1 ? 'text-verde-dark underline decoration-wavy decoration-verde': 'text-verde-light'}`}> 
                        Flowmodoro 
                    </h1>
                </button>
            </div>

            {
                mode === 0 ?
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

export default ModeExplain;
