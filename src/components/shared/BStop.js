import React from 'react';
import { useTranslation } from 'react-i18next';

//Icons
import {ReactComponent as IconStop} from '../../assets/Icons/pause.svg'

function BStop({operation, type}) {

    const {t} = useTranslation();

    const breath = t('common.button.breath')
    const stop = t('common.button.stop')

    return (
        <button className={`btn w-52 m-4 border-rosa-dark hover:bg-rosa-light hover:border-rosa-light btn-secondary bg-stop`} onClick={operation}>
            <IconStop className='icon-start-stop stroke-rosa-dark'></IconStop>

            <span className='font-titolo text-2xl text-rosa-dark font-bold'>{type === 2 ? breath : stop }</span>
        </button>
    );
}


export default BStop