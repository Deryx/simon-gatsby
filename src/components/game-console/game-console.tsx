import React from 'react';
import SimonButton from '../simon-button/simon-button';
import ControlPanel from '../control-panel/control-panel';
import GameConsoleProps from './props';
import './styles.scss';

const GameConsole = ({ count, handleButtonClick, startClickFunction, strictClickFunction, powerClickFunction }: GameConsoleProps) => {
    return (
        <div className='console'>
            <div className='buttons'>
                <div className='row'>
                    <SimonButton 
                        buttonId='1' 
                        buttonClass='green' 
                        handleClick={ handleButtonClick } 
                    />
                    <SimonButton 
                        buttonId='2' 
                        buttonClass='red' 
                        handleClick={ handleButtonClick } 
                    />
                </div>
                <div className='row'>
                    <SimonButton 
                        buttonId='3' 
                        buttonClass='yellow' 
                        handleClick={ handleButtonClick } 
                    />
                    <SimonButton 
                        buttonId='4' 
                        buttonClass='blue' 
                        handleClick={ handleButtonClick } 
                    />
                </div>
            </div>
            <ControlPanel 
                countData={ count } 
                startClickFunction={ startClickFunction } 
                strictClickFunction={ strictClickFunction}
                powerSwitchClickFunction={ powerClickFunction}
            />
        </div>
    )
}

export default GameConsole;