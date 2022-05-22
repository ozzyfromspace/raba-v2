// import styles from './GameProvider.module.scss';

import { createContext, useContext, useReducer } from 'react';
import gameReducer from '../../reducers/gameReducer';
import gameActionResolver from '../../reducers/gameReducer/utils/gameActionResolver';
import { GameProviderProps } from '../../utils/props';
import { GameProviderValue } from '../../utils/types';
import initGame from './utils/initGame';

const initGameState = initGame();

const gameProviderValue: GameProviderValue = {
  game: initGameState,
  dispatch: () => null,
  gameActionResolver: () => null,
};

const GameProviderContext = createContext(gameProviderValue);

const GameProvider = (props: GameProviderProps) => {
  const { children } = props;

  const [game, dispatch] = useReducer(gameReducer, initGameState);

  const providerValue: GameProviderValue = {
    dispatch,
    game,
    gameActionResolver,
  };

  return (
    <GameProviderContext.Provider value={providerValue}>
      {children}
    </GameProviderContext.Provider>
  );
};

export const useGame = () => useContext(GameProviderContext);

export default GameProvider;
