# Shadowrun · Table de jeu

Prototype indépendant en français pour préparer et mener une campagne. Node.js 22 ou supérieur, sans dépendance externe.

## Démarrer

Depuis le dépôt : `npm start`. Le serveur utilise le port 3000 (variable `PORT` pour le changer). Tests : `npm test`.

## Première version

- Création, modification et suppression de PJ, PNJ principaux et secondaires, avec champs structurés et notes libres.
- Catalogue d'objets, accessoires, armes, armures, sorts, programmes et véhicules.
- Règles et aide-mémoire saisis par le meneur, recherche globale dans toutes les fiches.
- Lanceur Anarchy V2 : réserve de 1 à 100 d6, dés de risque à succès doublés, RR 0–3, avantage / désavantage, complications, seuil facultatif et relance à 1 Anarchy conservant la complication initiale. Historique de session (20 jets).
- Grille tactique avec placement et déplacement des pions associés aux personnages.
- Sauvegarde locale dans le navigateur, import/export JSON. Exportez régulièrement : les données ne sont ni synchronisées ni sauvegardées sur le serveur.

## Référence des règles

Les règles standard du lanceur ont été vérifiées dans le livre Anarchy V2, pages imprimées 64–65 (tests et conditions), 70–71 (risque et RR) et 77 (relance). Le point d’Anarchy est à décompter manuellement. Les désastres sont indiqués comme échecs par défaut, sous réserve de l’arbitrage du meneur. Aucun catalogue officiel complet n’est fourni.

## Limites

Pas encore de calcul de réserve depuis une compétence structurée, d’annulation de succès liée à l’essence, de résolution des tests opposés, de conséquences narratives automatiques, de règle optionnelle de risque, de carte illustrée, de gestion d’initiative, de campagnes multiples ni de partage multijoueur. Aucun compte ou contrôle d'accès : le serveur sert uniquement les fichiers statiques et ne reçoit pas les campagnes.

## Sources de travail et validation V0.3

Les rubriques de fiche sont basées sur `Anarchy_v2_Feuille_de_perso_2p_VF_Combo.pdf`, pages PDF 1–2. Les champs numériques restent vides par défaut ; les compétences, RR et blessures sont saisis manuellement. Aucun contrôle de création de personnage, calcul de coût, de maximum par métatype n’est automatisé sur les fiches.

La bibliothèque distingue les sources consultées des travaux restants. L’écran du meneur a été consulté notamment pour les exemples de tests (page PDF 15) et le risque (page PDF 4). La France des Ombres sert de guide de contexte SR6 : seul un guide de lecture tiré du sommaire a été intégré, sans conversion de statistiques. Le supplément Cadeau est accessible mais son intégration détaillée reste à faire. Le livre principal est maintenant accessible en six parties (P1, P2, P3-1, P3-2, P4 et P5). La lecture ciblée de P1 a permis l’intégration des règles du lanceur ; le reste du livre reste à étudier et intégrer progressivement. Les fichiers PDF et leurs extractions restent hors du dépôt et ne sont pas servis par l’application.

Vérification : 12 tests Node (dés, profils, compatibilité, dés de risque, RR, complications, conditions, relance et rejet des paramètres invalides). Parcours Chromium vérifié : création de PJ avec attributs et compétences, conservation après rechargement, modification, recherche d’une compétence, création d’objet, affichage des huit références, dés de risque, conservation de la complication lors d’une relance, rejet d’une réserve de risque excessive, recherche documentaire et placement d’un pion. Ce contrôle utilise des données de test dans un navigateur temporaire, sans toucher aux campagnes utilisateur.

## Publication sur GitHub Pages

Les fichiers de l’interface sont statiques et compatibles avec GitHub Pages ; Node.js n’est pas nécessaire sur cet hébergement. Les chemins des ressources sont relatifs pour fonctionner sous `/Logiciel-Shadowrun/`.

Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch → Branch : main → / (root) → Save**. Attendre la fin de la publication indiquée par GitHub.

Adresse attendue après activation : https://stouf21.github.io/Logiciel-Shadowrun/ . Cette adresse ne fonctionne que si GitHub Pages est activé et le déploiement a réussi. Les sauvegardes locales sont propres au navigateur et à cette origine ; pour déplacer une campagne depuis une autre adresse, l’exporter puis l’importer sur le site.

## Thème Anarchy V2 (V0.4)

Identité visuelle inspirée des documents V2 : jaune ocre, noir, fonds papier clairs, titres rouille et accents violets. Navigation avec pictogrammes, fiches, dialogues, dés et grille tactique adaptés, affichage responsive et focus clavier visibles. Les données de campagne et leur format restent compatibles.

Les polices Permanent Marker et Barlow Condensed sont hébergées localement, sans requête à un service de polices. Leurs licences Apache 2.0 et SIL OFL sont conservées dans `assets/fonts/`. Les éléments graphiques de l’interface sont originaux ; aucune illustration ni couverture du livre n’est publiée.

Vérification du thème : parcours fonctionnel Chromium conservé, polices locales chargées, absence de débordement sur les vues principales en 390, 768, 1024 et 1440 pixels, saisie et affichage des fiches sur mobile.
