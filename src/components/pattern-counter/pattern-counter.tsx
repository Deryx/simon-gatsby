import React, { forwardRef } from 'react';
import PatternCounterProps from './props';
import './styles.scss';

const PatternCounter = ( { counter }: PatternCounterProps, _ref: any ) => {
    return (
        <div className='counter'>
            <div ref={ _ref } className='count'>
                { counter }
            </div>
            <p className='label'>count</p>
        </div>
    )
}

export default forwardRef( PatternCounter );