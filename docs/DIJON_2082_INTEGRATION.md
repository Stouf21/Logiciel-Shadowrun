# Intégration de la campagne de Dijon 2082 — version 0.8.0

## Architecture conservée

Le projet existant est une interface statique en JavaScript natif et modules ES, HTML et CSS, sans framework ni compilation. Le serveur Node expose uniquement les ressources autorisées ; GitHub Pages sert les mêmes fichiers avec des chemins relatifs. La campagne reste dans le navigateur, sous la clé `shadowrun-table-v1`.

Avant cette intégration, les PJ / PNJ, objets, sorts et notes de règles étaient stockés dans `entries`, les profils détaillés dans `entries[].profile`, les pions dans `tokens` et les corporations dans une collection dédiée ou leurs références de départ. Les lieux étaient les onze repères de la carte. Il n’existait pas de collections structurées de scénarios, quartiers, indices ou relations.

Les fiches de jeu, compétences, atouts, dés 3D, synthèses de règles, corporations, carte, sources et sauvegardes sont conservés. La couche narrative `world` s’ajoute à la campagne ; elle ne remplace pas les caractéristiques Anarchy V2.

## Données intégrées

Une campagne neuve charge **115 dossiers et 130 relations** :

| Type | Nombre | Contenu |
| --- | ---: | --- |
| Personnages | 16 | Anilla, Osvald, David, son ami troll, son voisin américain, le chauffeur, Karl, Léa, le troll chromé, Kassy, Noah, Sarah, Malik, Lim, BOYCOW et l’enfant à la main cybernétique |
| Factions | 24 | 14 groupes ou autorités de campagne, complétés par les références corporatistes existantes ; French Touch et Renraku sont reliés à leurs dossiers antérieurs |
| Quartiers / zones | 19 | Les zones demandées, dont Chenôve, Talant et Quetigny à développer |
| Lieux | 39 | Cybar et Prisme, domiciles, lieux du centre, Valmy, Toison, Gastronomie, arcologie, gares, cours de Perrigny, université et hôpitaux |
| Scénarios | 3 | Affaire Anilla, disparition de Karl, refuge de Kassy ; titres de travail descriptifs |
| Indices | 6 | Biopuce, témoignage, clé de données, comlink, implant et vidéos |
| Secrets | 2 | Projet de biopuce et faux enlèvement |
| Événements | 6 | Repères relatifs ou dates à définir |

Les fiches de jeu et corporations supplémentaires présentes dans une sauvegarde produisent leurs propres dossiers liés. Les deux collections restent accessibles. Lim et BOYCOW n’ont pas été trouvés dans les fichiers du dépôt : leurs dossiers sont des emplacements « Informations à compléter ». Toute fiche présente dans le navigateur ou une sauvegarde est conservée et associée lors du chargement, notamment pour Lim, BOYCOW et Noah.

Les nouvelles données reposent sur le texte de campagne fourni par le meneur. Les noms Yusupova et Yusulov restent tels qu’ils ont été fournis. Le système reste exclusivement **Shadowrun: Anarchy V2** ; la terminologie de campagne utilise **M. Dupont / Mme Dupont**.

## Navigation et édition

Les dix sections demandées sont disponibles : tableau de bord, personnages, factions, quartiers et zones, lieux, scénarios, chronologie, relations, carte et recherche globale. Les anciens menus restent accessibles.

Un dossier réutilisable présente les informations publiques, connues des PJ, rumeurs, informations révélées, découverte, état actuel et champs propres à son type. Il propose l’édition, un portrait facultatif par URL, des notes MJ, conséquences et historique libre. Les liens permettent de naviguer dans les deux sens entre personnages, factions, lieux, scénarios, indices, secrets et événements.

Les caractéristiques des personnages ne sont pas inventées. Une fiche de jeu existante reste accessible depuis son dossier ; une nouvelle fiche de jeu se crée par une action explicite avec choix PJ / PNJ. Les relations disposent de leur propre éditeur : extrémités, type, description, confiance, visibilité et évolution.

La chronologie sépare les dates ISO des repères relatifs et inconnus : aucun ordre absolu entre scénarios n’est déduit.

## Recherche et secrets

La recherche trouve les noms, alias et contenus des dossiers, sans distinguer les accents. Les filtres combinent type, métatype, statut vital, découverte, faction, quartier, sécurité et scénario. Les territoires des factions incluent les lieux contenus dans leurs zones. La barre supérieure continue à chercher aussi dans les fiches de jeu, corporations, compétences, atouts, règles et références.

Les champs MJ sont masqués à l’ouverture, y compris les notes des anciennes fiches et des corporations. Les relations secrètes et celles reliées à un dossier entièrement secret sont masquées. Une recherche correspondant uniquement à une information MJ affiche une carte générique et un bouton « Révéler », sans afficher le texte ni le nom du dossier confidentiel. Les listes et relations offrent un affichage MJ explicite.

