"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
  test: number;
  setTest: (val: number) => void;
  increment: () => void;
};

const testContext = createContext<ContextType>({} as ContextType);

export function TestContextProvider({ children }: { children: ReactNode }) {
  const [test, setTest] = useState(0);
  const increment = () => setTest((prev) => prev + 1);
  return (
    <testContext.Provider value={{ test, setTest, increment }}>
      {children}
    </testContext.Provider>
  );
}

export function useTestContext() {
  return useContext(testContext);
}
