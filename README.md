# Shadowrun Anarchy · Écran du meneur

Application indépendante en français pour préparer et mener une campagne d’Anarchy V2. Version 0.7.0, sans dépendance applicative externe.

## Démarrer

Node.js 22 ou supérieur. Depuis le dépôt : `npm start` (port 3000, variable `PORT` configurable). Tests : `npm test`.

## Personnages et fiches

- PJ, PNJ principaux et secondaires. Un clic sur le nom, la carte du personnage ou « Consulter la fiche » ouvre la fiche complète.
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

Le menu « Corporations » propose douze dossiers de départ : les dix AAA présentées par le livre V2 (p. 30–35), Omnistar et l’alliance French Touch (p. 36). Les fiches résument secteurs, siège, direction et source. Ces données correspondent à la présentation de cette édition, sans classement chronologique recalculé.

Recherche par nom, sigle, activité, direction ou contenu des notes ; filtres par classement et relation avec le groupe. Chaque dossier permet de noter contacts / filiales / implantation locale, objectifs, secrets du meneur et notes de campagne. Les informations sont personnalisables, et des corporations propres à la campagne peuvent être créées ou supprimées.

Les dossiers modifiés ou personnels sont conservés localement dans la campagne et inclus dans l’export/import JSON. Les anciennes sauvegardes sans cette collection retrouvent les références de départ ; une liste explicitement vide reste vide. Modifier une copie n’altère pas les données de référence du code.

## Campagne et sauvegarde

Catalogue d’objets, sorts et autres ressources saisis par le meneur, aides documentaires et recherche globale. Carte artistique de Dijon cyberpunk avec 11 repères, accroches de scénario fictives, zoom, affichage des repères et pions persistants. Le fond est une illustration originale générée, géographiquement approximative, sans données de navigation : les localisations et ajouts de campagne ne représentent pas un canon officiel. Aucune carte OpenStreetMap n’a été intégrée.

Les campagnes et listes personnelles résident exclusivement dans le localStorage du navigateur ; le serveur ne reçoit aucune campagne. Export / import JSON inclut les personnages, sélections, listes personnalisées et pions. L’import remplace la campagne et ses listes après confirmation. Exporter régulièrement : aucune synchronisation ni sauvegarde distante n’est fournie. Les anciennes sauvegardes restent compatibles. Une sauvegarde illisible est protégée contre l’écrasement et peut être exportée pour récupération.

Pas encore de contrôle des coûts de création, de maxima par métatype ni d’application automatique des effets d’atouts, de déduction d’essence ou de calcul des seuils de blessures. Pas de compte, partage multijoueur, campagnes multiples ni outil de suivi de l’ordre des narrations.

## Sources et thème

Les six parties du livre principal sont consultables dans les pièces jointes de la conversation de travail. Les PDF et extractions restent hors du dépôt. La France des Ombres est une référence de contexte SR6 : guide de lecture du sommaire intégré, sans conversion de statistiques. L’intégration détaillée du supplément Cadeau reste à poursuivre.

Thème inspiré des documents V2 : jaune ocre, noir, fonds papier, titres rouille et accents violets. Polices Permanent Marker et Barlow Condensed hébergées localement ; licences Apache 2.0 et SIL OFL conservées dans `assets/fonts/`. Graphismes d’interface originaux.

## Vérifications

28 tests Node : dés et risque, relances, profils, sélections, compatibilité des sauvegardes, export/import des données, listes personnalisées, réserve de dés et contrastes des couleurs, séparation des atouts corps / engins, recherche des synthèses classées, compatibilité et sauvegarde des corporations et annotations.

Parcours Chromium V0.6 : cubes à six faces et points, animation effective puis révélation, relance, réduction des animations, carte Dijon (image, repères, zoom et pions après rechargement), règles (85 entrées, thèmes, quatre options et recherche), anciens atouts d’engins conservés séparément, puis régression complète : création par sélection, ajout d’une référence personnelle depuis le formulaire sans perdre la saisie, sélection de compétences personnelles, fiche recto-verso et impression PDF A4 de deux pages, modification et rechargement, export/import JSON, couleurs distinctes persistantes, relances, affichage mobile et préservation des anciennes notes. Données de test isolées des campagnes utilisateur.

## Publication sur GitHub Pages

L’interface est statique : Node.js n’est pas nécessaire sur cet hébergement. Chemins relatifs compatibles avec `/Logiciel-Shadowrun/`.

Dans GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch → Branch : main → / (root) → Save**. Attendre la publication indiquée par GitHub.

Adresse : https://stouf21.github.io/Logiciel-Shadowrun/ . Les sauvegardes sont propres à l’origine du site et au navigateur. Pour déplacer une campagne depuis une autre adresse, l’exporter puis l’importer sur le site.

Parcours Chromium V0.7 : ouverture du menu, douze références (dont dix AAA), filtres, recherche par sigle, édition des relations et annotations, création / suppression, rechargement, export / import, recherche globale dans les contacts et secrets, contenu HTML traité comme texte, liste / dossier / formulaire utilisables en 390 et 768 pixels. Ancien PJ conservé, dés et aide-mémoire accessibles.
