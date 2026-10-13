
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioItem } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  // O NOSSO MOCK (Os dados provisórios)
  private mockData: PortfolioItem[] = [
    {
      id: '1',
      title: 'CLUBE DO LIVRO',
      category: 'Branding e design da marca',
      // Aqui usamos caminhos locais por enquanto, depois será URL do Cloudinary
      imageUrl: 'assets/portfolio/clube-livro.jpg', 
    },
    {
      id: '2',
      title: 'ARTE VISUAL',
      category: 'Colagem autoral',
      imageUrl: 'assets/portfolio/arte-visual.jpg',
    },
    {
      id: '3',
      title: 'DESIGN DE POSTS',
      category: 'Para as redes sociais',
      imageUrl: 'assets/portfolio/posts.jpg',
    }
  ];

  constructor() { }

  // Função que será substituída pelo this.http.get() mais tarde
  getPortfolioItems(): Observable<PortfolioItem[]> {
    return of(this.mockData);
  }
}