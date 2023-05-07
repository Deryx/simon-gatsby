import React, { forwardRef } from 'react';
import SimonButtonProps from './props';
import './styles.scss';


const SimonButton = ({ buttonId, buttonClass, handleClick }: SimonButtonProps, _ref: any ) => {
    return (
        <div id={ `simonButton-${buttonId}` } className={ `button--${buttonClass}` } onClick={ handleClick }>
            <audio />
        </div>
    )
}

export default SimonButton;