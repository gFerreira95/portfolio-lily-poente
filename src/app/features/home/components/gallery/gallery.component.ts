import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  
  // Controle do Lightbox
  selectedImage: string | null = null;

  // Mock de Dados
  portfolioItems$: Observable<PortfolioItem[]> = of([
    {
      id: '1',
      title: 'Clube do Livro - Anne With an E',
      category: 'Branding e design da marca',
      imageUrl: '/clube-livro.png'
    },
    {
      id: '2',
      title: 'ARTE VISUAL',
      category: 'Colagem Autoral',
      imageUrl: '/arte-visual.png'
    },
    {
      id: '3',
      title: 'DESIGN DE POSTS',
      category: 'Para as redes sociais',
      imageUrl: '/posts.png'
    }
  ]);

  // Função para abrir a imagem no modal
  openLightbox(imageUrl: string): void {
    this.selectedImage = imageUrl;
    document.body.style.overflow = 'hidden'; // Evita que a página role no fundo
  }

  // Função para fechar o modal
  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Devolve o scroll à página
  }
}