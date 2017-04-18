import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';


import { Hero } from './hero';
import { HeroService } from './hero.service';





@Component({
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: []
})



export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
       private router: Router
       ) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero) {
    this.selectedHero = hero;

  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => { this.heroes = heroes });
  }

  gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}

}
