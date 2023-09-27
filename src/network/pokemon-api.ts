import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosInstance";

export async function getPokemon(name: string) {

    // for dealy to load page between 0 to 2 seconds
    const delay = Math.random() * 2000;
    await new Promise(r => setTimeout(r, delay));

    const response = await api.get<Pokemon>("/pokemon/" + name);
    return response.data;
}

export async function getPokemonPage(page: number) {

    // number of items in a page 
    const pageSize = 12;

    // for going to next page
    const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    
    return response.data;
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
    return { ...pokemon, name: nickname };
}