"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { Input } from "@/components/Input";
import { useGetAllPokemonsQuery } from "@/hooks/usePokedexQuery";
import { GetPokemonURLResponse } from "@/hooks/usePokedexQuery";

const PokemonList = () => {
  const OFFSET = 20;

  const [query, setQuery] = useState<string>();
  const [page] = useQueryParam("page", withDefault(NumberParam, 1));
  const { data, isLoading } = useGetAllPokemonsQuery({ offset: ((page - 1) * OFFSET).toString() });
  const { data: allPokemons } = useGetAllPokemonsQuery({ limit: "100000" });

  if (isLoading) return <div>Loading...</div>;

  let results: GetPokemonURLResponse[] | undefined = [];

  const searchPokemon = (query: string) => {
    return allPokemons?.results?.filter((p: GetPokemonURLResponse) => p.name.includes(query));
  };

  if (query) {
    results = searchPokemon(query);
  } else {
    results = data?.results;
  }

  const pokemons = results?.map((pokemon: GetPokemonURLResponse) => (
    <div>
      <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
    </div>
  ));

  const count = data?.count && Math.round(data?.count / OFFSET);

  return (
    <div className="flex flex-col space-y-4">
      <Input
        className="text-black"
        endContent={<Search color="black" size={20} />}
        onChange={(e) => setQuery(e.target.value)}
      />
      {pokemons}
      <div>
        <Link href={`?page=${page - 1}`}>
          <button className="text-coal disabled:text-moon text-sm" disabled={page === 1}>
            Previous Page
          </button>
        </Link>
        <span className="text-coal mx-4 text-sm">
          {page} / {count}
        </span>
        <Link href={`?page=${page + 1}`}>
          <button className="text-coal disabled:text-moon text-sm" disabled={page === count}>
            Next Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonList;
