import React from 'react';
import PatternCounterProps from './props';
import './styles.scss';

const PatternCounter = ({ count }: PatternCounterProps ) => {
    return (
        <div className='counter'>
            <div className='count'>
                { count }
            </div>
            <p className='label'>count</p>
        </div>
    )
}

export default PatternCounter;