
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Component, inject} from '@angular/core';
import { ItemMocked } from '../shared/item.mocked.const';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
  
  router: Router = inject(Router);

  queryCerca: string = '';

  items = ItemMocked;
  
  searchFilm() {
      this.router.navigate(['home/' + this.queryCerca]);
    } 
}



// public items: MenuItem[] = [{
//           label: 'Home',
//           icon: 'pi pi-home',
//           routerLink: 'home'
//       },
//       {
//           label: 'Film',
//           items: [
//             { label: 'Azione' },
//             { label: 'Thriller' },
//             { label: 'Romantico' },
//             { label: 'Avventura' },
//             { label: 'Horror' },
//             { label: 'Fantascienza'}
//           ]
//       }];




// searchFilm() {
//     this.router.navigate(['home/' + this.queryCerca]);
//   } 
//   reload() {
//   this.router.navigate(['home']);
// }