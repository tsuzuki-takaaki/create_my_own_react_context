import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export const Section = ({ children }: any) => {
  const level = useContext(LevelContext);

  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
