import React from 'react';
import ControlPanelProps from './props';
import NamePlate from '../nameplate/nameplate';
import PatternCounter from '../pattern-counter/pattern-counter';
import StartButton from '../start-button/start-button';
import StrictButton from '../strict-button/strict-button';
import PowerSwitch from '../power-switch/power-switch';
import './styles.scss';

const ControlPanel = ({ countData, startClickFunction, strictClickFunction, powerSwitchClickFunction }: ControlPanelProps ) => {
    return (
        <div className='panel'>
            <NamePlate />
            <div className='controls'>
                <PatternCounter count={ countData } />
                <StartButton handleClick={ startClickFunction } />
                <StrictButton handleClick={ strictClickFunction } />
            </div>
            <div className='switch'>
                <PowerSwitch handleClick={ powerSwitchClickFunction } />
            </div>
        </div>
    )
}

export default ControlPanel;