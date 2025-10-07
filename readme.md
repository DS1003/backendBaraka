# 🚀 Backend SaaS – WooCommerce Sync & Stock Management

Un **SaaS** développé en **Node.js + Express (JavaScript)** basé sur les principes **SOLID** et une **architecture Clean/Hexagonale (DDD)**.  

> Objectif : offrir une solution complète pour **gérer produits, stocks et commandes**, avec synchronisation automatique vers **WooCommerce**.  

---

## 🎯 Features principales

- 🔐 **Auth sécurisée** : Email/Password + Google OAuth (JWT).  
- 📊 **Import Excel** : upload ou lien → extraction & parsing → insertion DB (Neon PostgreSQL).  
- 🛒 **Produits** : CRUD complet, images stockées sur **Cloudinary**.  
- 📦 **Stock** : gestion du stock, alertes critiques, envoi de mails quotidiens/hebdo.  
- 🔄 **WooCommerce API** : synchro produits & commandes (push/pull).  
- 📈 **Dashboard Stats** : ventes, commandes, ruptures de stock, graphiques pour le front.  
- 📧 **Notifications** : mails automatiques + cron jobs.  

---

### Voici les fonctionnalités à implémenter :

## Authentification
- Inscription / Connexion utilisateur (JWT).
- Connexion via Google OAuth.
- Gestion de session sécurisée.
- Chaque utilisateur a son espace isolé (multi-tenant).

## Gestion Produits
- Import d’un fichier Excel (upload ou lien URL).
- Parsing du fichier Excel pour extraire les produits.
- Stockage dans PostgreSQL (via Prisma).
- CRUD Produits (Créer, Lire, Mettre à jour, Supprimer).
- Upload d’images sur **Cloudinary** (ne pas stocker en base, seulement l’URL).
- Gestion du **stock disponible** et **stock critique (alerte SEI)**.

## WooCommerce Integration
- Paramétrage des credentials WooCommerce (API Key / Secret / URL).
- Synchronisation des produits avec WooCommerce (push DB → WooCommerce).
- Récupération des produits déjà présents sur WooCommerce.
- Synchronisation bidirectionnelle optionnelle.

## Gestion des Commandes
- Récupération des commandes depuis WooCommerce (via API REST).
- Affichage, filtrage, pagination, mise à jour du statut.
- Envoi de l’état de commande traité ou non vers WooCommerce.

## Notifications & Emails
- Alertes automatiques quand le stock atteint le niveau critique.
- Envoi de mails quotidiens ou hebdomadaires avec le récapitulatif stock.
- Notifications en temps réel (optionnel via WebSocket ou Firebase Cloud Messaging).

## Dashboard & Statistiques
- Nombre de produits, ventes, commandes synchronisées.
- Graphiques simples (via lib frontend).
- API qui expose les données pour le frontend React.


## 🛠️ Stack Technique

| Domaine           | Outils/Librairies |
|------------------|------------------|
| **Langage**      | Node.js + JavaScript |
| **Framework**    | Express.js |
| **Architecture** | Clean Architecture / Hexagonal (DDD) |
| **DB/ORM**       | PostgreSQL (Neon) + Prisma |
| **Auth**         | JWT + Google OAuth (Passport.js) |
| **Stockage**     | Cloudinary |
| **Parsing Excel**| exceljs |
| **WooCommerce**  | REST API (OAuth 1.0a / API Key-Secret) |
| **Sécurité**     | bcrypt, helmet, rate-limiter, Zod |
| **Tests**        | Jest + Supertest |
| **Mailing**      | Nodemailer + node-cron |
| **Logs**         | Winston + Sentry |
| **CI/CD**        | GitHub Actions + Docker |
| **Hosting**      | Docker + Hostinger/Render |

---


## 📂 Structure du projet

backend-saas/
├── src/
│ ├── application/ # Use Cases (business logic)
│ │ ├── products/ # CreateProductUseCase, UpdateStockUseCase
│ │ ├── orders/ # SyncOrdersUseCase
│ │ └── auth/ # LoginUseCase, SignupUseCase
│ │
│ ├── domain/ # Entités métier (sans dépendances externes)
│ │ ├── entities/ # Product, User, Order
│ │ ├── repositories/ # Interfaces IProductRepo, IOrderRepo
│ │ └── services/ # StockService, NotificationService
│ │
│ ├── infrastructure/ # Implémentations techniques
│ │ ├── db/ # Prisma schema & repos
│ │ ├── cloudinary/ # CloudinaryService
│ │ ├── woo/ # WooCommerceService
│ │ ├── mail/ # MailService
│ │ └── excel/ # ExcelService
│ │
│ ├── interfaces/ # API REST (controllers, routes, middlewares)
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── middlewares/
│ │
│ ├── shared/ # Config, enums, utils, errors
│ │ ├── enums/
│ │ ├── errors/
│ │ └── utils/
│ │
│ ├── app.js # Init Express
│ └── server.js # Start server
│
├── prisma/ # Prisma schema
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md



---

## 🗄️ Modèle de données (Prisma + DDD)

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String?
  provider  String    @default("local")
  name      String
  role      Role      @default(USER)
  wooConfig WooConfig?
  products  Product[]
  orders    Order[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model WooConfig {
  id        String @id @default(uuid())
  storeUrl  String
  apiKey    String
  apiSecret String
  userId    String @unique
  user      User   @relation(fields: [userId], references: [id])
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Float
  stock       Int
  stockAlert  Int       @default(5)
  imageUrl    String?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id        String   @id @default(uuid())
  wooId     String
  status    String
  total     Float
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}


