import React from "react";
import { restart } from "../../../utils/utils";
import BCircle from "../../shared/BCircle";
import BStart from "../../shared/BStart";
import PControls from './PControls';
import FControls from "./FControls";
import { useTranslation } from "react-i18next";


function BManager({
    endSession,
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
                {
                    //circle button griglia principale
                    !endSession &&
                    <>
                        <BCircle
                            tooltip={t('flow-session.session.tooltip.end')}
                            iconName={'x'}
                            color={'secondary'}
                            operation={() => { setEndSessionRequest(true); }}
                        />

                        <BCircle
                            color={'neutral'}
                            tooltip={t('flow-session.session.tooltip.settings')}
                            iconName={'settings'}
                            active={modalSetting}
                            operation={() => { setModalSetting(!modalSetting); setModalTask(false); }}
                            activeOperation={() => { setModalSetting(!modalSetting); setModalTask(false); }}
                            disabled={isActive}
                        />

                        <BCircle
                            color={'primary'}
                            tooltip={t('flow-session.session.tooltip.task')}
                            iconName={'task-list'}
                            active={modalTask}
                            operation={() => { setModalTask(!modalTask); setModalSetting(false); }}
                            activeOperation={() => { setModalTask(!modalTask); setModalSetting(false); }}
                        />
                        {
                            selectedMode === 1 &&
                            <BCircle
                                color={'secondary'}
                                tooltip={t('flow-session.session.tooltip.next')}
                                iconName={pomodoroTimer.flow ? 'next' : 'prev-light'}
                                operation={pomodoroTimer.next}
                            />
                        }
                        {
                            selectedMode === 2 &&
                            <BCircle
                                tooltip={t('flow-session.session.tooltip.pause')}
                                iconName={'prev-light'}
                                color={'neutral'}
                                operation={flowmodoroTimer.next}
                                disabled={flowmodoroTimer.flowmoFlow || !isActive}
                            />
                        }
                    </>
                }
            </div>
            {
                endSession ?
                    (
                        <BStart operation={restart} type={2} ></BStart>
                    )
                    :
                    (
                        selectedMode === 1 ?
                            <PControls
                                isActive={isActive}
                                endSession={endSession}
                                pomodoroStart={pomodoroTimer.start}
                                pomodoroPause={pomodoroTimer.pause}
                                next={pomodoroTimer.next}
                            />
                            :
                            <FControls
                                isActive={isActive}
                                flow={flowmodoroTimer.flowmoFlow}
                                flowmodoroStart={flowmodoroTimer.start}
                                flowmodoroBreath={flowmodoroTimer.breath}
                                flowmodoroPause={flowmodoroTimer.pause}
                            />
                    )
            }
        </>
    );
}


export default BManager;