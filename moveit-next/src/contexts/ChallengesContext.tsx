import { createContext, useCallback, useState } from 'react';
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: React.ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge | null;
  startNewChallenge: () => void;
  levelUp: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
  },[])

  const startNewChallenge = useCallback(() => {
    const randomChallangeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallangeIndex]; 
    setActiveChallenge(challenge);
  },[challenges]);

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      levelUp,
      activeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}