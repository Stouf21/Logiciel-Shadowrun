# Illustrations extraites du livre — V0.21

76 fichiers PNG proviennent du livre Anarchy V2 fourni par le meneur dans ses six parties P1, P2, P3-1, P3-2, P4 et P5. Le périmètre couvre les figures de matériel et les planches dont le sujet est identifiable, les portraits légendés, les métatypes et le bestiaire illustré. Les scènes narratives sans correspondance identifiable avec un élément ne reçoivent pas de modèle inventé.

Les crédits de l’Introduction nomment **Benjamin Giletti** pour les illustrations intérieures. Shadowrun : Anarchy 2.0, © 2026 The Topps Company, Inc., édition française Black Book Éditions. La galerie et ses aperçus affichent ces crédits.

## Inventaire

| Catégorie | Visuels / planches |
| --- | ---: |
| Armes | 17 |
| Armure | 1 |
| Drogues | 1 |
| Cyberware | 1 |
| Équipement | 4 |
| Focus | 2 |
| Cyberdeck | 1 |
| Véhicules | 10 |
| Drones | 9 |
| Personnages | 19 |
| Métatypes | 5 |
| Créatures | 6 |
| **Total** | **76** |

Les planches regroupant plusieurs variantes ou objets restent signalées comme planches. La figure de drone chenillé sans légende individuelle, également présente p. 240, est conservée comme modèle non identifié. Les noms des douze prétirés sont confirmés sur leurs fiches de jeu, placées après les portraits. Les personnages de la campagne locale ne sont pas remplacés par ces prétirés.

`BOOK_ART_SOURCES.json` contient la sélection revue, les objets image PDF, les pages, les regroupements, les noms et les correspondances. `book-art-data.js` ajoute les dimensions finales, le nom du fichier PNG, la page PDF et l’empreinte SHA-256. Ces identifiants rendent les choix persistants sans copier les images dans chaque campagne.

## Extraction fidèle

`scripts/extract-book-art.py` lit les objets raster du PDF et leurs masques de transparence, reconstitue une image RGBA, puis retire uniquement les marges transparentes. Les fragments de même hauteur séparés par la reliure sont juxtaposés pour reconstituer le Puzzler, la variante dorée du Predator VI, un pistolet typique, les Ares Alpha et les deux dessins de Barrett. Le procédé conserve les pixels des dessins ; les aperçus et téléchargements utilisent ces mêmes fichiers.

L’image commune des deux aéronefs p. 240 est séparée dans son espace transparent : Lockheed Optic-X2 au-dessus et Chrysler-Nissan Pursuit V au-dessous. Les fonds et textures de mise en page sont écartés. Les captures de pages utilisées pour la vérification restent hors du dépôt. Aucun PDF, texte de page ni filigrane d’achat n’est incorporé aux PNG. Les fichiers n’ont pas de blocs de métadonnées texte PNG.

Pour reproduire l’extraction, disposer de Python, PyMuPDF et Pillow, ainsi que des six PDF fournis :

```sh
python scripts/extract-book-art.py /chemin/vers/les/pdf
```

Les bibliothèques Python servent à cette préparation ; l’application reste statique, sans nouvelle dépendance Node ni service d’images.

## Correspondances et limites

24 références du catalogue disposent d’une correspondance revue : Yamaha Pulsar, Shiawase Arms Puzzler, Ares Predator IV / V / VI, Ruger Super Warhawk, Ingram Smartgun, Ares Alpha Mk II, Barret Model 122, combinaison caméléon, chopper, moto de course, monoroue, sportive, limousine, van et huit drones nommés.

Les marquages des dessins distinguent les Predator IV / V / VI ; la variante dorée du VI reste un choix alternatif. La légende « Barrett Model 122 » conserve ses deux t ; l’alias et la correspondance avec l’entrée « Barret Model 122 » du tableau sont explicites. Les exemples de catégorie sont signalés dans leurs descriptions et gardent la légende du livre. La limousine est rapprochée de la Nightsky citée dans le texte, la monoroue de la Revolution et le GMC-Bulldog sert d’exemple au van générique ; les statistiques du catalogue ne sont pas changées pour autant.

Les planches générales ne nomment pas individuellement les modèles de cyberdecks, commlinks, médikits, drogues, bras ou talismans. Elles restent proposées dans la galerie et le choix manuel. Le focus d’arme dessiné est une hache : il n’est pas attribué au couteau ou à l’épée. Les commlinks externes ne remplacent pas un commlink implanté. L’ADAV et le t-bird ne sont pas attribués au Nightwing personnel. Une illustration sans fiche correspondante ne devient pas un atout avec des valeurs inventées.

## Utilisation et sauvegardes

La priorité d’affichage est : image personnelle, choix explicite d’une illustration du livre, correspondance automatique du livre, puis interprétation dédiée de la V0.20. Les mentions affichées distinguent chaque provenance. La galerie est accessible dans Bibliothèque & sources, avec recherche repliable, catégories, agrandissement, légende, crédit et téléchargement.

La recherche globale affiche les images du livre dans Sources et les références illustrées pertinentes dans leurs catégories. Une fiche de catalogue déjà présente n’est pas doublée par sa planche dans Tout. Une même légende collective n’ajoute pas plusieurs Predator à une recherche précise déjà satisfaite par une fiche. Les illustrations seules restent distinctes des atouts et les correspondances trouvées uniquement dans les notes du MJ restent protégées.

Les choix explicites sont stockés dans `resourceArtRefs` par clé de ressource. Leur validation limite la collection et accepte uniquement des identifiants connus. Le rechargement et l’export/import les conservent ; les sauvegardes anciennes restent valides. Un échec de stockage conserve l’ancienne campagne et la sélection en cours. Supprimer une entrée personnelle retire son choix d’image. Les images choisies par l’utilisateur dans ses fichiers restent locales.
