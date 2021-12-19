import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { currentGameKey } from '../config/localStorageKeys';
import { GameRow, useGetUserGamesLazyQuery } from '../generated/graphql';

export type currentGameContextValue = {
  gameId: number | null;
  game: GameRow | null;
  changeGame: (gameId: number) => void;
};

const defaultValue: currentGameContextValue = {
  gameId: -1,
  game: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeGame: () => {},
};

const CurrentGameContext = createContext<currentGameContextValue>(defaultValue);

export const CurrentGameContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [gameId, setGameId] = useState<number | null>(null);
  const [game, setGame] = useState(null);

  const refresh = useCallback((gameId: number) => {
    setGameId(gameId);
    localStorage.setItem(currentGameKey, `${gameId}`);
  }, []);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(currentGameKey);
    setGameId(
      localStorageValue !== null ? parseInt(localStorageValue, 10) : null
    );
  }, []);

  const [getGames, { data: games }] = useGetUserGamesLazyQuery();

  useEffect(() => {
    if (gameId) {
      getGames();
    }
  }, [gameId, getGames]);

  useEffect(() => {
    if (games?.getUsersGames?.length) {
      setGame(games.getUsersGames.find((g) => g.id === gameId));
    }
  }, [games, gameId]);

  return (
    <CurrentGameContext.Provider
      value={{
        gameId: gameId,
        game,
        changeGame: refresh,
      }}
    >
      {children}
    </CurrentGameContext.Provider>
  );
};

export const useCurrentGameContext = () => {
  const contextValue = useContext(CurrentGameContext);
  if (contextValue == undefined) {
    throw new Error(
      'useCurrentGameContext must be used inside CurrentGameContextProvider'
    );
  }
  return contextValue;
};
