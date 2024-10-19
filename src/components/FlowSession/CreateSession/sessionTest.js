import React, { useState, useEffect } from 'react';
import CreateAction from './Task';
import TimeGoalSetting from './TimeGoal';
import ModeSetting from './Mode';
import AnimatedBg from '../../Common/AnimatedBg';
import BPrimary from '../../Common/BPrimary';
import BCircle from '../../Common/BCircle';
import { Trans, useTranslation } from 'react-i18next';
import MExplanation from '../../Common/MExplanation';
import Modal from '../../Common/Modal';

// SVG
import { ReactComponent as IconCorrect } from '../../../assets/Icons/advice-correct.svg';
import { ReactComponent as IconWrong } from '../../../assets/Icons/advice-wrong.svg';

function CreateSession({
    setIsCreation,
    taskList,
    timeGoal,
    setTimeGoal,
    selectedMode,
    setSelectedMode,
    createTask,
    deleteTask,
    updateTask,
    setEndSessionRequest,
    setReturnHome,
}) {
    const { t } = useTranslation();
    const [pageNumber, setPageNumber] = useState(
        () => JSON.parse(localStorage.getItem('pageNumber')) || 0
    );
    const [adviceNumber, setAdviceNumber] = useState(0);

    useEffect(() => {
        localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    }, [pageNumber]);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 400px)').matches;
        if (!isMobile) {
            const interval = setInterval(() => {
                setAdviceNumber((prev) => (prev + 1) % 3);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, []);

    const pages = [
        {
            buttonText: t('flow-session.init-session.create-tasks.button'),
            buttonDisabled: taskList.length === 0
        },
        { buttonText: t('flow-session.init-session.set-time-goal.button') },
        {
            buttonText: t('common.button.start'),
            buttonAction: () => {
                setIsCreation(false);
                setPageNumber(0);
            }
        },
    ];

    return (
        <>
            <AnimatedBg />
            <Modal id="mode-explain" onClose={() => document.getElementById('mode-explain').close()}>
                <MExplanation />
            </Modal>
            <div className="z-[100] flex flex-col w-full h-3/4 justify-evenly items-center overflow-hidden lg:flex-row">
                <div className={`${pageNumber === 0 ? '' : 'hidden'} w-full h-auto center p-8 lg:w-auto lg:h-full`}>
                    {pages[pageNumber].component}
                </div>
                <div className="center w-full h-3/4 center p-8 lg:w-1/2 lg:h-full">
                    {pageNumber === 0 && <CreateAction taskList={taskList} createTask={createTask} deleteTask={deleteTask} />}
                </div>
            </div>
            <NavigationControls
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                taskList={taskList}
                pages={pages}
                setEndSessionRequest={setEndSessionRequest}
                setReturnHome={setReturnHome}
            />
        </>
    );
}

const AdviceSection = ({ adviceNumber }) => {
    const { t } = useTranslation();
    return (
        <div className="hidden lg:mt-4 lg:flex lg:justify-center lg:items-start lg:flex-col lg:w-full lg:h-1/3">
            <div className="flex w-full items-center">
                <IconWrong />
                <p className="flex ml-2 font-corpo font-bold text-rosa">{t(`flow-session.init-session.create-tasks.advice.wrong${adviceNumber}`)}</p>
            </div>
            <div className="flex w-full lg:mt-2 lg:items-center">
                <IconCorrect />
                <p className="w-5/6 text-md flex ml-2 font-corpo text-verde font-bold">{t(`flow-session.init-session.create-tasks.advice.correct${adviceNumber}`)}</p>
            </div>
        </div>
    );
};

const NavigationControls = ({ pageNumber, setPageNumber, taskList, pages, setEndSessionRequest, setReturnHome }) => {
    return (
        <div className="z-[100] w-full h-[12%] center">
            <BCircle
                tooltip="End session"
                iconName={pageNumber === 0 ? 'x' : 'prev'}
                color="secondary"
                operation={() => {
                    if (pageNumber === 0) {
                        setEndSessionRequest(true);
                        setReturnHome(true);
                    } else {
                        setPageNumber((prev) => prev - 1);
                    }
                }}
            />
            <BPrimary
                text={pages[pageNumber].buttonText}
                iconName="next"
                color="ciano"
                disab={pageNumber === 0 && taskList.length === 0}
                operation={() => setPageNumber((prev) => prev + 1)}
            />
        </div>
    );
};

export default CreateSession;