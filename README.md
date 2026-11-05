 Lily Poente Studio - Front-end

Este é o repositório front-end do portfólio oficial do Lily Poente Studio. Uma aplicação web moderna, focada em alta performance, experiência de utilizador (UX) premium e design editorial.

O projeto foi desenvolvido utilizando as mais recentes abordagens do ecossistema Angular (Standalone Components e modo Zoneless), garantindo um carregamento ultrarrápido e uma arquitetura limpa.

 Funcionalidades Destacadas

Galeria Estilo "Folder" (Windows 11): Navegação por categorias utilizando um design imersivo de abas flutuantes e ícones dinâmicos.

Lightbox Customizado e Responsivo:

Navegação por setas no Desktop.

Suporte a gestos de arrasto (Swipe) nativo no Mobile.

Centralização inteligente com object-fit para diferentes proporções de imagem.

Painel Administrativo Seguro (CMS Interno):

Autenticação via token JWT.

Upload de imagens com integração direta ao Cloudinary.

Gestão inteligente de categorias (Dropdown dinâmico com criação de novas categorias em tempo real).

Proteção de Conteúdo: Bloqueio de clique direito (contextmenu) e função de arrastar/selecionar desativada via CSS para dificultar o download não autorizado das artes.

Integração Direta via WhatsApp: Links de contato otimizados com a API oficial (wa.me).

🛠️ Tecnologias Utilizadas

Framework: Angular 17+ (Standalone Components)

Reatividade: RxJS & Modo Zoneless (uso explícito de ChangeDetectorRef)

Estilização: SCSS (CSS Grid, Flexbox, Animações CSS puras, sem bibliotecas externas pesadas)

Hospedagem & CI/CD: Cloudflare Pages

Integrações: Cloudinary API (Imagens) e Spring Boot API (Back-end)

🚀 Como Executar o Projeto Localmente

Pré-requisitos

Node.js (versão 18 ou superior)

Angular CLI instalado globalmente (npm install -g @angular/cli)

Passos para Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/lily-poente-frontend.git


Entre no diretório do projeto:

cd lily-poente-frontend


Instale as dependências:

npm install


Configure as variáveis de ambiente:
Crie ou edite o arquivo src/environments/environment.ts com a URL da sua API (Spring Boot hospedado na Oracle Cloud) e as credenciais do Cloudinary:

export const environment = {
  production: false,
  apiUrl: 'https://seu-ip.sslip.io/api',
  cloudinaryCloudName: 'seu-cloud-name',
  cloudinaryUploadPreset: 'seu-upload-preset'
};


Inicie o servidor de desenvolvimento:

ng serve


A aplicação estará disponível em http://localhost:4200/.

📦 Deploy e Build (Cloudflare Pages)

Este projeto está otimizado para deploy no Cloudflare Pages.

Comando de Build: ng build --configuration production

Diretório de Saída: dist/lily-poente/browser

Nota sobre Budgets do Angular:
Devido ao design One-Page que concentra o CSS no componente principal, os limites de budget do angular.json foram ajustados para permitir arquivos de estilo maiores sem falhas no build do Cloudflare:

"budgets": [
  {
    "type": "anyComponentStyle",
    "maximumWarning": "15kb",
    "maximumError": "20kb"
  }
]


📝 Licença

Desenvolvido exclusivamente para o uso do Lily Poente Studio.
