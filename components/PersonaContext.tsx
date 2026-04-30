"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Persona = "cfo" | "fpa" | "founder";

type Ctx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
};

const PersonaCtx = createContext<Ctx | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("fpa");
  return (
    <PersonaCtx.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaCtx.Provider>
  );
}

export function usePersona(): Ctx {
  const ctx = useContext(PersonaCtx);
  if (!ctx) {
    // Allow components that mount outside the provider (or before it
    // hydrates) to still render with a sensible default rather than throw.
    return { persona: "fpa", setPersona: () => {} };
  }
  return ctx;
}
