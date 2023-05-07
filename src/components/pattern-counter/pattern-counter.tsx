import React, { forwardRef } from 'react';
import PatternCounterProps from './props';
import './styles.scss';

const PatternCounter = ({ counter }: PatternCounterProps ) => {
    return (
        <div className='counter'>
            <div className='count'>
                { counter }
            </div>
            <p className='label'>count</p>
        </div>
    )
}

export default PatternCounter;