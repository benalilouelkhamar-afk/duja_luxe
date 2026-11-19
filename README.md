# DUJA LUXE — boutique en ligne (démo)

Maquette de boutique pour **DUJA LUXE ✨** (@duja.luxe, Bouznika). Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Pas de backend : les commandes partent sur **WhatsApp** avec un message pré-rempli, paiement à la livraison.

### Parcours de commande

1. Sur la fiche produit, la cliente choisit couleur et taille, puis appuie sur **اطلبي الآن / Commander maintenant** (grand bouton vert avec l'icône WhatsApp). « Ajouter au panier » est juste en dessous ; sur mobile, les deux boutons sont aussi dans la barre fixe en bas de l'écran.
2. Elle remplit nom, téléphone, ville et adresse, puis appuie sur **Commander maintenant · 149 DH** (le total s'affiche quand le prix est connu).
3. WhatsApp s'ouvre sur le numéro de la boutique avec toute la commande écrite et une référence (ex. `DL-K3F9Q`). Elle n'a plus qu'à appuyer sur **Envoyer**.
4. Le site affiche « شكراً Salma! / Merci Salma ! » avec la référence, et un bouton **Rouvrir WhatsApp** si WhatsApp ne s'est pas ouvert.

Depuis le panier (tiroir ou page `/cart`), « Commander maintenant » ouvre le même formulaire, puis WhatsApp, et vide le panier.

> ⚠️ C'est une **démo privée** : le site est en `noindex` (invisible sur Google) tant que `allowIndexing: false` dans `data/settings.ts`. Ne pas le publier avant l'accord de la propriétaire.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000. Pour tester la version de production :

```bash
npm run build && npm start
```

## Où modifier quoi

| Fichier | Contenu |
| --- | --- |
| `data/products.ts` | Produits : nom AR/FR, catégorie, prix, tailles, couleurs, photos, badges, description |
| `data/settings.ts` | Infos boutique : WhatsApp, Instagram, TikTok, livraison, paiement, politique d'échange, guide des tailles, FAQ « اسألي DUJA », avis clientes, villes |
| `lib/i18n.tsx` | Tous les textes de l'interface (AR + FR) |
| `public/products/` | Photos des produits |
| `public/logo.png` | Logo (aussi `app/icon.png` = favicon, `app/opengraph-image.jpg` = image de partage) |

### Ajouter un produit

Dans `data/products.ts`, copier un bloc `{ ... }` du tableau `products` et changer :

- `id` (unique, ex. `"p12"`) et `slug` (l'adresse de la page : `/produit/<slug>`, sans espaces ni accents) ;
- `name` et `description` en `ar` et `fr` (dans la description, `\n` = retour à la ligne) ;
- `category` : `jackets`, `manteaux`, `ensembles`, `hauts`, `jupes` ou `robes` ;
- `sizes` (ex. `["S", "M", "L"]`), `colors` (ids du tableau `colors` en haut du fichier) ;
- `colorImages` (facultatif) : une photo par couleur, ex. `colorImages: { noir: ["/products/veste-noire.jpg"] }`. Quand la cliente choisit la couleur (fiche produit ou petits ronds sur la carte), la photo change ;
- `isNew` (badge « جديد » + bande « Dispo الآن »), `limited` (« كمية محدودة »), `inStock: false` (« نفذت الكمية »).

Les produits marqués `// DEMO ITEM` sont des exemples inventés : **à supprimer** avant la mise en ligne.

### Fixer un prix

`price: null` affiche « السعر عبر واتساب » avec un bouton WhatsApp. Pour afficher un prix, mettre le montant en dirhams : `price: 349` → « 349 درهم » / « 349 DH ». Le total du panier s'affiche dès que tous les articles du panier ont un prix.

### Remplacer les images

1. Mettre la photo dans `public/products/` (JPG ou WebP, idéalement portrait 3:4, ~900×1200 px).
2. Mettre son chemin dans `images` du produit : `"/products/ma-photo.jpg"`. La première photo est la principale.

Si une photo manque ou ne se charge pas, un joli carré lilas avec le nom du produit s'affiche (jamais d'image cassée).

**Logo** : remplacer `public/logo.png` par le vrai logo (carré, fond transparent, ≥ 512 px), et aussi `app/icon.png` (favicon, 192 px) et `app/apple-icon.png` (180 px).

**Avis clientes** : mettre les captures du highlight « رأيك » dans `public/clientes/` puis les lister dans `reviewScreenshots` de `data/settings.ts` (ex. `"/clientes/avis-1.jpg"`). Tant que la liste est vide, 3 avis texte de démo s'affichent.

### Changer le numéro WhatsApp

Dans `data/settings.ts` → `contact.whatsapp` : format international, chiffres seulement. `06 51 50 82 57` → `"212651508257"` (numéro actuel). Mettre aussi `whatsappDisplay` (affichage page contact).

### Livraison, paiement, échange

`data/settings.ts` → `delivery` (`freeDelivery: true/false`, délai, frais), `payment`, `exchangePolicy`, `sizeGuide` (tableau du guide des tailles).

### Version française

Le bouton **AR | FR** dans l'en-tête bascule la langue (le choix est mémorisé). L'arabe est en RTL, le français en LTR.

## Déployer sur Vercel

**Option 1 — depuis GitHub (recommandé)**

1. Pousser le code sur GitHub (déjà fait : `benalilouelkhamar-afk/duja_luxe`).
2. Sur https://vercel.com/new → *Import* le dépôt → framework détecté : Next.js → **Deploy**. Aucun réglage ni variable d'environnement nécessaire.
3. Chaque `git push` sur `main` redéploie automatiquement.

**Option 2 — en ligne de commande**

```bash
npm i -g vercel
```

```bash
vercel        # aperçu
```

```bash
vercel --prod # production
```

**Mise en ligne réelle** (après accord de Duja) : mettre le domaine dans `settings.siteUrl`, passer `allowIndexing: true`, supprimer les `// DEMO ITEM`, puis ajouter le domaine dans Vercel → *Settings → Domains*.

## Structure

```
app/                 pages (accueil, /produit/[slug], /cart, /merci, /a-propos, /livraison, /echange, /contact)
components/          interface (Header, Hero, ProductCard, CartDrawer, Checkout, FloatingActions…)
data/                products.ts, settings.ts  ← à modifier
lib/                 langue (i18n), panier (localStorage), message WhatsApp, formats
public/              logo, photos produits, captures clientes
```

Voir `HYPOTHESES.md` pour la liste des points à confirmer avec la propriétaire.
