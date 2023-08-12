import { LevelContext } from "./LevelContext";

export const Section = ({ children, level }: any) => {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
