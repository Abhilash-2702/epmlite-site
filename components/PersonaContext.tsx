"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Persona = "cfo" | "fpa" | "founder";
export const PERSONAS: Persona[] = ["cfo", "fpa", "founder"];

type Ctx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
  hasPicked: boolean; // false = user hasn't explicitly picked yet
  reset: () => void;  // re-show the WhoAmI card
};

const PersonaCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "epm-persona-v1";
const DEFAULT_PERSONA: Persona = "fpa";

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(DEFAULT_PERSONA);
  const [hasPicked, setHasPicked] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (PERSONAS as string[]).includes(saved)) {
        setPersonaState(saved as Persona);
        setHasPicked(true);
      }
    } catch {}
  }, []);

  // Mirror to <html data-persona="..."> so CSS theme variables apply globally
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-persona", persona);
    }
  }, [persona]);

  function setPersona(p: Persona) {
    setPersonaState(p);
    setHasPicked(true);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {}
  }

  function reset() {
    setPersonaState(DEFAULT_PERSONA);
    setHasPicked(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <PersonaCtx.Provider value={{ persona, setPersona, hasPicked, reset }}>
      {children}
    </PersonaCtx.Provider>
  );
}

export function usePersona(): Ctx {
  const ctx = useContext(PersonaCtx);
  if (!ctx) {
    return {
      persona: DEFAULT_PERSONA,
      setPersona: () => {},
      hasPicked: false,
      reset: () => {},
    };
  }
  return ctx;
}