Le masquage concerne l’affichage local : les sauvegardes JSON contiennent aussi les informations MJ. Aucune authentification ou synchronisation n’est ajoutée.

## Carte préservée

L’image `assets/dijon-cyberpunk.png`, les onze coordonnées et les anciens pions sont conservés. Les anciennes accroches restent consultables comme suggestions préexistantes, séparées des faits de cette campagne. Les repères ouvrent les dossiers correspondants.

Les filtres portent sur l’autorité, la faction, la sécurité et le type. Une légende distingue les autorités municipales, étatiques, corporatistes, mixtes, clandestines et inconnues. Le mode MJ reste désactivé à l’ouverture. Les nouveaux lieux sans coordonnées sont listés sans placement automatique. Le meneur peut renseigner une position fiable dans un dossier de lieu ou de zone ; les onze repères hérités restent fixes dans cet éditeur.

## Fichiers créés

| Fichier | Rôle |
| --- | --- |
| `world-schema.js` | Types, champs, valeurs inconnues et validation |
| `world-data.js` | Données de campagne et relations de départ, séparées de l’interface |
| `world.js` | Fusion, association aux fiches anciennes, recherche, filtres et diagnostics |
| `world-ui.js` | Dossiers, formulaires, listes, tableau de bord, relations et chronologie |
| `secrets-ui.js` | Composant réutilisable de masquage / révélation |
| `dijon-places.js` | Onze repères extraits sans changement de données |
| `tests/world.test.js` | Dix tests ciblés de l’intégration |
| `docs/DIJON_2082_INTEGRATION.md` | Ce bilan |

## Fichiers modifiés

- `app.js` : navigation, recherche, dossiers, associations, fusion et sauvegarde.
- `campaign.js` : validation de l’univers et pions associés aux dossiers de personnages.
- `character-sheet.js`, `corporations-ui.js`, `index.html` : notes et champs MJ masqués, liens entre dossiers, interface de campagne.
- `dijon-map.js` : liens de dossiers, filtres, autorités, mode MJ et lieux non placés.
- `style.css` : composants réutilisables et adaptation aux petites largeurs, dans le thème existant.
- `server.js` : routes des six nouveaux modules.
- `catalog-data.js` : terminologie « M. Dupont ».
- `catalog-ui.js`, `catalog.js`, `character-editor.js`, `corporations.js`, `dice-ui.js`, `rules-ui.js` : références de modules actualisées pour le cache navigateur.
- `package.json`, `README.md` : version et documentation.

Aucune dépendance applicative supplémentaire. Aucun PDF, extrait privé, profil utilisateur réel ni sauvegarde de test n’est ajouté au dépôt.

## Informations laissées à définir

- Noms des corporations d’Osvald, de Valmy et de Kassy, identité précise du gestionnaire de Fontaine ; aucune fusion arbitraire avec une AAA ou Renraku.
- Nature / nom du projet, pouvoirs de la biopuce, connaissances réelles d’Anilla, cause officielle et circonstances réelles de la mort d’Osvald, éventuels responsables.
- Identités et détails manquants de l’ami troll, du voisin, du chauffeur, du troll chromé, du gang de Karl et de l’enfant ; le prénom du voisin n’est pas choisi entre James et John.
- Métatypes, caractéristiques et histoires absentes, notamment ceux de Noah, Sarah et Malik ; passé et suite de Kassy.
- Dirigeants et bâtiments secrets des Hardi’s, tutelles et niveaux de sécurité non précisés, adresses, portraits et coordonnées nouveaux.
- Dates absolues, titres définitifs, récompenses et résolutions des scénarios ; développements de Chenôve, Talant et Quetigny.

## Vérifications

`npm test` : **38 tests réussis**, dont dix nouveaux sur le chargement des données, l’intégrité / remappage des relations, la fusion répétée et sans mutation, Lim / BOYCOW / Noah, la recherche protégée, les filtres combinés, les imports invalides et les onze positions héritées.

Parcours Chromium sur une copie statique sous `/Logiciel-Shadowrun/` : données anciennes, édition et rechargement, navigation entre dossiers, secrets masqués / révélés, recherche d’alias et de contenu MJ, rendu du texte HTML comme texte, filtres combinés, création / modification de relation, chronologie, carte, pions, export/import, création d’un dossier puis d’une fiche de jeu, corporations, dés à six faces et 85 règles. Vérification des dix sections, dossiers et formulaires en 390 et 768 pixels. Impression PDF contrôlée : deux pages A4 pour une fiche standard. Les nouveaux modules et le fond répondent aussi en HTTP 200 sur le serveur Node. Les campagnes de test sont isolées des données du meneur.

Les informations et positions inconnues restent à compléter par le meneur. L’intégration ne suppose ni accès aux données d’un autre navigateur, ni validation géographique du fond artistique conservé.
