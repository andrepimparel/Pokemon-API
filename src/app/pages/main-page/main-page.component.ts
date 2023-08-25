import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Pokemon } from './pokemon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  private api = inject(ApiService);
  pokemons!: any

  constructor(){
    this.pokemons = this.api.getData()
    

    console.log(this.pokemons)
  }

  formGroup: FormGroup = new FormGroup({
    filter: new FormControl()
  })

  filtering(event: any){
    const search: string = event.target.value;
    console.log({search});
    // TODO Filter
  }

}
