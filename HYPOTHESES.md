# Points à confirmer avec DUJA LUXE

Tout ce qui a été supposé pour la démo. Chaque point se change dans `data/settings.ts` ou `data/products.ts` (cherchez `TODO`).

## Contact et marque
- [ ] **WhatsApp** : `212775354815` (vu comme 0775354815 dans les posts). Est-ce le bon numéro pour les commandes ?
- [ ] **TikTok** : aucun compte trouvé, le bouton est masqué (`contact.tiktok: null`).
- [ ] **Logo** : le zip ne contenait pas de logo. J'ai dessiné un logo provisoire d'après la description (cercle lilas, couronne, nœud, « DUJA LUXE » en serif noir). À remplacer par le vrai fichier (PNG ou SVG).
- [ ] **Domaine** : `siteUrl` = `https://duja-luxe.vercel.app` provisoire (dujaluxe.ma ou .com ?).
- [ ] Textes « من نحن » et tagline « Style • Elegance • Quality » : rédigés par moi, à valider.

## Prix et produits
- [ ] **Tous les prix sont inconnus** → `price: null` → « السعر عبر واتساب ».
- [ ] Les photos sont associées aux produits d'après ce qu'elles montrent. Les noms de fichiers du zip ne correspondaient pas toujours au contenu (ex. `04_veste_cuir_bordeaux_zip` montre une veste marron ceinturée) : j'ai suivi l'image, pas le nom.
- [ ] **Veste en cuir (4 couleurs)** : photos en noir, bordeaux et marron, mais aucune photo de la version **rose**.
- [ ] **Veste courte** (« كمية محدودة ») : la photo choisie est la veste marron courte ceinturée.
- [ ] **T-shirt** : la seule photo de haut est un t-shirt rayé à manches longues (couleur mise : blanc).
- [ ] **Parka** : couleur mise « kaki ».
- [ ] **4 pièces en plus**, vues sur les photos mais absentes de la liste : veste cuir bicolore bordeaux, veste camel à poches, chemise rose, veste rose zippée. Noms, tailles et couleurs à confirmer (ou à retirer).
- [ ] **5 articles DEMO** (blouse, 2 jupes, 2 robes) avec prix inventés et sans photo : à supprimer (`// DEMO ITEM`). Je n'ai pas ajouté de pantalon de démo, car il n'y a pas de catégorie « سراويل » dans la liste des filtres.
- [ ] Tailles et couleurs exactes de chaque pièce.
- [ ] Deux captures du zip (`19_…` et `21_…`) étaient des captures de la grille Instagram, pas des photos produit : non utilisées.

## Livraison, paiement, échange
- [ ] **Livraison gratuite** partout (`freeDelivery: true`) : toujours, ou selon la ville ou le montant ?
- [ ] **Délai** : « 24 à 72 h » supposé.
- [ ] **Paiement** : à la livraison uniquement.
- [ ] **Politique d'échange** : texte provisoire (échange sous 48 h, pas de remboursement, frais d'échange à la charge de la cliente). À valider.
- [ ] **Guide des tailles** : mesures génériques S–XL (cm), à remplacer par les vraies mesures.

## Avis clientes
- [ ] Le zip ne contenait pas les captures du highlight « رأيك » : 3 **avis de démo** inventés s'affichent. Ajouter les vraies captures dans `public/clientes/` puis dans `reviewScreenshots`.

## Technique
- [ ] Le site est en **noindex** (`allowIndexing: false`) : il n'apparaîtra pas sur Google tant que ce n'est pas validé.
- [ ] Le panier est enregistré dans le navigateur de la cliente (localStorage). La commande est envoyée **uniquement par WhatsApp** : aucune base de données, aucun e-mail.
- [ ] Les photos produit semblent être des visuels de catalogue : vérifier que Duja a le droit de les utiliser sur un site.
