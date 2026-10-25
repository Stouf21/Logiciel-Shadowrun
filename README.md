# Shadowrun Anarchy · Écran du meneur

Application indépendante en français pour préparer et mener une campagne d’Anarchy V2. Version 0.11.0, en JavaScript natif avec Leaflet 1.9.4 hébergé localement pour la cartographie.

## Démarrer

Node.js 22 ou supérieur. Depuis le dépôt : `npm start` (port 3000, variable `PORT` configurable). Tests : `npm test`.

## Campagne Dijon 2082

Tableau de bord et dossiers reliés de personnages, corporations, factions, quartiers / zones, lieux, scénarios, indices, secrets et événements. Une campagne neuve charge 115 dossiers et 130 liens : notamment 18 corporations, 6 factions et 16 personnages. Les corporations possèdent leur propre type ; les anciennes sauvegardes sont reclassées en conservant les identifiants et annotations. Chaque dossier est modifiable et distingue informations publiques, connues des PJ, rumeurs, découvertes et secrets du MJ masqués par défaut avec « Révéler ». Les valeurs inconnues restent « À définir » ; aucune caractéristique de jeu n’est inventée.

Les anciennes fiches de jeu, dont Lim, BOYCOW et Noah lorsqu’elles existent dans votre sauvegarde, restent intactes et se relient à leurs dossiers. La fusion est répétable et conserve vos modifications. Le menu « Corporations & factions » propose deux onglets distincts. « Carte » permet de choisir Dijon, puis d’ouvrir sa carte ou ses quartiers et zones. Relations et Chronologie ne figurent plus au menu ; les liens entre dossiers et les événements enregistrés restent dans la campagne.

Les recherches sont repliées derrière un bouton, y compris la barre globale et les filtres de carte, des corporations, des listes et des règles. La recherche des dossiers propose des filtres par type, métatype, statut vital, corporation, faction, quartier, sécurité, scénario et découverte. Une correspondance dans un secret reste masquée jusqu’à révélation explicite. Les exports incluent aussi les notes et secrets du meneur.

[Bilan de l’intégration initiale V0.8 : architecture, données et inconnues](docs/DIJON_2082_INTEGRATION.md).

## Personnages et fiches

- Une liste unique de personnages : cliquer sur le nom ou « Consulter la fiche » ouvre en priorité la fiche de jeu. « En savoir plus sur le personnage » ouvre son dossier narratif. Les PJ / PNJ déjà créés gardent leur profil et leurs notes. Un personnage sans profil affiche une fiche vide avec « Compléter la fiche », sans inventer ni enregistrer de statistiques lors de la consultation.
- Présentation recto-verso adaptée des rubriques de `Anarchy_v2_Feuille_de_perso_2p_VF_Combo.pdf` (pages PDF 1–2) : attributs, Anarchy, compétences, connaissances, armes / sorts et type, mots-clés, comportements, répliques, essence, nuyens, blessures, cyberdeck, trois véhicules / drones, atouts et équipement.
- « Modifier la fiche » permet de compléter les valeurs ; « Imprimer / PDF » utilise l’impression du navigateur. Une fiche standard tient sur deux pages A4 ; un contenu très long peut nécessiter des pages supplémentaires.
- La présentation est adaptée à l’écran ; le PDF original et ses illustrations ne sont pas publiés.

## Compétences et atouts

- Les 14 compétences de base sont référencées (livre V2, p. 54), avec familles et indications de spécialisations. L’attribut dépend de l’action et reste sélectionnable.
- 205 atouts nommés et modèles de construction dans le répertoire général, tirés des exemples et tableaux des chapitres du livre : équipements, armes, armures, drogues, cyberware, bioware, contacts, esprits mentors, focus, pouvoirs d’adepte, cyberdecks, véhicules et drones. Les atouts pour PNJ corrompus sont signalés. Chaque entrée indique sa source.
- Le jeu autorise la construction d’atouts : ce répertoire n’est pas une limite fermée à tous les atouts possibles. « Compétences & atouts » permet d’ajouter ses propres références, également depuis la création d’un personnage.
- Dans les fiches et leur création, seuls les atouts applicables aux personnages sont proposés : les catégories Drone / Véhicule, leurs modèles et les créations ciblant un engin sont exclues. Les équipements de rigger portés par le personnage (par exemple une console) restent disponibles. Les anciennes associations d’engins sont conservées séparément, sans suppression.
- Dans l’éditeur, filtrer la liste, sélectionner une référence puis « Ajouter à la fiche ». Indice, attribut, spécialisation appliquée et RR sont renseignés par compétence. RD = indice + attribut + 2 si la spécialisation est appliquée. Une spécialisation appliquée requiert un indice d’au moins 1.
- Les atouts sélectionnés conservent leur nom, famille, niveau et coût en essence ; leurs effets et améliorations sont à préciser avec le meneur en consultant la page source. Les effets des créations personnelles sont repris sur la fiche.
- Les anciennes notes libres sont conservées, visibles et éditables ; aucune interprétation automatique ne risque de les remplacer.

