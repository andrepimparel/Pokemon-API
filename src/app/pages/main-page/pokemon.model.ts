export interface Stats {
   hp: number;
   attack: number;
   defense: number,
   special_attack: number;
   special_defense: number;
   speed: number;
}

export interface Pokemon {
    name: string;
    id: number;
    types: string[];
    img: string;
    stats: Stats;
}