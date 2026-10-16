import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioItem } from '../models/portfolio.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
  // Utiliza a URL base configurada nos environments
  private apiUrl = `${environment.apiUrl}/portfolio`;

  getAll(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(this.apiUrl);
  }

  create(item: PortfolioItem): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(this.apiUrl, item);
  }

  update(id: string, item: PortfolioItem): Observable<PortfolioItem> {
    return this.http.put<PortfolioItem>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}