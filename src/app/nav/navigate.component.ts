import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'my-nav',
  template: `
  <div>
      <h2>Hello {{name}}</h2>
</div>
<nav>
      <a routerLink="/app" routerLinkActive="active">App</a>
      <a routerLink="/home" routerLinkActive="active">Home</a>
</nav>
<br/>
<br/>
<router-outlet></router-outlet>`,
styles: [
`a:link,
a:hover,
a:visited,
a:active {
    text-decoration: none;
    margin: 2px;
    padding: 2px;
    background-color: lightblue;
}
`
]
})

export class NavigateComponent {
  name:string;

  constructor() {
    this.name = `Angular!`;
  }
  
}