## Dés et couleurs

Lanceur standard V2 : réserve de 1 à 100 d6, dés de risque remplaçant des dés ordinaires, succès doublés, RR 0–3, avantage / désavantage, seuil facultatif et complications. Une relance remplace les succès et conserve la complication initiale. Historique de session limité à 20 jets. Références : livre p. 64–65, 70–71 et 77.

Des cubes 3D à six faces, avec points et animation de roulé/rebond, représentent les d6. Le résultat est déterminé par le moteur de règles et révélé après l’animation ; les relances gardent leur mécanique. Les préférences de réduction des animations sont respectées.

Deux sélecteurs de couleur distinguent les dés ordinaires et les dés de risque. Les couleurs doivent être différentes et sont mémorisées dans ce navigateur. Le texte choisit un contraste clair ou sombre selon le fond ; les dés restent séparés par libellé et les succès portent une étoile.

Les points d’Anarchy sont décomptés manuellement. Le meneur arbitre les complications et les exceptions aux désastres. Les tests opposés, les annulations de succès liées à l’essence et la règle optionnelle de risque ne sont pas automatisés.

## Règles classées

85 synthèses originales en dix thèmes : personnages / création, tests / risques, action / combat, blessures / soins, Anarchy / narration, physique / social, magie / astral, Matrice, véhicules / drones, PNJ / meneur. Filtres par thème, recherche insensible aux accents, options signalées et pages imprimées citées à chaque entrée. La recherche globale retrouve aussi ces synthèses. Les notes et règles personnelles restent modifiables séparément.

Ce récapitulatif couvre les familles de mécanismes, avec leurs principales procédures, formules et exceptions. Il condense le livre ; il ne reproduit pas chaque ligne des tables d’équipement, de sorts, de bestiaire ou des profils de scénarios. Consulter la page source pour les conditions détaillées d’une entrée particulière. Les variantes décrites dans l’aide ne sont pas activées automatiquement dans le lanceur.

## Corporations

L’onglet « Corporations », dans le menu commun avec les factions, regroupe les dossiers corporatistes de campagne et douze références de départ : les dix AAA présentées par le livre V2 (p. 30–35), Omnistar et l’alliance French Touch (p. 36). Les fiches résument secteurs, siège, direction et source. Ces données correspondent à la présentation de cette édition, sans classement chronologique recalculé.

Recherche par nom, sigle, activité, direction ou contenu des notes ; filtres par classement et relation avec le groupe. Les dossiers de campagne sont liés aux références antérieures, dont l’édition reste accessible. Chaque dossier permet de noter contacts / filiales / implantation locale, objectifs, secrets du meneur et notes de campagne. Les informations sont personnalisables, et des corporations propres à la campagne peuvent être créées ou supprimées.

Les dossiers modifiés ou personnels sont conservés localement dans la campagne et inclus dans l’export/import JSON. Les anciennes sauvegardes sans cette collection retrouvent les références de départ ; une liste explicitement vide reste vide. Modifier une copie n’altère pas les données de référence du code.

## Campagne et sauvegarde

Catalogue d’objets, sorts et autres ressources saisis par le meneur, aides documentaires et recherche globale.

Dans **Carte → Dijon**, le sélecteur « Fond de carte » propose un **plan de rues OpenStreetMap** et l’**illustration cyberpunk**. Les deux vues permettent de déplacer le fond par glisser-déposer, zoomer avec la molette / les boutons / le pincement tactile et revenir au cadrage initial avec « Recentrer ».

