import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Pokemon } from '../../shared/models/pokemon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private api = inject(ApiService);
  pokemons: Pokemon[] | undefined;
  pokemonsCopy: Pokemon[]  | undefined;

  ngOnInit(){
    this.pokemons = this.api.getData()
    this.pokemonsCopy = this.pokemons
  }

  formGroup: FormGroup = new FormGroup({
    filter: new FormControl()
  })

  filtering(event: any){
    const search: string = event.target.value;
    console.log({search});
    
    this.pokemons = this.pokemonsCopy?.filter(({name}: Pokemon )=> {
      return name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
