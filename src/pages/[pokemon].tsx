import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Button, Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonApi from "@/network/pokemon-api"; 

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

  async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();

    if (!pokemon || !nickname) return;

    const update = await PokemonApi.setNickname(pokemon, nickname);
    mutatePokemon(update, { revalidate: false });
  }

  return (
    // to change the title dynamically under HEAD tag
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name} - NextJS PokéDex`}</title>}
      </Head>

      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            ← PokéDex
          </Link>
        </p>
        {pokemonLoading && <Spinner animation="grow" />} 
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + pokemon.name}
              width={400}
              height={400}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height:</strong> {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
            </div>

            <Form onSubmit={handleSubmitNickname} className="mt-4">
              <Form.Group controlId="pokemon-nickname-input" className="mb-3">
                <Form.Label>Give this Pokemon a nickname</Form.Label>
                <Form.Control name="nickname" placeholder="Type Name" />
              </Form.Group>
              <Button type="submit">Set nickname</Button>
            </Form>

          </>
        )}
      </div>
    </>
  );
}
