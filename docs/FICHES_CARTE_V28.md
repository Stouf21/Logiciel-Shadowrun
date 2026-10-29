# Fiches et carte — version 0.28

## Effets d’atouts et lignes de la fiche

Le nom de l’atout occupe une ligne du modèle fourni. Chaque ligne d’effet occupe ensuite une ligne de **17,008 points**, le pas exact des traits du verso original. Le texte est découpé selon la largeur disponible avec les mesures de la police du navigateur. Les rubriques du PDF, les couleurs et le format des deux faces sont conservés. Les contenus qui dépassent les 35 lignes restent accessibles dans les compléments imprimables.

Le papier affiche les effets retenus, pas les instructions de construction de l’atout, le prix, les prérequis ou les mentors proches. Pour un esprit mentor, seuls les domaines sélectionnés dans `rrChoices` apparaissent, ainsi que son comportement obligatoire. Un domaine non renseigné n’est pas choisi à la place du meneur. Les effets fixes et les notes personnelles sont conservés. Le texte complet de référence reste enregistré et consultable pendant l’édition ou dans l’aide au survol ; il n’est pas remplacé par le résumé imprimé.

## Essence

Le livre fourni indique que l’Essence démarre à **6** et baisse avec les implants **sans pouvoir remonter** (p. 60). L’ajout d’un atout coûtant −1 fait donc passer un total de 6 à 5 ; un coût de 0,5 est traité de la même façon. Les coûts sont stockés comme des nombres positifs et imprimés avec le signe moins.

Le calcul utilise le total actuel du personnage. Si ce total est vide, l’acquisition du premier implant utilise la référence de 6. Les anciennes sauvegardes et leurs totaux saisis ne sont pas recalculés à l’ouverture ou à l’importation.

Le coût déjà déduit est mémorisé sur la ligne (`essenceSpent`). Une augmentation au-delà de ce coût déduit seulement le supplément. Une baisse du coût, une désactivation de RR ou le retrait de l’atout ne restitue pas d’Essence. Revenir à un coût déjà compté ne le déduit pas à nouveau. Le total reste modifiable pour une correction du meneur.

L’éditeur complet montre le total provisoire pendant l’ajout ou l’édition d’atouts. Retirer un ajout non enregistré ou annuler l’éditeur annule aussi cette prévision ; l’enregistrement ne la déduit pas une seconde fois. Une erreur de stockage conserve la fiche précédente et une nouvelle tentative ne crée pas de perte supplémentaire. Les champs annexes de magie, soins et social restent sous le contrôle du meneur.

## Menu au clic droit sur la carte

Un clic droit sur le fond, un repère ou un contour ouvre les actions possibles à cet emplacement. Le menu permet de créer un lieu, placer un personnage, positionner un lieu existant, démarrer ou poursuivre un itinéraire, calculer le trajet routier, dessiner une zone ou un bâtiment, modifier un contour, zoomer et recentrer.

Les placements demandent de choisir explicitement le personnage ou le lieu ; le point du clic droit est conservé jusqu’à validation. Les filtres et la visibilité des secrets restent respectés. Commencer un nouvel itinéraire demande confirmation s’il remplace un tracé existant.

Pendant un dessin, les actions deviennent : ajouter un sommet ici, fermer le contour, retirer le dernier sommet ou annuler le contour. Le premier sommet d’un dessin commencé depuis le menu est le point du clic droit. Fermer reste indisponible avant trois points.

Ouvrir ou fermer le menu ne modifie pas la campagne. Les erreurs de sauvegarde restent visibles et permettent une nouvelle tentative. Le menu se ferme avec Échap, un clic ailleurs, un déplacement de la vue, un changement de fond ou en quittant la carte. Les touches Menu / Maj+F10 l’ouvrent aussi ; les flèches, Début et Fin parcourent les actions disponibles. Le menu tient dans la fenêtre, y compris sur un petit écran. Le menu du navigateur reste disponible hors de la carte et sur ses contrôles d’attribution.
