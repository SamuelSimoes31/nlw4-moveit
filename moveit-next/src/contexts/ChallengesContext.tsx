import { createContext, useCallback, useMemo, useState } from 'react';
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
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
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

  const resetChallenge = useCallback(() => {
    setActiveChallenge(false);
  },[]);

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level+1)*4,2)
  },[level]);

  const completeChallenge = useCallback(() => {
    if(!activeChallenge) return;
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if( finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  },[activeChallenge,currentExperience,experienceToNextLevel]);

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      levelUp,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}