import { FirstOwners } from "../components/Stats/FirstOwners";
import { GenreStats } from "../components/Stats/GenreStats";

export function StatsContainer() {
  return (
    <>
      <main>
        <FirstOwners />
        <GenreStats />
      </main>
    </>
  );
}
