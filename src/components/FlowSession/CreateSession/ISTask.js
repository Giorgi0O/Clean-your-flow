import React, { useState, useEffect } from "react";
import CircleButton from '../../Common/BCircle'
import Tasks from "../../Common/TaskList";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

//icon
import {ReactComponent as IconCorrect } from '../../../assets/Icons/advice-correct.svg';
import {ReactComponent as IconWrong } from '../../../assets/Icons/advice-wrong.svg';
import useTaskList from "../../../hooks/useTaskList";

function ISTask({
    taskList,
    setTaskList
}){

    return(
        <>
            <div className={`
                w-full h-auto center p-8
                lg:w-auto lg:h-full
            `}>
                <CardAdvice />
            </div>
            <div className='
                center w-full h-3/4 center p-8
                lg:w-1/2 lg:h-full
            '>
                <CreateTask taskList={taskList} setTaskList={setTaskList} />
            </div>
        </>
    );
}

function CardAdvice(){

    const {t} = useTranslation();
    const [adviceNumber, setAdviceNumber] = useState(0);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width:400px)").matches;
        const interval = setInterval(() => {
            if( !isMobile ){
                setAdviceNumber((prevNumber) => (prevNumber + 1) % 3);
            }
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);

    return(
        <div className='card-mirror center flex-col items-start w-[390px] h-auto lg:h-[400px] rounded-md p-8 lg:p-6'>
            <p className='font-titolo text-2xl text-ciano-dark font-bold  text-center lg:text-start'>
                <Trans i18nKey={'flow-session.init-session.create-tasks.title'}>
                    Elenca i <span className='underline-wave decoration-ciano'>task</span> della sessione
                </Trans>
            </p>
            <p className='hidden mt-2 lg:block lg:font-bold md:text-start md:font-corpo md:text-ciano'>
                    {t('flow-session.init-session.create-tasks.body1')}
            </p>
            <div className='hidden lg:mt-4 lg:flex lg:justify-center lg:items-start lg:flex-col lg:w-full lg:h-1/3'>
                <div className='flex w-fullitems-center'>
                    <IconWrong/>
                    <p className='flex ml-2 font-corpo font-bold text-rosa'>
                        {t(`flow-session.init-session.create-tasks.advice.wrong${adviceNumber}`)}
                    </p>
                </div>

                <div className='flex w-full lg:mt-2 lg:items-center '>
                    <IconCorrect/>
                    <p className='w-5/6 text-md flex ml-2 font-corpo text-verde font-bold '>
                        {t(`flow-session.init-session.create-tasks.advice.correct${adviceNumber}`)}
                    </p>
                </div>
            </div>
            <p className='hidden lg:inline lg: mt-4 lg:text-ciano lg:text-sm'>
                {t('flow-session.init-session.create-tasks.footer')}
            </p>
        </div>
    );
}

function CreateTask({
    taskList,
    setTaskList
})
{
    const {t} = useTranslation();
    const [tempValue , setTempValue] = useState('');
    const {createT} = useTaskList(setTaskList);

    const handleTempSave = (event) =>{
        const value = event.target.value;
        if (value.trim) { 
            setTempValue(value);
        }
    }

    const handleSave = () => {
        if (tempValue) { 
            createT(tempValue);
            setTempValue('');
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave(event);
        }
    };

    return(
        <div className='card center w-full h-full flex items-center'>
            <div className='flex justify-evenly items-center m-4 w-5/6'>
                <input
                    id="creator"
                    className=' w-5/6 h-[45px] rounded-full border-2 px-3 border-ciano text-ciano-dark font-corpo'
                    value={tempValue}
                    onChange={handleTempSave}
                    onKeyDown={handleKeyPress} 
                    placeholder={t('flow-session.init-session.create-tasks.input')}
                />
                <CircleButton
                    iconName={'plus'}
                    color={'primary'}
                    tooltip={'add task'}
                    operation={handleSave}
                />
            </div>
            <div className={`${ taskList.length > 0 ? 'w-5/6 p-2 h-3/4 overflow-y-auto' :'hidden' }`}>
                {
                    taskList.length > 0 &&
                    (
                        <Tasks
                            taskList={taskList}
                            setTaskList={setTaskList}
                            isEditable={false}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default ISTask;