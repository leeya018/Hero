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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  //then() -  I do not need the toPromise() function because create() returns the promise
  //the hero in this then comes from from the hero in the create then()

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }




}
