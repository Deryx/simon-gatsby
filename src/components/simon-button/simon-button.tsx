import React, { forwardRef } from 'react';
import SimonButtonProps from './props';
import './styles.scss';


const SimonButton = forwardRef(({ buttonId, buttonClass, handleClick }: SimonButtonProps, _ref: any ) => {
    return (
        <div ref={ _ref } id={ `simonButton-${buttonId}` } className={ `button--${buttonClass}` } onClick={ handleClick }>
            <audio />
        </div>
    )
})

export default SimonButton;