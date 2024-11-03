import React from "react";
import { Trans } from "react-i18next";
import MExplanation from '../../shared/MExplanation';
import Modal from '../../shared/Modal'
import { ReactComponent as IconPomodoro } from '../../../assets/Icons/pomodoro.svg'
import { ReactComponent as IconFlowmodoro } from '../../../assets/Icons/flowmodoro.svg'

function ISMode({
    selectedMode,
    setSelectedMode,
}) {

    return (
        <>
            <Modal id="ISmode-explain" onClose={() => document.getElementById('ISmode-explain').close()}>
                <MExplanation />
            </Modal>

            <div className='
                center w-full h-3/4 center p-8
                lg:w-1/2 lg:h-full
            '>
                <div className={`w-full h-full ${selectedMode === 1 ? 'card-mirror-ciano' : 'card-mirror-verde'} rounded-lg center flex-col`}>
                    <h1 className={`font-titolo font-bold text-2xl m-8 ${selectedMode === 1 ? 'text-ciano-dark' : 'text-verde-dark'} text-center text-ciano-dark`}>
                        <Trans i18nKey={'flow-session.init-session.set-mode.title'}>
                            Quanto <span className='underline-wave decoration-verde'>tempo</span> vuoi dedidicare <br /> alla sessione ?
                        </Trans>
                    </h1>
                    <p className={`font-corpo text-md ${selectedMode === 1 ? 'text-ciano' : 'text-verde'}`}>
                        <Trans i18nKey={'flow-session.init-session.set-mode.body'}>
                            Se non conosci la differenza <button onClick={() => document.getElementById('ISmode-explain').showModal()} className={`font-bold ${selectedMode === 1 ? 'text-ciano' : 'text-verde'} hover:underline`}>clicca quì</button>
                        </Trans>
                    </p>
                    <ModeSetting selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
                </div>
            </div>
        </>
    );
}

function ModeSetting({
    selectedMode,
    setSelectedMode,
}) {

    const handleRadioChange = (value) => {
        setSelectedMode(value);
    }

    return (
        <div className='m-8 flex justify-evenly items-center w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label className={`p-10 md:p-14 mb-2 rounded-full flex items-center border-[1px] border-ciano-dark ${selectedMode === 1 ? 'bg-ciano' : 'bg-ciano-opacity'}`} >
                    <ModeInput value={'pomodoro'} selectedMode={selectedMode} mode={1} handleRadioChange={handleRadioChange} />
                    <IconPomodoro className="w-[32px] h-[32px] md:w-[54px] md:h-[54px]"></IconPomodoro>

                </label>
                <span className={`font-corpo ${selectedMode === 1 ? 'text-ciano-dark' : 'text-ciano-light'}`} > Pomodoro </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label className={`p-10 md:p-14 mb-2 rounded-full flex items-center  border-[1px] border-verde-dark  ${selectedMode === 2 ? 'bg-verde' : 'bg-verde-opacity'}`}>
                    <ModeInput value={'flowmodoro'} selectedMode={selectedMode} mode={2} handleRadioChange={handleRadioChange} />
                    <IconFlowmodoro className="w-[32px] h-[32px] md:w-[54px] md:h-[54px]"></IconFlowmodoro>

                </label>
                <span className={`font-corpo ${selectedMode === 2 ? 'text-verde-dark' : 'text-verde-light'}`} > Flowmodoro </span>
            </div>
        </div>
    );
}

function ModeInput({ value, selectedMode, mode, handleRadioChange }) {
    return (
        <input
            className="hidden "
            type="radio"
            name="radio"
            value={value}
            checked={selectedMode === mode}
            onChange={() => handleRadioChange(mode)}
        />
    );
}

export default ISMode