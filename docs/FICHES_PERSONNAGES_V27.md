# Fiches de personnages — version 0.27

Ces modifications concernent la fiche recto-verso et son éditeur. Les fenêtres de PNJ de scénario, les catalogues généraux et les autres menus conservent leurs commandes.

## Spécialisations

Le bouton **+** à côté d’une compétence ajoute une spécialisation issue des suggestions du livre ou un nom personnel. Chaque spécialisation a son attribut, son indicateur « possédée (+2) » et ses RR manuelles. Le bonus +2 s’applique seulement à la réserve de cette spécialisation : deux spécialisations n’ajoutent pas +4 à un même jet. Une ligne utilisée uniquement pour une RR peut apparaître sans spécialisation possédée, comme sur les prétirés. Les attributs peuvent différer : par exemple Athlétisme avec Force et Défense à distance avec Agilité (p. 54).

Les anciens champs `specialization` et `specialized` restent acceptés. Les spécialisations suivantes utilisent `extraSpecializations` ; aucune migration destructive n’est effectuée. Les paramètres `specializationAttribute`, `specializationTrained` et `specializationRR` sont optionnels. Les anciennes sauvegardes restent importables. Le maximum est de 50 spécialisations supplémentaires par ligne, sans doublon.

Le papier conserve sa taille : les lignes supplémentaires occupent l’espace disponible. Les éléments qui dépassent restent modifiables dans les compléments et sont imprimables en annexe. La même règle conserve le texte complet des effets d’atouts.

## Modifier, supprimer et obtenir une explication

Cliquer sur l’élément ouvre son éditeur. **× Supprimer** se trouve dans cette fenêtre ; aucune croix de suppression n’est affichée sur le papier. Supprimer une spécialisation conserve la compétence et ses autres spécialisations ; supprimer la compétence retire sa ligne et ses spécialisations.

Les atouts, armes/sorts, véhicules/drones et portrait se suppriment depuis leur nom. Les valeurs et textes s’effacent de la même façon. Le nom obligatoire se réinitialise sur « Sans nom », et le statut sur « À définir ». Effacer un cyberdeck depuis son nom vide ses champs. Les rubriques imprimées du modèle restent en place. Effacer explicitement le texte d’un effet ne fait pas réapparaître le texte de référence : `effectsHidden` distingue cette action des anciennes notes laissées vides.

Le survol ou le focus pendant **1 seconde** affiche une explication du champ, de la compétence, de la spécialisation ou des effets de l’atout. La bulle disparaît en quittant l’élément, en commençant une édition, en faisant défiler la page ou avec Échap. Le contenu est du texte, jamais du HTML exécuté.

## Atouts et RR

Les choix de la fiche affichent **Esprit mentor Chien**, par exemple. Les identifiants et noms du catalogue général sont conservés. Les effets du livre ou les notes personnelles apparaissent sous le nom de l’atout.

Les formulations explicites « RR N aux tests de… » sont associées à la compétence, spécialisation ou attribut désigné. Les sources applicables s’additionnent, avec un plafond de **RR 3** (p. 61 et 71). Les RR portant sur une spécialisation ne donnent pas la spécialisation +2 et ne s’étendent pas à toute la compétence. Un bonus d’attribut suit l’attribut réellement utilisé par la spécialisation. Les armes et cyberdecks alternatifs ne cumulent pas leurs bonus entre eux ; les autres sources compatibles peuvent se cumuler.

Les esprits mentors demandent leurs deux domaines, selon leur description. Les améliorations « au choix » permettent de choisir leur domaine. Une formulation à alternatives complexes ne déclenche aucun choix automatique : le meneur sélectionne les effets retenus selon le texte. Les effets conditionnels, par exemple une drogue, demandent l’activation de leur RR. L’activation et les choix sont conservés dans `rrActive` et `rrChoices`, y compris après utilisation de l’éditeur complet et après export/import.

Le réglage manuel historique `rr` est conservé comme **total minimal**, pas additionné une seconde fois aux effets qui peuvent déjà y être comptés. Le meneur peut donc conserver une ancienne valeur ou compléter un effet personnel non reconnu. Les formulations libres qui ne désignent pas un domaine reconnu ne créent pas de RR inventée.

## RR jaunes et rouges des prétirés

La lecture comparative des visuels et de leurs atouts donne la distinction suivante :

- **Rouge/brun** : RR normalement applicable à la ligne.
- **Jaune** : RR soumise à une condition de matériel ou d’effet.

Exemples dans le livre fourni : **Casper p. 101**, RR de Perception physique liée au drone Quadrotor ; **Echo p. 103**, RR de Furtivité liée au pistolet démontable ; **Drakk p. 105**, RR de Combat rapproché liée à la BTL Berserker. La partie textuelle consultée ne contient pas de légende explicite des couleurs ; cette distinction vient du recoupement de ces exemples, et n’introduit pas une nouvelle catégorie mécanique.

Dans les deux cas, une RR permet d’ignorer un « 1 » sur les dés de risque et les RR applicables se cumulent jusqu’à 3 (**p. 71, Réduire les risques**). Dans l’application, un cercle jaune en contour indique un effet disponible mais non activé ; c’est une convention d’interface ajoutée pour distinguer disponibilité et activation.
