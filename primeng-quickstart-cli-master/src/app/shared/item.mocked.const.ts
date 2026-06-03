import { MenuItem } from "primeng/api/menuitem";

export const ItemMocked: MenuItem[] = [{
    label: 'Home',
    icon: 'pi pi-home',
    routerLink: 'home'
},
{
    label: 'Film',
    items: [
      { label: 'Azione' ,
        routerLink:'generi/28'
      },
      { label: 'Thriller',
      routerLink:'generi/53'
       },
      { label: 'Romantico',
      routerLink:'generi/10749'
      },
      { label: 'Avventura' ,
      routerLink:'generi/12'
      },
      { label: 'Horror' ,
      routerLink:'generi/27'
      },
      { label: 'Fantasy',
      routerLink:'generi/14' 
      }
    ],
    

},
{
  label: 'Chi sono',
  icon: 'pi pi-user',
  routerLink: 'contatti'
}];