- « Tracer un itinéraire » : cliquer pour ajouter des étapes, déplacer les points par glisser-déposer, retirer la dernière étape ou effacer le tracé. Le trajet est sauvegardé séparément sur chaque fond, avec au maximum 100 étapes.
- Sur le plan des rues, « Calculer par les rues » demande un trajet **en voiture** au service public OSRM et affiche une distance et une durée indicatives, hors circulation. Modifier une étape retire le précédent calcul routier. Si le service est indisponible, le tracé libre reste disponible.
- « Action sur la carte → Placer un personnage » : choisir le personnage, cliquer pour placer son pion, puis le déplacer par glisser-déposer.
- « + Ajouter un lieu » : cliquer sur un emplacement puis saisir le nom, le type (boutique, lieu important, bar / restaurant, clinique, planque ou type personnalisé), une description facultative et un quartier éventuel. Le repère et son dossier sont créés ensemble, sur le fond choisi. Les boutiques et lieux importants ont un symbole distinct.
- Les nouveaux lieux apparaissent aussi dans le menu « Lieux » et dans la recherche. Les notes privées sont masquées ; un repère entier peut être réservé au MJ. Les rattachements à un quartier secret ne sont pas exposés dans les informations publiques.
- « Positionner un lieu existant » : choisir un dossier puis cliquer sur son emplacement. Un clic sur un repère propose son dossier, sa modification, son déplacement ou son retrait de la vue. Le dossier et sa position sur l’autre fond sont conservés lors d’un retrait. Les onze repères historiques restent fixes sur l’illustration.
- « Filtrer la carte » : autorité, corporation, faction, sécurité, type, noms et informations MJ. Les secrets restent masqués à l’ouverture.

Le fond de rues représente la Dijon actuelle ; il nécessite Internet. Les repères géographiques sont renseignés par le meneur : aucune conversion automatique de l’illustration artistique en GPS n’est effectuée. Le plan et le calcul routier n’utilisent pas de clé Google ou de compte applicatif. Les crédits OpenStreetMap restent visibles sur la carte ; Leaflet et sa licence BSD sont conservés dans `assets/vendor/leaflet/`.

L’illustration originale `assets/dijon-cyberpunk.png` garde les onze repères et leurs coordonnées historiques. Les anciens pions sont conservés sur cette vue ; les positions géographiques, vues / zooms et itinéraires résident dans la collection facultative `mapState`. La validation des imports couvre leurs coordonnées, étapes, références et géométries routières. Les anciens lieux et pions ne sont pas déplacés automatiquement. L’illustration et son tracé libre restent utilisables sans les services de tuiles ou de routage, une fois l’application chargée.

Les campagnes et listes personnelles résident exclusivement dans le localStorage du navigateur ; le serveur applicatif ne reçoit aucune campagne. Le navigateur contacte OpenStreetMap pour le fond de rues et, sur demande de calcul routier, transmet les coordonnées des étapes à OSRM ; les noms et notes de campagne ne sont pas transmis au routage. Export / import JSON inclut les personnages, sélections, listes personnalisées, corporations, pions, cartes / vues / itinéraires et tout l’univers de campagne (dossiers, relations et réglages). L’import remplace la campagne et ses listes après confirmation. Exporter régulièrement : aucune synchronisation ni sauvegarde distante n’est fournie. Les anciennes sauvegardes restent compatibles. Une sauvegarde illisible est protégée contre l’écrasement et peut être exportée pour récupération.

Pas encore de contrôle des coûts de création, de maxima par métatype ni d’application automatique des effets d’atouts, de déduction d’essence ou de calcul des seuils de blessures. Pas de compte, partage multijoueur, campagnes multiples ni outil de suivi de l’ordre des narrations.

## Sources et thème

Les six parties du livre principal sont consultables dans les pièces jointes de la conversation de travail. Les PDF et extractions restent hors du dépôt. La France des Ombres est une référence de contexte SR6 : guide de lecture du sommaire intégré, sans conversion de statistiques. L’intégration détaillée du supplément Cadeau reste à poursuivre.

Thème inspiré des documents V2 : jaune ocre, noir, fonds papier, titres rouille et accents violets. Polices Permanent Marker et Barlow Condensed hébergées localement ; licences Apache 2.0 et SIL OFL conservées dans `assets/fonts/`. Graphismes d’interface originaux.

## Vérifications

