import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Il FE online deve chiamare il BE pubblico Railway.
  // Per lo sviluppo locale Angular continua a usare il BE su localhost.
  private readonly apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/auth'
    : 'https://back-end-production-50e6.up.railway.app/api/auth';

  constructor(private readonly http: HttpClient) {}

  register(request: AuthRequest): Observable<AuthResponse> {
    console.log('[Auth] REGISTER ->', `${this.apiUrl}/register`, request.username);
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => {
        console.log('[Auth] REGISTER OK', response);
        this.saveSession(response);
      })
    );
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    console.log('[Auth] LOGIN ->', `${this.apiUrl}/login`, request.username);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        console.log('[Auth] LOGIN OK', response);
        this.saveSession(response);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('game_companion_token');
  }

  getUserId(): number | null {
    const value = localStorage.getItem('game_companion_user_id');
    return value ? Number(value) : null;
  }

  getUsername(): string | null {
    return localStorage.getItem('game_companion_username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('game_companion_token');
    localStorage.removeItem('game_companion_user_id');
    localStorage.removeItem('game_companion_username');
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem('game_companion_token', response.token);
    localStorage.setItem('game_companion_user_id', String(response.userId));
    localStorage.setItem('game_companion_username', response.username);
  }
}
