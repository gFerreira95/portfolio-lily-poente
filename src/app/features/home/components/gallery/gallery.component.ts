import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PortfolioItem } from '../../../../core/models/portfolio.model';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  private portfolioService = inject(PortfolioService);

  private cdr = inject(ChangeDetectorRef);

  // Guarda todos os itens intocados
  allPortfolioItems: PortfolioItem[] = [];


  // Array para armazenar os itens do portfólio da aba atual
  portfolioItems: PortfolioItem[] = [];
  
  // Index atual do array
  currentIndex: number | null = null;
  // Abas de categoria
  categories: string[] = ['Todos'];
  selectedCategory: string = 'Todos';

  // Variáveis para o swipe
  touchStartX = 0;
  touchEndX = 0;

  ngOnInit(): void {
    this.portfolioService.getAll().subscribe({
      next: (data) => {
        this.allPortfolioItems = data;
        this.portfolioItems = [...data];
        // Extrai as categorias únicas sem repetição
        const uniqueCategories = new Set(data.map(item => item.category));
        this.categories = ['Todos', ...Array.from(uniqueCategories)];
        this.cdr.detectChanges(); 
      }
    });
  }

  // Função disparada ao clicar numa aba
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'Todos') {
      this.portfolioItems = [...this.allPortfolioItems];
    } else {
      this.portfolioItems = this.allPortfolioItems.filter(item => item.category === category);
    }
    
    this.currentIndex = null; // Fecha o lightbox por segurança ao trocar de aba
    this.cdr.detectChanges();
  }

  openLightbox(index: number): void {
    this.currentIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.currentIndex = null;
    document.body.style.overflow = 'auto';
  }

  // --- NAVEGAÇÃO DE SETAS ---
  nextImage(event?: Event): void {
    if (event) event.stopPropagation(); // Impede que o clique feche o modal
    if (this.currentIndex !== null && this.portfolioItems.length > 0) {
      // Avança um e volta ao zero se chegar ao fim (loop infinito)
      this.currentIndex = (this.currentIndex + 1) % this.portfolioItems.length;
    }
  }

  prevImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.currentIndex !== null && this.portfolioItems.length > 0) {
      // Recua um e vai para o último se passar do zero
      this.currentIndex = (this.currentIndex - 1 + this.portfolioItems.length) % this.portfolioItems.length;
    }
  }

  // --- GESTOS DE SWIPE (MOBILE) ---
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe(): void {
    const threshold = 50; // Distância mínima (em pixels) para considerar um arrasto intencional

    if (this.touchEndX < this.touchStartX - threshold) {
      this.nextImage(); // Dedo arrastou para a esquerda (Avançar)
    }
    if (this.touchEndX > this.touchStartX + threshold) {
      this.prevImage(); // Dedo arrastou para a direita (Recuar)
    }
  }


}