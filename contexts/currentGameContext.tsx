import { useRouter } from 'next/router';
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

import { GameRow, useGetUserGamesQuery } from '../generated/graphql';
import { getSingleValueFromQuery } from '../utils/url';

export type currentGameContextValue = {
  game: Omit<GameRow, 'ownerId' | 'private'> | undefined;
};

const defaultValue: currentGameContextValue = {
  game: undefined,
};

const CurrentGameContext = createContext<currentGameContextValue>(defaultValue);

export const CurrentGameContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [game, setGame] = useState<
    Omit<GameRow, 'ownerId' | 'private'> | undefined
  >(undefined);
  const { data } = useGetUserGamesQuery(); // TODO get only one game by id, get users in game in that query
  const { query } = useRouter();
  const gameIdFromQuery = getSingleValueFromQuery(query, 'id');

  useEffect(() => {
    if (!gameIdFromQuery) setGame(undefined);
    else {
      const currentGame = data?.getUsersGames.find(
        (game) => game.id === parseInt(gameIdFromQuery, 10)
      );
      setGame(currentGame);
    }
  }, [gameIdFromQuery, data?.getUsersGames]);

  return (
    <CurrentGameContext.Provider
      value={{
        game,
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
