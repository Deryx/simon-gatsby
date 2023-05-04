import React, { forwardRef } from 'react';
import ControlPanelProps from './props';
import NamePlate from '../nameplate/nameplate';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import PowerSwitch from '../power-switch/power-switch';
import './styles.scss';

const ControlPanel = forwardRef(({ countData, startClickFunction, strictClickFunction, powerSwitchClickFunction }: ControlPanelProps, _ref: any ) => {
    return (
        <div className='panel'>
            <NamePlate />
            <div className='controls'>
                <PatternCounter ref={ _ref } count={ countData } />
                <StartButton handleClick={ startClickFunction } />
                <StrictButton handleClick={ strictClickFunction } />
            </div>
            <div className='switch'>
                <PowerSwitch handleClick={ powerSwitchClickFunction } />
            </div>
        </div>
    )
})

export default ControlPanel;