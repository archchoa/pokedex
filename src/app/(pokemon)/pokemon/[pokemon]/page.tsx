"use client";

import { useParams } from "next/navigation";
import PokemonDetail from "@/app/features/PokemonDetail";

export default function PokemonPage() {
  const params = useParams<{ pokemon: string }>();

  return (
    <div className="flex flex-col space-y-4 p-4">
      <PokemonDetail name={params.pokemon} />
    </div>
  );
}
