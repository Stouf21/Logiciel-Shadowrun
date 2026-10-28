# Scénarios par chapitres et génération de PNJ — V0.25

## Références utilisées

- **Shadowrun: Anarchy V2**, chapitre « L’enfer, c’est les autres », pages imprimées **244–255**, extrait P5 fourni par le meneur : 25 blocs de profils métahumains. Go-ganger et rigger proposent deux variantes distinctes, soit 26 types sélectionnables.
- Page **243** : légende des statistiques et adaptation aux premiers rôles. L’indice et l’attribut entre parenthèses forment la réserve ; le premier nombre est le nombre moyen de succès. Une spécialisation peut être indiquée simplement parce que son usage est fréquent, sans être possédée. Les bonus des spécialisations possédées sont déjà compris dans leurs indices imprimés.
- Pages **81–82** : seconds rôles, valeurs moyennes et combativité. Les moyennes du profil sont conservées, avec les variantes de métatype et d’atout sélectionnées ; elles sont modifiables séparément. Les changements ultérieurs de caractéristiques ne recalculent pas automatiquement la moyenne.
- **La France des Ombres** fourni par le meneur : contexte français. Aucun recensement chiffré de Dijon, pourcentage national des cinq métatypes ou répartition chiffrée par profession n’a été identifié dans les documents consultés.

`npc-templates.js` contient les données extraites des profils, avec leurs pages, sections et branches conditionnelles. `scripts/extract-npc-templates.py` permet de renouveler l’extraction depuis le fragment PDF P5 (PyMuPDF requis). Il exclut en-têtes et pieds de page d’achat. Les PDF et leurs informations d’achat ne font pas partie du dépôt.

## Choix appliqués

Les cinq métatypes utilisent les attributs imprimés pour chaque profil. Les atouts fixes sont conservés ; les options sont tirées sans remise et les améliorations remplacent leurs versions de base. Les branches de compétences / dommages / protections correspondant aux options sont appliquées. Les variantes contextuelles restent également consultables dans « Profil source » sur la fiche (par exemple Perception en observant via un drone).

Les véhicules et drones sont séparés des atouts du personnage. Les quantités de drones des profils sont conservées ; le rigger d’élite choisit deux lots de drones ou un véhicule. Les caractéristiques non précisées restent vides ; les seuils d’engins sont calculés avec Structure / Blindage selon les règles. Une monture n’ajoute les armes correspondantes que si le profil les prévoit. Les sorts gardent les effets du profil PNJ, parfois simplifiés par rapport aux sorts des PJ.

Les premiers rôles reçoivent 4 points d’Anarchy humains ou 3 pour les autres, plus les conversions d’initiative de la page 243. Les conditions d’utilisation (RV, notamment) restent dans les notes des atouts. Les effets spéciaux nécessitant un point d’Anarchy sont rappelés dans les notes. Les profils secondaires n’inventent pas de budget d’Anarchy, essence, nuyens, niveau ou coût d’atout absent du tableau.

Les noms sont des créations aléatoires sans biographie ni affiliation imposée ; ils restent uniques dans la campagne (y compris face aux alias). Les personnages importants conservent leur fiche officielle recto-verso. Les PNJ générés utilisent une fenêtre d’informations de jeu, qui expose notamment leurs succès moyens et leur combativité.

## Répartition des métatypes

Le barème initial **non officiel** utilise France = Dijon = Humain 50 %, Elfe 15 %, Nain 10 %, Ork 20 %, Troll 5 %. Ce sont des hypothèses modifiables destinées à permettre un premier tirage ; elles ne proviennent pas d’une statistique attestée du livre. Les coefficients de profession sont également des hypothèses de campagne, avec tous les métatypes possibles. Une population locale peut être mise à zéro par le meneur ; chaque population doit totaliser 100 %.

La probabilité d’un métatype est `population_locale × coefficient_profession / somme_des_poids`. Les tirages sont indépendants : aucun quota exact n’est garanti sur un groupe de quelques PNJ. Le formulaire de génération affiche les probabilités finales et la provenance. Les réglages s’exportent avec la campagne. Une source vérifiée fournie plus tard peut remplacer les valeurs et leur provenance sans modifier les personnages déjà créés.

## Conservation des données

