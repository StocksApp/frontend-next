import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { currentGameKey } from '../config/localStorageKeys';

export type currentGameContextValue = {
  gameId: number | null;
  changeGame: (gameId: number) => void;
};

const defaultValue: currentGameContextValue = {
  gameId: -1,
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

  const refresh = useCallback((gameId: number) => {
    setGameId(gameId);
    localStorage.setItem(currentGameKey, `${gameId}`);
  }, []);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(currentGameKey);
    setGameId(
      localStorageValue !== null
        ? parseInt(localStorageValue, 10)
        : localStorageValue
    );
  }, []);

  return (
    <CurrentGameContext.Provider
      value={{
        gameId: gameId,
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
