import usePokemon from "@/hooks/usePokemon";
import Link from "next/link";
import styles from "@/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

export default function PokemonEntry({ name }: { name: string }) {
  const { pokemon, pokemonLoading } = usePokemon(name);
  return (
    <Link href={"/" + name}>
      <div className={styles.entry}>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon && (
          <div className={styles.card}>
            <h1 className="text-center text-capitalized">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"pokemon: " + pokemon.name}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