Le format de campagne reste compatible : `chapters` est un tableau optionnel des dossiers `scenario` ; `npcPreferences` est optionnel à la racine ; `profile.npc`, les métadonnées de compétences et `localNpcs` sur un scénario sont optionnels. `localNpcs` contient les paires dossier / fiche des PNJ propres au scénario, sans entrée dans `entries` ni personnage global dans `world.records`. Les références des chapitres ne peuvent viser que les personnages importants ou les PNJ du même scénario. Les anciennes campagnes n’ont pas à être converties au chargement.

Une ancienne frise expose des chapitres virtuels suivant son ordre existant. Au premier changement, ces chapitres deviennent une copie locale au scénario avec `legacyEventId` ; les événements, leurs dates, dossiers et liens d’origine restent conservés. Les personnages liés à un événement sont repris dans son chapitre, avec les restrictions MJ. Les personnages liés seulement au scénario restent listés séparément, disponibles pour l’ajout aux chapitres.

Chaque véhicule de chapitre est une copie indépendante avec sa référence de catalogue, d’entrée ou de propriétaire lorsque disponible. Modifier cette copie ne modifie ni un autre chapitre ni la fiche du PNJ. Retirer un personnage ne supprime que son appartenance au chapitre. La visibilité des chapitres, liens et véhicules est respectée dans la frise, les filtres et la recherche.

Le générateur prépare un groupe complet en mémoire, puis effectue une sauvegarde atomique. Une erreur de quota ne change pas l’état enregistré et conserve le même tirage pour une nouvelle tentative. Les limites sont de 300 chapitres par scénario, 300 personnages / véhicules par chapitre et 50 PNJ par génération. Les secrets MJ sont inclus dans les exports comme dans les versions précédentes.

## Portée des PNJ et reprise V0.22–0.23

Les PNJ créés par « Ajouter PNJ » restent dans le scénario et n’augmentent ni la liste Personnages, ni la liste des personnages à placer sur la carte, ni les résultats de personnages globaux. Les personnages importants ajoutés depuis le menu Personnages gardent leur fonctionnement et peuvent participer à plusieurs scénarios. Le compteur du tableau de bord compte les mêmes personnages visibles que le menu, sans inclure les fiches entièrement réservées au MJ.

Dans la préparation d’un scénario, les PNJ locaux sont affichés dans leur chapitre, même lorsque leur dossier porte l’indication MJ. Les notes privées restent derrière « Révéler ». Le répertoire « PNJ du scénario » permet aussi de retrouver les fiches retirées d’un chapitre ; « Ajouter perso. » propose les personnages importants et les PNJ de ce scénario. Un PNJ local s’ouvre dans une fenêtre compacte déplaçable qui laisse le scénario en place et permet d’utiliser le lanceur de dés. Elle affiche attributs, combativité, succès moyens, réserves / RR, attaques et blessures, avec les atouts / matériels / notes repliables. Les valeurs restent modifiables au clic. Le formulaire officiel recto-verso et l’éditeur complet ne sont pas ouverts pour ces PNJ. L’édition utilise une projection temporaire du PNJ ; seules ses données intégrées au scénario sont sauvegardées. Le format enregistré ne change pas : les valeurs et notes des PNJ déjà créés sont conservées.

Au chargement ou à l’import, les anciens couples dossier / fiche identifiables comme générés sont replacés dans les scénarios qui les référencent. Attributs, notes, atouts, visibilité et références de véhicules sont conservés. Leurs anciens liens sont conservés dans `legacyRelations`. Si un même PNJ était partagé entre plusieurs scénarios, chaque scénario reçoit une copie indépendante avec des identifiants distincts. Les personnages déjà placés sur une carte ou liés à des dossiers extérieurs sont conservés comme personnages de campagne pour préserver ces usages ; les personnages saisis manuellement ne sont pas déplacés. Les anciens PNJ sans scénario identifiable restent conservés dans la campagne.

La conversion ne réécrit pas la sauvegarde pendant une simple consultation ; elle est incluse dans le prochain enregistrement ou export. Une erreur de quota conserve la sauvegarde précédente. Supprimer un chapitre garde les PNJ locaux dans le scénario ; supprimer le scénario retire ses PNJ locaux, tandis que les personnages importants restent dans la campagne.
