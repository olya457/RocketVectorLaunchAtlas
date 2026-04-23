import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SavedType = 'place' | 'fact' | 'note';

export type SavedItem = {
  id: string;
  type: SavedType;
};

type Ctx = {
  savedPlaces: string[];
  savedFacts: string[];
  savedNotes: string[];
  isSaved: (type: SavedType, id: string) => boolean;
  toggle: (type: SavedType, id: string) => void;
  hasOnboarded: boolean;
  completeOnboarding: () => void;
  isLoaded: boolean;
};

const KEY_SAVED = '@rocket_atlas/saved_v1';
const KEY_ONBOARDED = '@rocket_atlas/onboarded_v1';

const SavedContext = createContext<Ctx | null>(null);

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [savedFacts, setSavedFacts] = useState<string[]>([]);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY_SAVED);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            places: string[];
            facts: string[];
            notes: string[];
          };
          setSavedPlaces(parsed.places || []);
          setSavedFacts(parsed.facts || []);
          setSavedNotes(parsed.notes || []);
        }
        const onb = await AsyncStorage.getItem(KEY_ONBOARDED);
        if (onb === 'true') {
          setHasOnboarded(true);
        }
      } catch {}
      setIsLoaded(true);
    })();
  }, []);

  const persist = async (
    places: string[],
    favs: string[],
    nts: string[],
  ) => {
    try {
      await AsyncStorage.setItem(
        KEY_SAVED,
        JSON.stringify({ places, facts: favs, notes: nts }),
      );
    } catch {}
  };

  const isSaved = (type: SavedType, id: string) => {
    if (type === 'place') {
      return savedPlaces.includes(id);
    }
    if (type === 'fact') {
      return savedFacts.includes(id);
    }
    return savedNotes.includes(id);
  };

  const toggle = (type: SavedType, id: string) => {
    if (type === 'place') {
      setSavedPlaces(prev => {
        const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
        persist(next, savedFacts, savedNotes);
        return next;
      });
    } else if (type === 'fact') {
      setSavedFacts(prev => {
        const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
        persist(savedPlaces, next, savedNotes);
        return next;
      });
    } else {
      setSavedNotes(prev => {
        const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
        persist(savedPlaces, savedFacts, next);
        return next;
      });
    }
  };

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    try {
      await AsyncStorage.setItem(KEY_ONBOARDED, 'true');
    } catch {}
  };

  return (
    <SavedContext.Provider
      value={{
        savedPlaces,
        savedFacts,
        savedNotes,
        isSaved,
        toggle,
        hasOnboarded,
        completeOnboarding,
        isLoaded,
      }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error('useSaved must be used within SavedProvider');
  }
  return ctx;
};
