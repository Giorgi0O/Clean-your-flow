import React from 'react';
import { useTranslation } from 'react-i18next';

//Icons
import {ReactComponent as IconStart} from '../../assets/Icons/play.svg'
import {ReactComponent as IconRestart} from '../../assets/Icons/refresh.svg'

function BStart({ operation, type }) {

    const {t}= useTranslation();

    const start = t('common.button.start');
    const restart = t('common.button.restart');

    return (
        <button className={`btn w-52 m-4 border-ciano-dark  ${type === 1 || type === 2 ? 'bg-ciano-light hover:bg-ciano-light hover:border-ciano-light' : 'bg-verde-light hover:bg-verde-light hover:border-verde-light'}`} onClick={operation}>
            {
                (type === 1 || type === 3) &&
                (
                    <IconStart className={`${type === 1 ? 'stroke-ciano-dark' : 'stroke-verde-dark' }`}></IconStart>
                )
            }
            {
                type === 2 &&
                (
                    <IconRestart></IconRestart>
                )
            }
            <span className={`font-titolo text-2xl ${type === 1 || type === 2 ? 'text-ciano-dark' : 'text-verde-dark'}`}> { type === 1 || type === 3 ? start : ''} { type === 2 ? restart : ''} </span>
        </button>
    );
}


export default BStart