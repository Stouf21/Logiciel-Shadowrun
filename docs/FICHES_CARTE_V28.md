# Fiches et carte — versions 0.28 à 0.29

## Effets d’atouts et lignes de la fiche

Le nom de l’atout occupe une ligne du modèle fourni. Chaque ligne d’effet occupe ensuite une ligne de **17,008 points**, le pas exact des traits du verso original. Le texte est découpé selon la largeur disponible avec les mesures de la police du navigateur. Les rubriques du PDF, les couleurs et le format des deux faces sont conservés. Les contenus qui dépassent les 35 lignes restent accessibles dans les compléments imprimables.

Le papier affiche les effets retenus, pas les instructions de construction de l’atout, le prix, les prérequis ou les mentors proches. Pour un esprit mentor, seuls les domaines sélectionnés dans `rrChoices` apparaissent, ainsi que son comportement obligatoire. Un domaine non renseigné n’est pas choisi à la place du meneur. Les effets fixes et les notes personnelles sont conservés. Le texte complet de référence reste enregistré et consultable pendant l’édition ou dans l’aide au survol ; il n’est pas remplacé par le résumé imprimé.

## Essence

Depuis la version 0.29, à la demande du meneur, supprimer un atout de la fiche est une correction de préparation : son coût est restitué au total d’Essence. L’ajout d’un coût de 1 fait passer 6 à 5 ; sa suppression rend 6. Une variation de coût ajuste aussi le total, y compris pour les demi-points. Cette gestion de fiche se distingue de la règle de perte irréversible après une implantation dans la fiction (livre p. 60).

Le calcul conserve le total saisi par le meneur comme point de départ. Un total vide utilise la référence de 6 lors du premier implant. Les sauvegardes importées ne sont pas modifiées à l’ouverture. Le montant effectivement déduit est mémorisé sur la ligne (`essenceSpent`) : si l’Essence est limitée à zéro, le retrait ne peut pas restituer davantage que le montant déduit. Les anciens coûts sans ce marqueur utilisent leur valeur de fiche.

L’éditeur complet montre la même prévision lors de l’ajout, du retrait ou d’un changement de coût. Annuler laisse la fiche intacte ; enregistrer n’applique pas une seconde déduction. Une erreur de stockage conserve la fiche précédente, et une nouvelle tentative ne fait pas de double restitution. Les champs de magie, soins et social restent modifiables par le meneur.

## Lignes vides et matériel

Chaque ligne disponible des compétences, atouts, armes et sorts ouvre le choix correspondant. Les éléments déjà présents restent en place. Pour une arme ou un sort, l’emplacement cliqué reçoit le modèle choisi ; les caractéristiques complètes et la source sont conservées dans les notes. Les textes qui dépassent le papier restent accessibles dans les compléments.

Cliquer sur les titres **Cyberdeck** et **Véhicule / drone**, ou sur leur emplacement de nom vide, ouvre le catalogue correspondant, filtrable par nom. Les modèles du livre, les créations personnelles et les entrées de matériel du catalogue de campagne sont proposés. L’éditeur complet contient les mêmes listes. Le choix préremplit les champs, qui peuvent être adaptés avant validation ; annuler ne change rien.

Les cyberdecks renseignent Attaque, Firewall, notes et seuils de dommages : Firewall, Firewall +3, Firewall +6 (p. 68–69 et 210). Les suivis du DIEU démarrent à zéro (p. 218). Les véhicules / drones renseignent Autopilote, Structure, Maniabilité, Vitesse, Blindage et les seuils Structure + Blindage, 2×Structure + Blindage, 3×Structure + Blindage (p. 68–69, 238, 241). Les zéros et variantes de vitesse de vol sont conservés. Une caractéristique non définie par le modèle personnel reste vide ; elle peut être saisie par le meneur.

## Menu au clic droit sur la carte

Un clic droit sur le fond, un repère ou un contour ouvre les actions possibles à cet emplacement. Le menu permet de créer un lieu, placer un personnage, positionner un lieu existant, démarrer ou poursuivre un itinéraire, calculer le trajet routier, dessiner une zone ou un bâtiment, modifier un contour, zoomer et recentrer.

Les placements demandent de choisir explicitement le personnage ou le lieu ; le point du clic droit est conservé jusqu’à validation. Les filtres et la visibilité des secrets restent respectés. Commencer un nouvel itinéraire demande confirmation s’il remplace un tracé existant.

Pendant un dessin, les actions deviennent : ajouter un sommet ici, fermer le contour, retirer le dernier sommet ou annuler le contour. Le premier sommet d’un dessin commencé depuis le menu est le point du clic droit. Fermer reste indisponible avant trois points.

Ouvrir ou fermer le menu ne modifie pas la campagne. Les erreurs de sauvegarde restent visibles et permettent une nouvelle tentative. Le menu se ferme avec Échap, un clic ailleurs, un déplacement de la vue, un changement de fond ou en quittant la carte. Les touches Menu / Maj+F10 l’ouvrent aussi ; les flèches, Début et Fin parcourent les actions disponibles. Le menu tient dans la fenêtre, y compris sur un petit écran. Le menu du navigateur reste disponible hors de la carte et sur ses contrôles d’attribution.
