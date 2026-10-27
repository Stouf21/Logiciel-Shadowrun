# Illustrations individuelles du catalogue — V0.20

Les fichiers `assets/items/*.png` sont des créations originales produites avec l’outil de génération d’images le 27 octobre 2026 pour cette application. Ils ne sont pas extraits des illustrations des livres Shadowrun. Les noms identifient les références ; aucun logo ni texte de marque n’a été demandé dans les dessins. Les légendes « Illustration dédiée » et « Interprétation originale » distinguent ces créations des dessins officiels.

## Couverture et correspondances

Chaque référence de matériel ou de logiciel du répertoire a une case propre : **144 références et 144 positions distinctes**, dont 16 équipements, 12 armes, 4 protections, 12 drogues / BTL, 35 cyberwares, 13 biowares, 15 drones, 14 focus, 3 programmes de cyberdeck, 6 cyberdecks et 14 véhicules. Les contacts, traits, esprits mentors, pouvoirs et modèles de construction ne sont pas assimilés à des objets nommés.

`resource-art-data.js` associe chaque identifiant du livre à son nom, sa catégorie, sa planche, sa position, son rectangle de cadrage et son brief visuel. Ces briefs sont des descriptions de conception originales, contrôlées à partir des textes et exemples des chapitres du livre. Les statistiques, prix, effets et sources des atouts restent inchangés. Le dessin d’une forme non imposée par les règles, par exemple un talisman de maintien ou un implant cortical, est une interprétation artistique.

Les points distinctifs font partie des briefs : barillet du Ruger Super Warhawk, deux électrodes du Yamaha Pulsar, versions différentes des Predator IV / V / VI, lance-grenades de l’Ares Alpha, prises neurales au lieu de bras génériques, BTL Berserker / Casanova sur supports simsens, médico-kits fixes, monoroue Horizon-Doble Revolution, limousine Mitsubishi Nightsky et aile volante personnelle Artemis Industries Nightwing. Le Nightwing et la monoroue sont notamment confirmés par le chapitre Un monde mécanique, texte des véhicules du livre.

Une création personnelle portant exactement le nom et la catégorie d’une référence peut retrouver son dessin. Une catégorie ou la mention d’un drone dans une description ne suffisent jamais à sélectionner une image. Les créations inconnues proposent l’ajout d’une image personnelle. Les formes génériques de la V0.19 ont été retirées.

## Affichage

Les dix planches carrées contiennent des cases de même taille. Huit planches ont seize références chacune, `equipment` quatorze et `knives` deux. Les deux cases accessoires supplémentaires de chacune de ces dernières ne sont pas associées à des références. Chaque correspondance exposée à l’utilisateur reste unique. La planche `knives` utilise une grille de deux colonnes ; les autres utilisent quatre colonnes.

Les fichiers finaux sont générés et, lorsque nécessaire, remis en page avec l’outil d’images ; ils sont copiés sans découpage de fichier. Des rectangles de cadrage propres à chaque dessin suivent les espaces libres réels de chaque colonne. Le navigateur conserve leurs proportions dans un cadre carré et exclut les fragments des rangées voisines. Des images HTML avec `loading="lazy"` et `decoding="async"` évitent de charger toutes les planches à l’ouverture ; les vignettes d’une même planche partagent un fichier mis en cache. L’aperçu agrandi reprend exactement le même identifiant et le même cadrage. Un fichier indisponible affiche un repli sans boucle de rechargement.

## Images personnelles et sauvegardes

`resource-art-ui.js` gère l’aperçu et le choix d’une image personnelle. PNG, JPEG et WebP sont décodés dans le navigateur, redimensionnés au maximum à 1 000 pixels, puis enregistrés en WebP ; des dimensions plus petites sont essayées pour respecter une URL de données de 300 000 caractères au maximum. La transparence des images personnelles est conservée. Retirer une image personnelle revient au dessin dédié de cette référence, ou au bouton d’ajout.

La propriété facultative de campagne `resourceImages` associe une URL de données à une clé `asset:<id encodé>` ou `entry:<id encodé>`. Les deux espaces empêchent une collision entre une référence d’atout et une ressource personnelle. La V0.20 conserve les clés et les images de la V0.19. Aucun dessin intégré n’est copié dans la campagne ni dans chaque fiche de personnage.

La validation accepte uniquement les URL de données raster PNG / JPEG / WebP, avec des limites par image et par collection ; elle rejette les URL distantes et les SVG. Une image de sauvegarde illisible affiche un repli et permet de choisir un autre fichier. L’enregistrement utilise la sauvegarde atomique existante : en cas de quota dépassé, l’ancienne campagne et la sélection sont conservées. Les anciennes sauvegardes restent compatibles ; l’export/import inclut les images personnelles.

Seules les créations originales intégrées sont publiées avec le code. Les images personnelles ne sont jamais téléversées par cette fonctionnalité. La recherche vérifie les correspondances réservées au MJ avant de produire les cartes illustrées. La mise à jour d’une image remplace seulement ses vignettes pour conserver l’onglet, les filtres et la requête.
