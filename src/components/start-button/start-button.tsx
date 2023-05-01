import React from 'react';
import StartButtonProps from './props';
import './styles.scss';

const StartButton = ({ handleClick }: StartButtonProps) => {
    return (
        <div className='start-button'>
            <button className='button' onClick={ handleClick } />
            <p className='label'>start</p>
        </div>
    )
}

export default StartButton;