53 tests Node : cinq tests de création / positionnement de lieux, rattachement aux quartiers, secrets, retrait par vue et conservation des repères historiques ; huit tests de compatibilité et validation des cartes, conversion des anciens repères, distances et routage, ainsi que douze tests de chargement / fusion de Dijon, recherche protégée, relations, carte, reclassement des corporations et aperçu des fiches sans statistiques, en complément des vérifications de dés et risque, relances, profils, sélections, compatibilité des sauvegardes, export/import des données, listes personnalisées, réserve de dés et contrastes des couleurs, séparation des atouts corps / engins, recherche des synthèses classées, compatibilité et sauvegarde des corporations et annotations.

Parcours Chromium V0.6 : cubes à six faces et points, animation effective puis révélation, relance, réduction des animations, carte Dijon (image, repères, zoom et pions après rechargement), règles (85 entrées, thèmes, quatre options et recherche), anciens atouts d’engins conservés séparément, puis régression complète : création par sélection, ajout d’une référence personnelle depuis le formulaire sans perdre la saisie, sélection de compétences personnelles, fiche recto-verso et impression PDF A4 de deux pages, modification et rechargement, export/import JSON, couleurs distinctes persistantes, relances, affichage mobile et préservation des anciennes notes. Données de test isolées des campagnes utilisateur.

## Publication sur GitHub Pages

L’interface est statique : Node.js n’est pas nécessaire sur cet hébergement. Chemins relatifs compatibles avec `/Logiciel-Shadowrun/`.

Dans GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch → Branch : main → / (root) → Save**. Attendre la publication indiquée par GitHub.

Adresse : https://stouf21.github.io/Logiciel-Shadowrun/ . Les sauvegardes sont propres à l’origine du site et au navigateur. Pour déplacer une campagne depuis une autre adresse, l’exporter puis l’importer sur le site.

Parcours Chromium V0.7 : ouverture du menu, douze références (dont dix AAA), filtres, recherche par sigle, édition des relations et annotations, création / suppression, rechargement, export / import, recherche globale dans les contacts et secrets, contenu HTML traité comme texte, liste / dossier / formulaire utilisables en 390 et 768 pixels. Ancien PJ conservé, dés et aide-mémoire accessibles.

Parcours Chromium V0.8 : préservation de Lim, BOYCOW et Noah, dossiers reliés, masquage des secrets et recherche protégée, édition, filtres, relations, chronologie, onze coordonnées de carte inchangées, pions et export/import ; création de dossier et liaison explicite à une fiche de jeu ; anciens dés, corporations et règles accessibles ; dix sections vérifiées en 390 et 768 pixels, impression standard de deux pages A4.

Parcours Chromium V0.9 : menus simplifiés, onglets Corporations / Factions et reclassement d’une véritable sauvegarde V0.8 sans perte des profils, notes ni liens ; fiche de jeu prioritaire et bouton vers le dossier, complétion d’un profil sans doublon ; Carte → Dijon → Quartiers et zones ; recherches repliées / déployées et filtres distincts corporation / faction ; export/import et rechargement ; compatibilité des listes, règles et dés ; affichage en 390 et 768 pixels et PDF A4 de deux pages.

Parcours Chromium V0.10 : zoom boutons / molette, déplacement du fond sans déplacer les pions, étapes déplaçables, géométrie routière et invalidation après modification, erreurs / annulation de requêtes, deux fonds indépendants, anciens repères et pions conservés, positions géographiques et dossiers, filtres et masquage MJ, export/import, rechargement, affichage 390 / 768 pixels, pincement à deux doigts et déplacement tactile, puis repli illustré quand les tuiles sont indisponibles. Les tests utilisent des tuiles et réponses OSRM simulées : l’accès réel à ces services n’est pas validé depuis l’environnement cloud. Les dépendances cartographiques sont servies localement ; aucun nouveau service Node ni compilation n’est nécessaire.

Parcours Chromium V0.11 : ajout de boutique et lieu important depuis un clic sur les deux fonds, validation du formulaire, type personnalisé, notes privées, lien au quartier, recherche des nouveaux lieux, édition, déplacement, retrait sur une vue, secrets masqués par défaut, rechargement et export/import. Vérification des formulaires en 390 / 768 pixels, puis régression des zooms, déplacement de vue, tracés, routage et pions. Les tests de services externes restent simulés.
