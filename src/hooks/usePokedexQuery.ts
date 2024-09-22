import { keepPreviousData, useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import queryString from "query-string";
import { request } from "@/lib/request";

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
};

export type Move = {
  move: {
    name: string;
    url: string;
  };
};

export type Stats = {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type GetPokemonURLResponse = {
  name: string;
  url: string;
};

export type GetPokemonResponse = {
  name: string;
  sprites: {
    frontDefault: string;
  };
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stats[];
  moves: Move[];
};

type GetAllPokemonsResponse = {
  results: Array<GetPokemonURLResponse>;
  count: number;
  next: string | null;
  previous: string | null;
};

type GetAllPokemonsParams = {
  limit?: string;
  offset?: string;
};

type GetPokemonParams = {
  name: string;
};

export const getAllPokemons = async (params: GetAllPokemonsParams) => {
  const args = queryString.stringify(params);

  const response = await request({
    url: `/?${args}`,
    method: "GET",
  });

  if (response.status === 500) {
    const error = response.data;
    throw error;
  }

  return camelcaseKeys(response.data, { deep: true });
};

export const getPokemon = async (params: GetPokemonParams) => {
  const response = await request({
    url: `/${params.name}`,
    method: "GET",
  });

  if (response.status === 500) {
    const error = response.data;
    throw error;
  }

  return camelcaseKeys(response.data, { deep: true });
};

export function useGetAllPokemonsQuery(params: GetAllPokemonsParams) {
  const getAllPokemonsQuery = useQuery<GetAllPokemonsResponse>({
    queryKey: ["pokemons", params],
    queryFn: async () => {
      const response = await getAllPokemons(params);
      return response;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return { ...getAllPokemonsQuery };
}

export function useGetPokemonQuery(params: GetPokemonParams) {
  const getPokemonQuery = useQuery<GetPokemonResponse>({
    queryKey: ["pokemon", params],
    queryFn: async () => {
      const response = await getPokemon(params);
      return response;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return { ...getPokemonQuery };
}
