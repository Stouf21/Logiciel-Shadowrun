# Fiche recto-verso Anarchy V2

La demande porte sur la reproduction des deux images de fiche transmises dans la conversation. Elles correspondent aux pages 3 et 4, en couleur, du document fourni `Anarchy_v2_Feuille_de_perso_2p_VF_Combo.pdf` ; les pages 1 et 2 sont la variante en noir et blanc.

Les deux fonds locaux sont dans `assets/sheets/`. Ils sont rendus depuis ces pages en 2404 × 3119 pixels, puis encodés en WebP, qualité 95. Les illustrations, titres, tableaux de référence et traits sont ceux du document fourni. La ligne de personnalisation privée de la copie, située tout en bas du recto, est exclue des visuels distribués. Le PDF, les extractions de texte et les informations personnelles ne sont pas ajoutés au dépôt.

`sheet-layout.js` exprime les coordonnées des champs en points sur le format source 600,945 × 779,528. `character-sheet.js` pose des champs HTML sur ces fonds sans écrire dans les images. Cela conserve la recherche, les lecteurs d’écran via les libellés des champs, l’édition et les sauvegardes existantes. Aucun attribut ni coût n’est déduit de la simple consultation de la fiche.

Le papier conserve ses proportions à l’écran et à l’impression A4. L’éditeur d’une case est une fenêtre HTML indépendante de la taille du papier, limitée à l’écran. Le zoom et le déplacement horizontal de la fiche sont conservés après enregistrement. Les noms et valeurs restent des données de campagne ; les visuels du fond ne sont pas copiés dans le localStorage ni dans les exports JSON.

Le recto comporte 19 compétences et 8 armes / sorts ; le verso, 35 atouts et 3 véhicules / drones. Les lignes qui dépassent ces emplacements restent dans les compléments. Les effets et sources des atouts, anciennes notes libres et champs narratifs complets y restent modifiables. Les anciens atouts d’engins y sont conservés, et les choix d’atouts du personnage gardent leur filtre.

Une fiche standard s’imprime sur deux pages. Les anciennes notes, les textes qui débordent et les lignes en plus donnent des pages de compléments ; le contenu n’est pas tronqué pour satisfaire une limite de pages. Les notes du MJ restent masquées séparément.
