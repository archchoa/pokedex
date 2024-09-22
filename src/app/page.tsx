import PokemonList from "./features/PokemonList";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <span className="text-xl">Pokedex</span>
      <PokemonList />
    </div>
  );
}
