import React from "react";
import BCircle from "../../shared/BCircle";
import PControls from './PControls';
import FControls from "./FControls";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconX } from '../../../assets/Icons/x.svg';
import { ReactComponent as IconSettings } from '../../../assets/Icons/settings.svg';
import { ReactComponent as IconTaskList } from '../../../assets/Icons/task-list.svg';
import { ReactComponent as IconNext } from '../../../assets/Icons/next.svg';
import { ReactComponent as IconPrev } from '../../../assets/Icons/prev.svg';


function BManager({
    isActive,
    selectedMode,
    setEndSessionRequest,
    modalSetting,
    setModalSetting,
    modalTask,
    setModalTask,
    pomodoroTimer,
    flowmodoroTimer
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className='w-full center '>
                <>
                    <BCircle
                        tooltip={t('flow-session.session.tooltip.end')}
                        color={'secondary'}
                        operation={() => { setEndSessionRequest(true); }}
                    >
                        <IconX className="icon-standard stroke-rosa-dark"></IconX>
                    </BCircle>

                    <BCircle
                        color={'neutral'}
                        tooltip={t('flow-session.session.tooltip.settings')}
                        active={modalSetting}
                        operation={() => { setModalSetting(!modalSetting); setModalTask(false); }}
                        activeOperation={() => { setModalSetting(!modalSetting); setModalTask(false); }}
                        disabled={isActive}
                    >
                        <IconSettings className={`icon-standard ${isActive ? 'stroke-gray-400' : 'stroke-verde-dark'}`}></IconSettings>
                    </BCircle>

                    <BCircle
                        color={'primary'}
                        tooltip={t('flow-session.session.tooltip.task')}
                        active={modalTask}
                        operation={() => { setModalTask(!modalTask); setModalSetting(false); }}
                        activeOperation={() => { setModalTask(!modalTask); setModalSetting(false); }}
                    >
                        <IconTaskList className="icon-standard stroke-ciano-dark"></IconTaskList>
                    </BCircle>
                    {
                        selectedMode === 1 &&
                        <BCircle
                            color={'secondary'}
                            tooltip={t('flow-session.session.tooltip.next')}
                            iconName={'next'}
                            operation={pomodoroTimer.next}
                        >
                            {
                                pomodoroTimer.flow ?
                                    <IconNext className="icon-standard stroke-rosa-dark"></IconNext>
                                    :
                                    <IconPrev className="icon-standard stroke-rosa-dark"></IconPrev>
                            }
                        </BCircle>
                    }
                    {
                        selectedMode === 2 &&
                        <BCircle
                            tooltip={t('flow-session.session.tooltip.pause')}
                            color={'neutral'}
                            operation={flowmodoroTimer.next}
                            disabled={flowmodoroTimer.flow || !isActive}
                        >
                            <IconPrev className={`icon-standard ${flowmodoroTimer.flow || !isActive ? 'stroke-gray-400' : 'stroke-verde-dark'}`}></IconPrev>
                        </BCircle>
                    }
                </>
            </div>
            {
                selectedMode === 1 ?
                    <PControls
                        isActive={isActive}
                        pomodoroStart={pomodoroTimer.start}
                        pomodoroPause={pomodoroTimer.pause}
                    />
                    :
                    <FControls
                        isActive={isActive}
                        flow={flowmodoroTimer.flow}
                        flowmodoroStart={flowmodoroTimer.start}
                        flowmodoroBreath={flowmodoroTimer.breath}
                    />
            }
        </>
    );
}


export default BManager;