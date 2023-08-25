import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Pokemon } from "../main-page/pokemon.model";
import { Observable, map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private http = inject(HttpClient);
    private pokemons!: Pokemon[];


   public getData() {

        const array : any = []
        this.http.get<any>(this.environment.apiUrl + "/pokemon?limit=1010&offset=0")
            .pipe(
                map( (res) => res.results.map((res: any) => {
                    this.getDataByName(res.name).subscribe(res=> {
                        array.push(res)
                    })
                 })
                )
        ).subscribe()

        return array

    }

    public getDataByName(name: string){
        return this.http.get<any>(this.environment.apiUrl + "/pokemon/" + name)
            .pipe(
                map((res) => 
                {
                        return {
                            name: res.name,
                            id: res.id,
                            types: [res.types[0].type.name , res.types[1]?.type.name ],
                            img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full"+res.id+".png",
                            stats: {
                                hp: res.stats[0].base_stat,
                                attack: res.stats[1].base_stat,
                                defense: res.stats[2].base_stat,
                                special_attack: res.stats[3].base_stat,
                                special_defense: res.stats[4].base_stat,
                                speed: res.stats[5].base_stat,
                            }
                        }
                    }
                )
            )
    }

    public environment = {
        production: false,
        apiUrl: "https://pokeapi.co/api/v2"
    }

}