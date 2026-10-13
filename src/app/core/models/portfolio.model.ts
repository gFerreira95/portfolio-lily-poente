
export interface PortfolioItem {
  id: string; // ID único que virá da base de dados
  title: string; // Ex: "CLUBE DO LIVRO"
  category: string; // Ex: "Branding e design da marca" ou "ARTE VISUAL"
  description?: string; // Opcional, para abrir um modal ou página de detalhe
  imageUrl: string; // O URL da imagem principal que virá do Cloudinary/AWS S3
  tags?: string[]; // Ex: ['colagem', 'editorial', 'post']
}