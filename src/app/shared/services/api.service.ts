import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, inject } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { Observable, map, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService implements OnDestroy {
    

    private http = inject(HttpClient);

    
    public environment = {
        production: false,
        apiUrl: "https://pokeapi.co/api/v2"
    }


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
                        const stringId = (res.id < 10) ?  "00"+res.id : (res.id < 100) ? "0"+res.id : res.id;
                        return {
                            name: res.name,
                            id: res.id,
                            stringId: stringId ,
                            types: [res.types[0].type.name , res.types[1]?.type.name ],
                            img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+stringId+".png",
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

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

}