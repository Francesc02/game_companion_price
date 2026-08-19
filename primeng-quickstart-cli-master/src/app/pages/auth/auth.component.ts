import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  template: `<section class="auth">
    <div class="box">
      <span>GAME COMPANION PRICE</span>
      <h1>{{register ? 'Crea il tuo account' : 'Bentornato'}}</h1>
      <p>{{register ? 'Registrati per salvare la tua wishlist.' : 'Accedi al tuo account Game Companion.'}}</p>

      <label>Username
        <input type="text" [(ngModel)]="username" placeholder="Il tuo username" autocomplete="username">
      </label>

      <label>Password
        <input type="password" [(ngModel)]="password" placeholder="••••••••" autocomplete="current-password">
      </label>

      <button (click)="submit()" [disabled]="loading">
        {{loading ? 'Attendere...' : (register ? 'Registrati' : 'Accedi')}}
      </button>

      <a (click)="toggleMode()">
        {{register ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}}
      </a>

      <small *ngIf="message" [class.error]="isError">{{message}}</small>
    </div>
  </section>`,
  styles: [`
    .auth{min-height:65vh;display:grid;place-items:center;padding:50px 20px}
    .box{width:min(420px,100%);padding:32px;background:#101820;border:1px solid rgba(255,255,255,.08);border-radius:14px;color:#eaf0f3}
    .box>span{color:#57e879;font-size:11px;font-weight:800;letter-spacing:1.5px}
    .box h1{margin:10px 0 6px}.box p{color:#84919a;margin-bottom:25px}
    .box label{display:block;margin:15px 0;font-size:12px;color:#9ca8b0}
    .box input{display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:#0a1117;color:#fff;outline:none}
    .box input:focus{border-color:#57e879}
    .box button{width:100%;padding:12px;border:0;border-radius:8px;background:#57e879;color:#061008;font-weight:800;cursor:pointer}
    .box button:disabled{opacity:.6;cursor:not-allowed}
    .box a{display:block;margin-top:18px;text-align:center;color:#57e879;font-size:12px;cursor:pointer}
    .box small{display:block;margin-top:14px;color:#57e879;text-align:center}
    .box small.error{color:#ff7777}
  `]
})
export class AuthComponent {
  register = false;
  username = '';
  password = '';
  message = '';
  loading = false;
  isError = false;

  constructor(private readonly authService: AuthService) {}

  submit(): void {
    this.message = '';
    this.isError = false;

    const username = this.username.trim();
    const password = this.password;

    if (!username || !password) {
      this.message = 'Inserisci username e password.';
      this.isError = true;
      return;
    }

    this.loading = true;
    const request = { username, password };
    const call$ = this.register
      ? this.authService.register(request)
      : this.authService.login(request);

    call$.subscribe({
      next: response => {
        this.loading = false;
        this.message = this.register ? 'Account creato. Accesso effettuato!' : `Bentornato, ${response.username}!`;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.isError = true;
        this.message = this.getErrorMessage(error);
      }
    });
  }

  toggleMode(): void {
    this.register = !this.register;
    this.message = '';
    this.isError = false;
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) return 'Backend non raggiungibile. Controlla che Spring Boot sia avviato.';
    if (error.status === 401) return 'Username o password non corretti.';
    if (error.status === 409) return 'Username già esistente.';
    if (error.error?.message) return error.error.message;
    return 'Operazione non riuscita. Riprova.';
  }
}
