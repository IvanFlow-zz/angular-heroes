import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  noInfo: boolean = false;
  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    if(this.termino !== ""){
      this.heroesService.getSugerencias(this.termino)
    .subscribe( 
      heroes => {
        this.heroes = heroes;
        this.noInfo = this.heroes.length === 0;
      });
    }
    
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent){
    this.noInfo = false;
    if(!event.option.value){
      this.termino = "";
      this.heroes = [];
      return;
    }
    const heroe : Heroe= event.option.value;
    this.termino = heroe.superhero;
    this.heroes = [];
    this.heroesService.getHeroePorId(heroe.id!).subscribe(
      heroe => {
        this.heroeSeleccionado = heroe;
      }
    )
  }

  log(){
    console.log(this.noInfo);
  }
}
