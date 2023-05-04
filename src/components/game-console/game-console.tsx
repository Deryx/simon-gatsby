import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import SimonButton from '../simon-button/simon-button';
import ControlPanel from '../control-panel/control-panel';
import GameConsoleProps from './props';
import './styles.scss';

const GameConsole = forwardRef(({ count, handleButtonClick, startClickFunction, strictClickFunction, powerClickFunction }: GameConsoleProps, _ref: any ) => {
    const greenRef = useRef();
    const redRef = useRef();
    const yellowRef = useRef();
    const blueRef = useRef();
    const patternRef = useRef()

    useImperativeHandle(_ref, () => {
        return {
            greenButton: greenRef.current,
            redButton: redRef.current,
            yellowButton: yellowRef.current,
            blueButton: blueRef.current,
            patternCtr: patternRef.current
        }
    });

    return (
        <div className='console'>
            <div className='buttons'>
                <div className='row'>
                    <SimonButton 
                        ref={ greenRef }
                        buttonId='1' 
                        buttonClass='green' 
                        handleClick={ handleButtonClick } 
                    />
                    <SimonButton 
                        ref={ redRef }
                        buttonId='2' 
                        buttonClass='red' 
                        handleClick={ handleButtonClick } 
                    />
                </div>
                <div className='row'>
                    <SimonButton 
                        ref={ yellowRef }
                        buttonId='3' 
                        buttonClass='yellow' 
                        handleClick={ handleButtonClick } 
                    />
                    <SimonButton 
                        ref={ blueRef }
                        buttonId='4' 
                        buttonClass='blue' 
                        handleClick={ handleButtonClick } 
                    />
                </div>
            </div>
            <ControlPanel 
                ref={ patternRef }
                countData={ count } 
                startClickFunction={ startClickFunction } 
                strictClickFunction={ strictClickFunction}
                powerSwitchClickFunction={ powerClickFunction}
            />
        </div>
    )
})

export default GameConsole;