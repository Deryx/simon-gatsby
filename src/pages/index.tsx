import React, { useState, useEffect, useRef } from "react"
import GameConsole from "../components/game-console/game-console";
import SimonButton from "../components/simon-button/simon-button";


const IndexPage = () => {
  const COUNTER_BLANK: string = '';
  const COUNTER_ON: string = '--';
  const COUNTER_WRONG: string = '!!';
  const MAX_STEPS: number = 20;
  const consoleRef = useRef();

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

  const changeCounter = ( newCounter: any ) => {
    if(typeof newCounter === 'number') {
      if( newCounter <= 9 ) {
        counter = '0' + newCounter;
      } else {
        counter = newCounter.toString();
      }
    } else {
      counter = newCounter;
    }

    consoleRef.current.patternCtr.innerHTML = counter;
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

  const handleSimonButtonClick = ( event: any ) => {
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

  const handlePowerClick = ( event: any ) => {
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

  const playerTimer = () => {
    setTimeout( handleSimonButtonClick, 1000 );
  }

  const createSimonPattern = () => {
    let count = 0;
    while( count < MAX_STEPS ) {
      setSimonPattern( prev => [...prev, getRandomButton()] );
      count++;
    }
  }

  const handleStartClick = () => {
    if( !gameOff ) {
      playSimonRound();
    }
  }

  const handleStrictClick = () => {

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
    <GameConsole 
      ref={ consoleRef }
      count={ counter } 
      handleButtonClick={ handleSimonButtonClick }
      powerClickFunction={ handlePowerClick } 
      startClickFunction={ handleStartClick } 
      strictClickFunction={ handleStrictClick }
    />
  )
}

export default IndexPage