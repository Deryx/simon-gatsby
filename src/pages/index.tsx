import React, { useState, useEffect, useRef } from "react"
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

  const [count, setCount] = useState( COUNTER_BLANK )
  const [simonPattern, setSimonPattern] = useState<number[]>([]);
  const [gameOff, setGameOff] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  var playerPattern: number[] = [];
  let counter: string;
  let round: number = 1;
  let simonClick: number = 1;

  useEffect(() => {
    createSimonPattern();
  }, []);

  const changeCounter = ( newCount: any ) => {
    if(typeof newCount === 'number') {
      if( newCount <= 9 ) {
        counter = '0' + newCount;
      } else {
        counter = newCount.toString();
      }
    } else {
      counter = newCount;
    }

    setCount( counter );
  }

  const updateSimonPattern = ( btn: number ) => {
    setSimonPattern( prev => [...prev, btn]); 
  }  

  const updateGameOff = ( status: boolean ) => {
    setGameOff( status );
  }

  const getRandomButton = (): number => {
    return Math.floor( Math.random() * 4 + 1 );
  }

  const playerClickMatches = () => {
    return simonPattern[simonClick] === playerPattern[simonClick];
  }

  const processPlayerTurn = () => {
      if( !gameOff ) {
        if( isPlayerTurn ) {
          // const buttonClicked = consoleRef.current?.blueButton.current.id;
          // const buttonClickedNumber = buttonClicked[buttonClicked.length - 1];
          // playerPattern = [...playerPattern, buttonClickedNumber];
          // lightSimonButton( buttonClickedNumber );
          // console.log(playerPattern);
          // if(playerClickMatches()) {
          //   simonClick++;
          // } else {
          //   simonClick = 1;
          //   changeCounter( COUNTER_WRONG );
          // }
        }
      }
  }

  const processPlayerClick = ( event: any ) => {
    event?.preventDefault();


  }

  const createSimonPattern = () => {
    let count = 0;
    while( count < MAX_STEPS ) {
      setSimonPattern( prev => [...prev, getRandomButton()] );
      count++;
    }
  }

  const handlePowerClickFunction = ( event: any ):void => {
    event.preventDefault();

    const powerButton = event.target.parentNode;
    const powerButtonClasses = powerButton.classList;

    if(powerButtonClasses.contains('power-switch--on')) {
      powerButtonClasses.remove('power-switch--on');
      updateGameOff( true )
      changeCounter( COUNTER_BLANK );
    } else {
      powerButtonClasses.add('power-switch--on');
      updateGameOff( false );
      changeCounter( COUNTER_ON );
    }
  }

  const handleStartClickFunction = ( event: any ) => {
    event.preventDefault();

    if( !gameOff ) {
      playSimonRound();
    }
  }

  const handleStrictClickFunction = ( event: any ) => {

  }

  const handleSimonClick = ( event: any ) => {
    event.preventDefault();

    if( !gameOff ) {
      if( isPlayerTurn ) {
        const buttonClicked = event.target.id;
        const buttonClickedNumber = buttonClicked[buttonClicked.length - 1];
        playerPattern = [...playerPattern, buttonClickedNumber];
        lightSimonButton( buttonClickedNumber );
        console.log(playerPattern);
        // if(playerClickMatches()) {
        //   simonClick++;
        // } else {
        //   simonClick = 1;
        //   changeCounter( COUNTER_WRONG );
        // }
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
    for(let i = 1; i <= round; i++){
      setTimeout(() => playSimonButton( simonPattern[i] ), i * 800);
    }
    setIsPlayerTurn(true);
  }

  const playSimonRound = () => {
    if( !gameOff ) {
      if( round <= MAX_STEPS ) {
        changeCounter( round );
        playSimonPattern( round );
        setTimeout(() => {
          round += 1;
          playSimonRound();
        }, round * 5000);
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
                <PatternCounter counter={ count } />
                <StartButton handleClick={ handleStartClickFunction } />
                <StrictButton handleClick={ () => handleStrictClickFunction } />
            </div>
            <div className='switch'>
                <PowerSwitch handleClick={ handlePowerClickFunction } />
            </div>
        </div>
    </div>
  )
}

export default IndexPage