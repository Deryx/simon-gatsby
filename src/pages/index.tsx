import React, { useRef } from "react"
import SimonButton from '../components/simon-button/simon-button';
import NamePlate from '../components/nameplate/nameplate';
import PatternCounter from '../components/pattern-counter/pattern-counter';
import StartButton from '../components/start-button/start-button';
import StrictButton from '../components/strict-button/strict-button';
import PowerSwitch from '../components/power-switch/power-switch';
import './styles.scss';

const IndexPage = () => {
  const COUNTER_BLANK: string = '';
  const COUNTER_ON: string = '--';
  const COUNTER_WRONG: string = '!!';
  const MAX_STEPS: number = 20;

  const patternCtrRef = useRef();

  let round: number;
  let numPlayerClicks: number;
  let simonPattern: number[] = [];
  let playerPattern: number[] = [];
  let gameOff: boolean;
  let isPlayerTurn: boolean;
  let strictMode: boolean;

  const changeCounterDisplay = ( displayItem: any ) => {
    let item: any = displayItem;

    if(typeof displayItem === 'number') {
      if( displayItem <= 9 ) {
        item = '0' + displayItem;
      } else {
        item = displayItem.toString();
      }
    } else {
      item = displayItem;
    }

    patternCtrRef.current.innerHTML = item;
  }

  const getRandomButton = (): number => {
    return Math.floor( Math.random() * 4 + 1 );
  }

  const createSimonPattern = () => {
    let count = 0;
    while( count < MAX_STEPS ) {
      simonPattern = [...simonPattern, getRandomButton()];
      count++;
    }
  }

  const handlePowerClickFunction = ( event: any ):void => {
    event.preventDefault();

    const powerButton = event.target.parentNode;
    const powerButtonClasses = powerButton.classList;
    strictMode = false;

    if(powerButtonClasses.contains('power-switch--on')) {
      powerButtonClasses.remove('power-switch--on');
      changeCounterDisplay( COUNTER_BLANK );
      simonPattern = [];
      gameOff = true;
    } else {
      gameOff = false;
      powerButtonClasses.add('power-switch--on');
      changeCounterDisplay( COUNTER_ON );
    }
  }

  const handleStartClickFunction = ( event: any ) => {
    event.preventDefault();

    if( !!!gameOff ) {
      round = 0;
      createSimonPattern();
      numPlayerClicks = 0;
      isPlayerTurn = false;
      playSimonRound();
    }
  }

  const handleStrictClickFunction = ( event: any ) => {
    event.preventDefault();
    const strictModeIndicator = document.querySelector('.indicator');

    if( !!!gameOff ) {
      strictMode = !!!strictMode;
      if(!!strictMode) {
        strictModeIndicator?.classList.remove('indicator--off');
        strictModeIndicator?.classList.add('indicator--on');
      } else {
        strictModeIndicator?.classList.remove('indicator--on');
        strictModeIndicator?.classList.add('indicator--off');
      }
    }
  }

  const handleSimonClick = ( event: any ) => {
    event.preventDefault();
    let currentIndex: number;

    if( !!!gameOff ) {
      if( !!isPlayerTurn ) {
        if( numPlayerClicks <= round) {
          numPlayerClicks++;
          currentIndex = numPlayerClicks - 1;
          const buttonClicked = event.target.id;
          const buttonClickedNumber = parseInt( buttonClicked[buttonClicked.length - 1] );
          playerPattern = [...playerPattern, buttonClickedNumber];
          lightSimonButton( buttonClickedNumber );
          if(!(simonPattern[currentIndex] === playerPattern[currentIndex]) && !!!strictMode) {
            changeCounterDisplay( COUNTER_WRONG );
            isPlayerTurn = false;
          } else if(!(simonPattern[currentIndex] === playerPattern[currentIndex]) && !!strictMode) {
            changeCounterDisplay( COUNTER_WRONG );
            round = 0;
            simonPattern = [];
            createSimonPattern();
            numPlayerClicks = 0;
            isPlayerTurn = false;
            setTimeout( playSimonRound, 3000 );;
          }
        } else {
          isPlayerTurn = false;
        }
      }
    }  
  }

  const lightSimonButton = ( btn: number ) => {
    const target_button = document.querySelector(`#simonButton-${ btn }`);
    const originalClass = target_button && target_button.classList[0].toString();
    const litClass = `${originalClass}-pressed`;

    ( target_button && originalClass ) && target_button.classList.remove(originalClass);
    target_button && target_button.classList.add(litClass);

    setTimeout(() => {
      target_button && target_button.classList.remove(litClass);
      ( target_button && originalClass ) && target_button.classList.add(originalClass);
    }, 400);
  }

  const playSimonButton = ( btn: number ) => {
    lightSimonButton( btn );
  }

  const playSimonPattern = ( round: number ) => {
    for(let i = 0; i < round; i++){
      setTimeout(() => playSimonButton( simonPattern[i] ), i * 800);
    }
    isPlayerTurn = true;
    playerPattern = [];
  }

  const playSimonRound = () => {
    if( !!!gameOff ) {
      if( round <= MAX_STEPS ) {
        if( !!!isPlayerTurn ) {
          round++;
          changeCounterDisplay( round );
          playSimonPattern( round );
          setTimeout(() => {
            numPlayerClicks = 0;
            isPlayerTurn = false;
            playSimonRound();
          }, round * 5000);
        }
      }
   }
  }

  return (
    <div className="console">
      <div className='buttons'>
        <div className='row'>
            <SimonButton 
                buttonId='1' 
                buttonClass='green' 
                handleClick={ handleSimonClick }
            />
            <SimonButton 
                buttonId='2' 
                buttonClass='red' 
                handleClick={ handleSimonClick }
            />
        </div>
        <div className='row'>
            <SimonButton 
                buttonId='3' 
                buttonClass='yellow' 
                handleClick={ handleSimonClick }
            />
            <SimonButton 
                buttonId='4' 
                buttonClass='blue' 
                handleClick={ handleSimonClick }
            />
        </div>
      </div>
      <div className='panel'>
            <NamePlate />
            <div className='controls'>
                <PatternCounter ref={ patternCtrRef } />
                <StartButton handleClick={ handleStartClickFunction } />
                <StrictButton handleClick={ handleStrictClickFunction } />
            </div>
            <div className='switch'>
                <PowerSwitch handleClick={ handlePowerClickFunction } />
            </div>
        </div>
    </div>
  )
}

export default IndexPage;