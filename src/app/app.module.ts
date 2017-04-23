import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { inMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.compnent';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';




@NgModule({

  declarations: [//all the component I gonna use
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent
  ],
  imports: [//so that my component code could use it 
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(inMemoryDataService), // forRoot function is to add a sigelton services
    AppRoutingModule
    
  ],
  exports: [ RouterModule ],//to use it outside
  providers: [HeroService],//the services I use
  bootstrap: [AppComponent]//the main componnt I gonna tun
})  
export class AppModule { }
