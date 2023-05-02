import React, { useState, useEffect } from "react"
import GameConsole from "../components/game-console/game-console";
import SimonButton from "../components/simon-button/simon-button";


const IndexPage = () => {
  const COUNTER_BLANK: string = '';
  const COUNTER_ON: string = '--';
  const COUNTER_WRONG: string = '!!';
  const MAX_STEPS: number = 20;
  const patterns: any = {
    simon: [],
    player: []
  }

  let round: number = 1;

  const [gameOff, setGameOff] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [counter, setCounter] = useState(COUNTER_BLANK);

  const changeCounter = ( newCounter: any ) => {
    if(typeof newCounter === 'number') {
      if( newCounter <= 9 ) {
        setCounter( '0' + newCounter )
      } else {
        setCounter( newCounter.toString() );
      }
    } else {
      setCounter( newCounter );
    }
  }

  const updateGameOff = ( status: boolean ) => {
    setGameOff( status );
  }

  const getRandomButton = (): number => {
    return Math.floor( Math.random() * 4 + 1 );
  }

  const updateSimonPattern = ( btn: number ) => {
    patterns.simon = [...patterns.simon, btn]; 
  }

  const updatePlayerPattern = ( btn: number ) => {
    if(!gameOff) {
      patterns.player = [...patterns.player, btn];
    }
  }

  const resetSimonPattern = () => {
    patterns.simon = [];
  }

  const resetPlayerPattern = () => {
    patterns.player = [];
  }

  const patternsEqual = () => {
    if(patterns.simon.length === patterns.player.length) {
      if( patterns.simon !== patterns.player ) {
        return false
      }
    }

    return true;
  }

  const handleSimonButtonClick = ( event: any ) => {
      event.preventDefault();

      if( !gameOff ) {
        if( isPlayerTurn ) {
          const button_clicked = event.target.id;
          const button_clicked_number = button_clicked[button_clicked.length - 1];
          lightSimonButton( button_clicked_number );
          updatePlayerPattern( parseInt(button_clicked_number ) );
        }
      }
  }

  const handlePowerClick = ( event: any ) => {
    event.preventDefault();

    const powerButton = event.target.parentNode;
    const powerButtonClasses = powerButton.classList;
    resetSimonPattern();
    resetPlayerPattern();

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

  const handleStartClick = () => {
    if( !gameOff ) {
      createSimonPattern();
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

  const createSimonPattern = () => {
    let count = 0;
    while( count < MAX_STEPS ) {
      updateSimonPattern( getRandomButton() );
      count++;
    }
  }

  const playSimonButton = ( btn: number ) => {
    lightSimonButton( btn );
  }

  const playSimonPattern = ( round: number ) => {
    for(let i = 0; i < round; i++){
      setTimeout(() => playSimonButton( patterns.simon[i] ), i * 800);
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
      count={ counter } 
      handleButtonClick={ handleSimonButtonClick }
      powerClickFunction={ handlePowerClick } 
      startClickFunction={ handleStartClick } 
      strictClickFunction={ handleStrictClick }
    />
  )
}

export default IndexPage