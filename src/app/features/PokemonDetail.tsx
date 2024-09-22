"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useGetPokemonQuery } from "@/hooks/usePokedexQuery";

const PokemonDetail = ({ name }: { name: string }) => {
  const { data, isLoading } = useGetPokemonQuery({ name });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return notFound();

  return (
    <div className="flex flex-col space-y-4">
      <Image src={data?.sprites.frontDefault} height={96} width={96} alt={data?.name}></Image>
      <h3>Description</h3>
      <span>Height: {data?.height}</span>
      <span>Weight: {data?.weight}</span>
      <h3>Stats</h3>
      <ul>
        {data?.stats.map((s: Stats) => (
          <li>
            {s.stat.name}: {s.baseStat}
          </li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul>{data?.abilities.map((a: Ability) => <li>{a.ability.name}</li>)}</ul>
      <h3>Moves</h3>
      <ul>{data?.moves.map((m: Move) => <li>{m.move.name}</li>)}</ul>
    </div>
  );
};

export default PokemonDetail;
