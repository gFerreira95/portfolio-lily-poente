import { Component, inject } from '@angular/core';
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

  selectedImage: string | null = null;

  // Agora busca direto do Spring Boot + MongoDB!
  portfolioItems$: Observable<PortfolioItem[]> = this.portfolioService.getAll();

  openLightbox(imageUrl: string): void {
    this.selectedImage = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}