import React from 'react';
import StrictButtonProps from './props';
import './styles.scss';

const StrictButton = ({ handleClick }: StrictButtonProps ) => {
    return (
        <div className='strict'>
            <div className='indicator' />
            <button className='button' onClick={ handleClick } />
            <p className='label'>strict</p>
        </div>
    )
}

export default StrictButton;