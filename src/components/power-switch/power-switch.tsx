import React from 'react';
import PowerSwitchProps from './props';
import './styles.scss';

const PowerSwitch = ({ handleClick }: PowerSwitchProps) => {
    return (
        <>
            <div className='off'>off</div>
            <div className='power-switch'>
                <div className='button' onClick={ handleClick } />
            </div>
            <div className='on'>on</div>
        </>
    )
}

export default PowerSwitch;