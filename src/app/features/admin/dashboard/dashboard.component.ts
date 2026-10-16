import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { PortfolioItem } from '../../../core/models/portfolio.model';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { CloudinaryService } from '../../../core/services/cloudinary.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private cloudinaryService = inject(CloudinaryService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // Força a atualização da tela no modo Zoneless

  items: PortfolioItem[] = [];
  isSubmitting = false;
  statusMessage = '';

  editingId: string | null = null;
  formModel: PortfolioItem = {
    title: '',
    category: '',
    description: '',
    imageUrl: ''
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.portfolioService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.statusMessage = 'Erro ao carregar itens do portfólio.';
        this.cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges(); // Atualiza o preview imediatamente
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  startEdit(item: PortfolioItem): void {
    this.editingId = item.id || null;
    this.formModel = { ...item };
    this.imagePreview = item.imageUrl;
    this.selectedFile = null;
    this.statusMessage = '';
    this.cdr.detectChanges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm(): void {
    this.editingId = null;
    this.formModel = { title: '', category: '', description: '', imageUrl: '' };
    this.selectedFile = null;
    this.imagePreview = null;
    this.statusMessage = '';
    this.cdr.detectChanges();
  }

  saveItem(): void {
    if (!this.formModel.title || !this.formModel.category) {
      this.statusMessage = 'Preencha título e categoria.';
      return;
    }

    if (!this.editingId && !this.selectedFile) {
      this.statusMessage = 'Selecione uma imagem para o novo projeto.';
      return;
    }

    this.isSubmitting = true;
    this.statusMessage = 'Salvando projeto...';
    this.cdr.detectChanges();

    const upload$: Observable<string> = this.selectedFile
      ? this.cloudinaryService.uploadImage(this.selectedFile)
      : of(this.formModel.imageUrl);

    upload$.pipe(
      switchMap((finalImageUrl) => {
        const payload: PortfolioItem = {
          ...this.formModel,
          imageUrl: finalImageUrl
        };

        return this.editingId
          ? this.portfolioService.update(this.editingId, payload)
          : this.portfolioService.create(payload);
      })
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.resetForm();
        this.statusMessage = 'Projeto salvo com sucesso!';
        this.cdr.detectChanges(); // Destrava o botão na hora!
        this.loadItems();
      },
      error: () => {
        this.isSubmitting = false;
        this.statusMessage = 'Erro ao salvar. Verifique as configurações do Cloudinary ou sua sessão.';
        this.cdr.detectChanges();
      }
    });
  }

  deleteItem(id?: string): void {
    if (!id || !confirm('Tem certeza que deseja remover este projeto da galeria?')) return;

    this.portfolioService.delete(id).subscribe({
      next: () => this.loadItems(),
      error: () => {
        this.statusMessage = 'Erro ao excluir o projeto.';
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}