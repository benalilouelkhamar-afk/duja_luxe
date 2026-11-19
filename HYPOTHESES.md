# Points à confirmer avec DUJA LUXE

Tout ce qui a été supposé pour la démo. Chaque point se change dans `data/settings.ts` ou `data/products.ts` (cherchez `TODO`).

## Contact et marque
- [x] **WhatsApp** : `212651508257` (06 51 50 82 57), le numéro qui reçoit les commandes. L'ancien numéro des posts (0775354815) n'est plus utilisé.
- [ ] **TikTok** : aucun compte trouvé, le bouton est masqué (`contact.tiktok: null`).
- [ ] **Logo** : le zip ne contenait pas de logo. J'ai dessiné un logo provisoire d'après la description (cercle lilas, couronne, nœud, « DUJA LUXE » en serif noir). À remplacer par le vrai fichier (PNG ou SVG).
- [ ] **Domaine** : `siteUrl` = `https://duja-luxe.vercel.app` provisoire (dujaluxe.ma ou .com ?).
- [ ] Textes « من نحن » et tagline « Style • Elegance • Quality » : rédigés par moi, à valider.

## Prix et produits
- [ ] **Prix** : seule la veste rose a un prix connu (**149 DH**, vu sur Instagram). Les autres sont à `price: null` → « السعر عبر واتساب ».
- [ ] Les photos sont associées aux produits d'après ce qu'elles montrent. Les noms de fichiers du zip ne correspondaient pas toujours au contenu (ex. `04_veste_cuir_bordeaux_zip` montre une veste marron ceinturée) : j'ai suivi l'image, pas le nom.
- [ ] **Veste en cuir** : proposée en noir, marron et bordeaux. Le « rose » était en fait un autre article (la veste rose, voir plus bas), donc retiré des couleurs de la veste en cuir.
- [ ] **Photos par couleur** : les photos « veste seule » (noir, marron, bordeaux) ont été découpées à partir des photos duo, avec un fond studio refait. Des photos d'origine, une veste par couleur, seraient encore mieux.
- [ ] **Veste courte** (« كمية محدودة ») : la photo choisie est la veste marron courte ceinturée.
- [ ] **T-shirt** : la seule photo de haut est un t-shirt rayé à manches longues (couleur mise : blanc).
- [ ] **Parka** : couleur mise « kaki ».
- [ ] **4 pièces en plus**, vues sur les photos mais absentes de la liste : veste cuir bicolore bordeaux, veste camel à poches, chemise rose, **veste rose (149 DH, nouvelle photo)**. Noms, tailles et couleurs à confirmer.
- [ ] **4 nouvelles pièces** ajoutées avec leurs photos : chemise en satin beige, jupe midi effet cuir marron, jupe midi plissée beige, robe longue fleurie rose. Prix, tailles et couleurs à confirmer. Plus aucun article de démo dans la boutique.
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
- [ ] Le panier est enregistré dans le navigateur de la cliente (localStorage). La commande est envoyée **uniquement par WhatsApp** : aucune base de données, aucun e-mail. La commande n'arrive que si la cliente appuie sur « Envoyer » dans WhatsApp.
- [ ] La référence (ex. `DL-K3F9Q`) est créée par le site au moment de la commande ; elle sert juste à retrouver la conversation.
- [ ] Les photos produit semblent être des visuels de catalogue : vérifier que Duja a le droit de les utiliser sur un site.
