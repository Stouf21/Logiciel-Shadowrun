// Source: Shadowrun: Anarchy V2, printed pp. 244–255, supplied by the user.
export const npcTemplates=[
 {
  "id": "ganger",
  "name": "Ganger",
  "page": 244,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (4+A, RR 0) [si bras cybernétique 4 (4+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Lames 4 (6+A, RR 0) [si bras cybernétique 5 (6+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 2 (1+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Intimidation 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Substituts musculaires (cyberware) : VD +1 en combat rapproché."
     },
     {
      "kind": "bullet",
      "text": "Jazz (drogue) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Bras cybernétique (cyberware) : RR 1 aux tests de Combat rapproché."
     },
     {
      "kind": "bullet",
      "text": "Zélé (trait) : Avantage pour résister à l’intimidation ou la peur ; combativité forte."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–] [si substituts musculaires : VD 4 (orks 5, trolls 6)]"
     },
     {
      "kind": "bullet",
      "text": "Couteau VD 4 (orks 5, trolls 6) [OK/–/–/–] [si substituts musculaires : VD 5 (orks 6, trolls 7)]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet léger VD 4 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Synthécuir aux couleurs du gang (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible [si zélé combativité forte]"
     },
     {
      "kind": "bullet",
      "text": "Physiques 4/7/10 (orks 5/8/11, trolls 6/9/12)"
     },
     {
      "kind": "specialization",
      "text": "si armure dermique 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "ganger-elite",
  "name": "Ganger d’élite / membre d’un syndicat du crime",
  "page": 244,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Mitraillettes 4 (5+A, RR 0) [si yeux cybernétiques 5 (5+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0) [si bras cybernétique 5 (5+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Lames 4 (7+A, RR 0) [si bras cybernétique 5 (7+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Intimidation 3 (elfes 4) (5+C, RR 0)"
     }
    ]
   },
   {
    "heading": "2 ATOUTS AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Substituts musculaires (cyberware) : VD +1 en combat rapproché."
     },
     {
      "kind": "bullet",
      "text": "Jazz (drogue) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Bras cybernétique (cyberware) : RR 1 aux tests de Combat rapproché."
     },
     {
      "kind": "bullet",
      "text": "Zélé (trait) : Avantage pour résister à l’intimidation ou la peur ; combativité forte."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques avec smartlink (cyberware) : RR 1 aux tests d’Armes à distance (mitraillettes), vision nocturne."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–] [si substituts musculaires : VD 4 (orks 5, trolls 6)]"
     },
     {
      "kind": "bullet",
      "text": "Arme longue (katana, hache, épée) VD 5 (orks 6, trolls 7) [OK/–/–/–] [si substituts musculaires : VD 6 (orks 7, trolls 8)]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Mitraillette VD 5 [Dés./OK/OK/–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Manteau renforcé (Armure 2)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible [si zélé combativité forte]"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "si armure dermique 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains : 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "ganger-eveille",
  "name": "Ganger éveillé",
  "page": 245,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (4+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Sorcellerie 3 (nains 4) (4+V, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Sorts de combat 4 (6+V, RR 0) [si focus de combat 5 (6+V, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Conjuration 3 (4+L/C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Esprits du feu 4 (6+L/C, RR 0) [si focus de feu 5 (6+L/C, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 2 (1+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Intimidation 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ÉVEILLÉ + 1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé (tradition au choix) : Perception & projection astrale, Sorcellerie, Conjuration."
     },
     {
      "kind": "bullet",
      "text": "Focus de combat (équipement) : RR 1 aux tests de Sorcellerie (Combat)."
     },
     {
      "kind": "bullet",
      "text": "Focus de feu (équipement) : RR 1 aux tests de Conjuration (esprits du feu)."
     }
    ]
   },
   {
    "heading": "SORTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Armure (Manipulation, Armure +1 par 3 succès)."
     },
     {
      "kind": "bullet",
      "text": "Trait de feu (Combat indirect, VD = VOL, dommages physiques, peut enflammer)."
     },
     {
      "kind": "bullet",
      "text": "Éclair mana (Combat direct, VD = succès, dommages mentaux)."
     },
     {
      "kind": "bullet",
      "text": "Invisibilité (Illusion indirect)."
     },
     {
      "kind": "bullet",
      "text": "Soins (Santé, seuil selon blessure)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Synthécuir aux couleurs du gang (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "ganger-adepte",
  "name": "Ganger adepte",
  "page": 245,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (orks, trolls 4) (5+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (5+A, RR 0) [si sens du combat 5 (5+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0) [si combat rapproché amélioré 5 (5+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Mains nues 4 (7+A, RR 0) [si combat rapproché amélioré 5 (7+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Défense 4 (5+A, RR 0) [si sens du combat 5 (5+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 3 (3+A, RR 0) [si furtivité améliorée 4 (3+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 2 (1+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Intimidation 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ÉVEILLÉ + 1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé : Adepte."
     },
     {
      "kind": "bullet",
      "text": "Sens du combat (pouvoir d’adepte) : RR 1 aux tests d’Athlétisme (défense à distance) et Combat rapproché (défense)."
     },
     {
      "kind": "bullet",
      "text": "Frappe élémentaire électrique (pouvoir d’adepte) : VD +1 à mains nues, fait perdre une action à la cible en cas de blessure."
     },
     {
      "kind": "bullet",
      "text": "Réflexes améliorés (pouvoir d’adepte) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Furtivité améliorée (pouvoir d’adepte) : RR 1 aux tests de Furtivité (discrétion physique)."
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché amélioré (pouvoir d’adepte) : RR 1 aux tests de Combat rapproché (mains nues)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–] [si frappe élémentaire : VD 3 (orks 4, trolls 5), perte d’une action en cas de dommages]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Synthécuir aux couleurs du gang (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "ganger-decker",
  "name": "Ganger decker",
  "page": 246,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Électronique 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 3 (4+L, RR 0) [si navigateur 4, 3+L, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Piratage 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Force brute 4 (6+L, RR 0) [si exploitation 5 (6+L, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Cybercombat 3 (4+V, RR 0) [si agresseur 4 (4+V, RR 1)]"
     }
    ]
   },
   {
    "heading": "CYBERDECK + DATAJACK + 1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Cyberdeck (Attaque 1, Firewall 2)."
     },
     {
      "kind": "bullet",
      "text": "Datajack (cyberware) : IND, RV cold-sim."
     },
     {
      "kind": "bullet",
      "text": "Programme Exploitation (équipement) : RR 1 aux tests de Piratage (force brute)."
     },
     {
      "kind": "bullet",
      "text": "Programme Agresseur (équipement) : RR 1 aux tests de Piratage (cybercombat)."
     },
     {
      "kind": "bullet",
      "text": "Programme Navigateur (équipement) : RR 1 aux tests d’Électronique (recherche matricielle)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet léger VD 4 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Cybercombat VD 1"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Synthécuir aux couleurs du gang (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     },
     {
      "kind": "bullet",
      "text": "Matricielles (cyberdeck) 2/5/8 //"
     }
    ]
   }
  ]
 },
 {
  "id": "go-ganger-rigger",
  "name": "Go-ganger / rigger",
  "page": 246,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Pistolets 4 (7+A, RR 0) [si yeux cybernétiques 5 (7+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Pilotage 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Motos 4 (7+A, RR 0) [si moto personnalisée 5 (7+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Drones terrestres 4 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 2 (1+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Intimidation 3 (3+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Armes contrôlées à distance 4 (6+L, RR 0)"
     }
    ]
   },
   {
    "heading": "GO-GANGER : 1 VÉHICULE + 1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Moto de course (véhicule) : Autopilote 6, Structure 4, Maniabilité 2, Vitesse 6, Blindage 0."
     },
     {
      "kind": "bullet",
      "text": "Chopper (véhicule) : Autopilote 6, Structure 5, Maniabilité 2, Vitesse 5, Blindage 0."
     },
     {
      "kind": "bullet",
      "text": "Voiture sportive (véhicule) : Autopilote 6, Structure 5, Maniabilité 2, Vitesse 5, Blindage 0."
     },
     {
      "kind": "bullet",
      "text": "Moto personnalisée (véhicule) : RR 1 aux tests de Pilotage (motos)."
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques (cyberware) : RR 1 aux tests d’Armes à distance (pistolets)."
     },
     {
      "kind": "bullet",
      "text": "Jazz (drogue) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Zélé (trait) : Avantage pour résister à l’intimidation ou la peur ; combativité forte."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     }
    ]
   },
   {
    "heading": "RIGGER : 3 ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Datajack (cyberware) : IND, RV Cold-sim."
     },
     {
      "kind": "bullet",
      "text": "Console de commande pour rigger (équipement) : mode siège du capitaine, 2 drones concurrents."
     },
     {
      "kind": "bullet",
      "text": "2 GM-Nissan Doberman (drones moyen) : Autopilote 6, Structure 2, Maniabilité 7, Vitesse 3, Blindage 2, avec mitraillette."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet automatique VD 4 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Mitraillette (sur Doberman) VD 5 [Dés./OK/OK/–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Synthécuir aux couleurs du gang (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible [si zélé combativité forte]"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "si armure dermique 4/7/10 (orks 5/8/11, trolls 6/9/12)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     },
     {
      "kind": "bullet",
      "text": "Moto de course 4/8/12 //"
     },
     {
      "kind": "bullet",
      "text": "Chopper / Voiture sportive 5/10/15 //"
     },
     {
      "kind": "bullet",
      "text": "GM-Nissan Doberman 4/6/8 //"
     }
    ]
   }
  ]
 },
 {
  "id": "agent-securite",
  "name": "Agent de sécurité / flic des rues",
  "page": 247,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Pistolets 3 (4+A, RR 0) [si smartlink 4 (4+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (7+L, RR 0) [si yeux cybernétiques 5 (7+L, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Intimidation 3 (elfes 4) (5+C, RR 0)"
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 1 aux tests d’Armes à distance (pistolets)."
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques (cyberware) : RR 1 aux tests de Perception (physique)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet léger VD 4 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains : 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "officier-securite",
  "name": "Officier de sécurité / police",
  "page": 247,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (5+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 5 (5+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Mitraillettes / Shotguns 5 (7+A, RR 1) [si smartlink 6 (7+A, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Armes contondantes 4 (7+A, RR 0) [si câblage de compétence 5 (7+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (5+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0) ATOUT"
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques avec identification de cibles (cyberware) : RR 1 aux tests d’Armes à distance et de Perception (physique), vision nocturne."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Réflexes câblés (cyberware) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 1 aux tests d’Armes à distance (mitraillettes ou shotguns)."
     },
     {
      "kind": "bullet",
      "text": "Câblage de compétence (cyberware) : RR 1 aux tests de Combat rapproché (armes contondantes)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Une arme au choix parmi les suivantes :"
     },
     {
      "kind": "bullet",
      "text": "Mitraillette VD 5 [Dés./OK/OK/–]"
     },
     {
      "kind": "bullet",
      "text": "Shotgun VD 8 [Dés./OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3) + bouclier anti-émeutes optionnel (Armure +1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "specialization",
      "text": "si armure dermique ou bouclier 7/10/13 (orks 8/11/14, trolls 9/12/15)"
     },
     {
      "kind": "specialization",
      "text": "si armure dermique et bouclier 8/11/14 (orks 9/12/15, trolls 10/13/16)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "mage-securite",
  "name": "Mage de sécurité / police",
  "page": 248,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (4+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Astrale 4 (7+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Sorcellerie 4 (5+V, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Sorts de combat 4 (nains 5) (7+V, RR 0) [si focus de combat 6 (nains 7) (7+V, RR 2)]"
     },
     {
      "kind": "specialization",
      "text": "Sorts de détection 4 (nains 5) (7+V, RR 0) [si focus de détection 6 (nains 7) (7+V, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Conjuration 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Esprits des aînés 4 (7+L, RR 0) [si Focus des aînés 6 (7+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé (tradition hermétique) : Perception & projection astrale, Sorcellerie, Conjuration"
     },
     {
      "kind": "bullet",
      "text": "Focus de maintien : permet de maintenir 2 sorts sans malus et 4 avec un désavantage."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Focus de combat (équipement) : RR 2 aux tests de Sorcellerie (sorts de combat)."
     },
     {
      "kind": "bullet",
      "text": "Focus de détection (équipement) : RR 2 aux tests de Sorcellerie (sorts de détection)."
     },
     {
      "kind": "bullet",
      "text": "Focus de des aînés (équipement) : RR 2 aux tests de Conjuration (esprits des aînés)."
     }
    ]
   },
   {
    "heading": "SORTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Analyse de véracité (Détection, Seuil CHA+VOL)."
     },
     {
      "kind": "bullet",
      "text": "Armure (Manipulation, Armure +1 par 3 succès)."
     },
     {
      "kind": "bullet",
      "text": "Confusion (Illusion, Seuil VOL+LOG, inflige un désavantage)."
     },
     {
      "kind": "bullet",
      "text": "Détection des ennemis (Détection, 2 succès par portée)."
     },
     {
      "kind": "bullet",
      "text": "Éclair étourdissant (Combat direct, VD = succès, dommages mentaux étourdissants)."
     },
     {
      "kind": "bullet",
      "text": "Foudre (Combat indirect, VD = VOL, dommages physiques, fait perdre une action)."
     },
     {
      "kind": "bullet",
      "text": "Sens du combat (Détection, Seuil 5, avantages en Combat rapproché et défense à distance)."
     },
     {
      "kind": "bullet",
      "text": "Soins (Santé, seuil selon blessure)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet léger VD 4 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "decker-securite",
  "name": "Decker de sécurité / police",
  "page": 248,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 4 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Matricielle 4 (6+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Électronique 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Protection matricielle 4 (7+L, RR 0) [si moniteur 6 (7+L, RR 2)]"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 4 (7+L, RR 0) [si navigateur 6 (7+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Piratage 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Cybercombat 4 (7+V, RR 0) [si agresseur 6 (7+V, RR 2)]"
     },
     {
      "kind": "specialization",
      "text": "Force brute 4 (5+L, RR 0) [si exploitation 6, (5+L, RR 2)]"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Cyberdeck (Attaque 4, Firewall 4)."
     },
     {
      "kind": "bullet",
      "text": "Datajack (cyberware) : IND, RV cold-sim."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Programme agresseur (équipement) : RR 2 aux tests de Piratage (cybercombat)."
     },
     {
      "kind": "bullet",
      "text": "Programme exploitation (équipement) : RR 2 aux tests de Piratage (force brute)."
     },
     {
      "kind": "bullet",
      "text": "Programme moniteur (équipement) : RR 2 aux tests d’Électronique (protection matricielle)."
     },
     {
      "kind": "bullet",
      "text": "Programme navigateur (équipement) : RR 2 aux tests d’Électronique (recherche matricielle)."
     },
     {
      "kind": "bullet",
      "text": "Cyberjack (cyberware) : (remplacement du datajack) : IND, RV cold-sim, +1 action par narration en RV."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet léger VD 4 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Cybercombat VD 4"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     },
     {
      "kind": "bullet",
      "text": "Matricielles (cyberdeck) 4/7/10 //"
     }
    ]
   }
  ]
 },
 {
  "id": "adepte-securite",
  "name": "Adepte de sécurité / police",
  "page": 249,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (5+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (7+A, RR 0) [si sens du combat 5 (7+A, RR 1)]"
     },
     {
      "kind": "specialization",
      "text": "Course 4 (orks, trolls 5) (7+F, RR 0) [si course sur les murs 5 (orks, trolls 6) (7+F, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Mains nues 5 (7+A, RR 1) [si combat rapproché amélioré 6 (7+A, RR 2)]"
     },
     {
      "kind": "specialization",
      "text": "Défense 4 (5+A, RR 0) [si sens du combat 5 (5+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Furtivité physique 4 (6+A, RR 0) [si furtivité améliorée 5 (6+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (5+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé : Adepte."
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché amélioré (pouvoir d’adepte) : RR 1 aux tests de Combat rapproché (mains nues)."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Sens du combat (pouvoir d’adepte) : RR 1 aux tests d’Athlétisme (défense à distance) et Combat rapproché (défense)."
     },
     {
      "kind": "bullet",
      "text": "Frappe élémentaire électrique (pouvoir d’adepte) : VD +2 à mains nues, fait perdre une action à la cible en cas de blessure."
     },
     {
      "kind": "bullet",
      "text": "Réflexes améliorés (pouvoir d’adepte) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Furtivité améliorée (pouvoir d’adepte) : RR 1 aux tests de Furtivité (discrétion physique)."
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché amélioré (pouvoir d’adepte) : RR 2 aux tests de Combat rapproché (mains nues) (amélioration du pouvoir de base)."
     },
     {
      "kind": "bullet",
      "text": "Course sur les murs (pouvoir d’adepte) : permet de courir une courte distance sur les murs. RR 1 aux tests d’Athlétisme (course)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–] [si frappe élémentaire VD 5 (orks 6, trolls 7) [OK/–/–/–], perte d’une action en cas de dommage]."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "rigger-securite",
  "name": "Rigger de sécurité / police",
  "page": 249,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (5+A, RR 0) [avec Optic-X2 5 (5+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (5+L, RR 0) [avec Optic-X2 5 (5+L, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Pilotage 5 (5+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Armes contrôlées à distance 5 (7+L, RR 1)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Câblage de contrôle de véhicules (cyberware) : IND, RV cold- sim, permet de plonger dans un drone."
     },
     {
      "kind": "bullet",
      "text": "Console de commande pour rigger (équipement) : mode siège du capitaine, 2 drones concurrents. RR 1 aux tests de Pilotage et d’Ingénierie (armes contrôlées à distance)."
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 (petit drone volant) : Autopilote 6, Structure 1, Maniabilité 9, Vitesse 4, Blindage 0. RR 1 aux tests de Furtivité (discrétion physique) et de Perception (physique)."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "2 MCT-Nissan Roto-drone (drones volants moyens) : Autopilote 6, Structure 2, Maniabilité 7, Vitesse 6, Blindage 2, avec fusil d’assaut."
     },
     {
      "kind": "bullet",
      "text": "2 GM-Nissan Doberman (drones moyens) : Autopilote 6, Structure 2, Maniabilité 7, Vitesse 3, Blindage 2, avec fusil d’assaut."
     },
     {
      "kind": "bullet",
      "text": "Voiture de patrouille (véhicule) : Autopilote 6, Structure 6, Maniabilité 2, Vitesse 4, Blindage 3."
     },
     {
      "kind": "bullet",
      "text": "Fourgon (véhicule) : Autopilote 6, Structure 8, Maniabilité 1, Vitesse 3, Blindage 4."
     },
     {
      "kind": "bullet",
      "text": "Ambulance blindée (véhicule) : Autopilote 6, Structure 7, Maniabilité 2, Vitesse 3, Blindage 5."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet automatique VD 4 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Fusil d’assaut (drones) VD 7 [Dés./OK/OK/Dés.]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 1/2/3 //"
     },
     {
      "kind": "bullet",
      "text": "Roto-drone / Doberman 4/6/8 //"
     },
     {
      "kind": "bullet",
      "text": "Voiture de patrouille 9/15/21 //"
     },
     {
      "kind": "bullet",
      "text": "Fourgon 12/20/28 //"
     },
     {
      "kind": "bullet",
      "text": "Ambulance blindée 12/19/26 //"
     }
    ]
   }
  ]
 },
 {
  "id": "medecin-combat",
  "name": "Médecin de combat",
  "page": 250,
  "occupation": "soins",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Mitraillettes 4 (6+A, RR 0) [si smartlink 5 (6+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 5 (6+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Survie 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Premiers soins 6 (8+L, RR 1)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Câblage de compétence (cyberware) : RR 1 aux tests de Survie (premiers soins)."
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques (cyberware) : RR 1 aux tests de Perception (physique), vision thermographique."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Médikit autonome DocWagon Pro+ (drone) Autopilote 9, fixe."
     },
     {
      "kind": "bullet",
      "text": "Réflexes câblés (cyberware) : +1 action par combat."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 1 aux tests d’Armes à distance (mitraillettes)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau de combat VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Mitraillette VD 5 [Dés./OK/OK/–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     },
     {
      "kind": "bullet",
      "text": "Stim patches et trauma patches"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "si armure dermique 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "mage-elite",
  "name": "Mage d’élite de sécurité / police",
  "page": 250,
  "occupation": "magie",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 4,
    "nains": 5
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (orks, trolls 4) (5+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Astrale 5 (8+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Sorcellerie 5 (nains 6) (6+V, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Sorts de combat 8 (8+V, RR 3)"
     },
     {
      "kind": "specialization",
      "text": "Sorts avec focus 6 (nains 7) (6+V, RR 2)"
     },
     {
      "kind": "specialization",
      "text": "Contresort 6 (8+V, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Conjuration 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Esprits des aînés 5 (8+L, RR 0) [si focus des aînés 7 (8+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé (tradition hermétique) : Perception & projection astrale, Sorcellerie, Conjuration."
     },
     {
      "kind": "bullet",
      "text": "Focus de maintien : permet de maintenir 3 sorts sans malus et 6 avec malus."
     },
     {
      "kind": "bullet",
      "text": "Focus de sorcellerie (équipement) : RR 1 aux tests de Sorcellerie."
     },
     {
      "kind": "bullet",
      "text": "Focus de combat (équipement) : RR 2 aux tests de Sorcellerie (sorts de combat)."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Focus de détection (équipement) : RR 1 aux tests de Sorcellerie (sorts de détection)."
     },
     {
      "kind": "bullet",
      "text": "Focus d’illusion (équipement) : RR 1 aux tests de Sorcellerie (sorts d’illusion)."
     },
     {
      "kind": "bullet",
      "text": "Focus de manipulation (équipement) : RR 1 aux tests de Sorcellerie (sorts de manipulation)."
     },
     {
      "kind": "bullet",
      "text": "Focus des aînés (équipement) : RR 2 aux tests de Conjuration (esprits des aînés)."
     }
    ]
   },
   {
    "heading": "SORTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Armure (Manipulation, Armure +1 par 3 succès)."
     },
     {
      "kind": "bullet",
      "text": "Augmentation de réflexes (Santé, effets selon succès 3/5/7)."
     },
     {
      "kind": "bullet",
      "text": "Barrière physique (Manipulation, Force 1 par succès, 1 succès par tranche de 3 mètres)."
     },
     {
      "kind": "bullet",
      "text": "Confusion (Illusion, Seuil VOL+LOG, inflige un désavantage)."
     },
     {
      "kind": "bullet",
      "text": "Détection des ennemis (Détection, 2 succès par portée)."
     },
     {
      "kind": "bullet",
      "text": "Éclair étourdissant (Combat direct, VD = succès, dommages mentaux étourdissants)."
     },
     {
      "kind": "bullet",
      "text": "Foudre (Combat indirect, VD = VOL, dommages physiques, fait perdre une action)."
     },
     {
      "kind": "bullet",
      "text": "Invisibilité (Illusion indirect)."
     },
     {
      "kind": "bullet",
      "text": "Sens du combat (Détection, Seuil 5, avantages en Combat rapproché et défense à distance)."
     },
     {
      "kind": "bullet",
      "text": "Soins (Santé, seuil selon blessure)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure intégrale + Casque (Armure 4)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 4/7/10 (nains 5/8/11)"
     }
    ]
   }
  ]
 },
 {
  "id": "officier-elite",
  "name": "Officier d’élite de sécurité / police",
  "page": 251,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 4
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (trolls 5) (6+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 5 (8+A, RR 0) [si réseau tactique avancé 6 (8+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 5 (6+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Arme principale 8 (8+A, RR 3)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 5 (6+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Armes contondantes 6 (8+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 5 (7+A, RR 0) [si combinaison caméléon 6 (7+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 5 (8+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Réflexes câblés (cyberware) : +1 action par narration."
     },
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques avec réseau tactique (cyberware) : RR 1 aux tests d’Armes à distance et de Perception (physique), compensation anti-flash, vision nocturne."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 2 aux tests d’Armes à distance (arme principale)."
     },
     {
      "kind": "bullet",
      "text": "Câblage de compétence (cyberware) : RR 1 aux tests de Combat rapproché."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Armure dermique (cyberware) : Armure +1."
     },
     {
      "kind": "bullet",
      "text": "Combinaison caméléon (équipement) : RR 1 aux tests de Furtivité (discrétion physique)."
     },
     {
      "kind": "bullet",
      "text": "Producteur de plaquettes (bioware) : +1 blessure légère."
     },
     {
      "kind": "bullet",
      "text": "Réseau tactique avancé (amélioration de cyberware) : RR 1 aux tests d’Athlétisme (défense à distance)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Une arme au choix parmi les suivantes :"
     },
     {
      "kind": "bullet",
      "text": "Shotgun VD 8 [Dés./OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Fusil d’assaut VD 7 [Dés./OK/OK/Dés.]"
     },
     {
      "kind": "bullet",
      "text": "Fusil de précision VD 10 [-/Dés./Dés./OK]"
     },
     {
      "kind": "bullet",
      "text": "Mitrailleuse VD 9 [–/OK/OK/OK]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure intégrale + Casque (Armure 4) + bouclier balistique optionnel (Armure +1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES ()//",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 7/10/13 (orks 8/11/14, trolls 9/12/15)"
     },
     {
      "kind": "specialization",
      "text": "si armure dermique ou bouclier 8/11/14 (orks 9/12/15, trolls 10/13/16)"
     },
     {
      "kind": "specialization",
      "text": "si armure dermique et bouclier 9/12/15 (orks 10/13/16, trolls 11/14/17)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "adepte-elite",
  "name": "Adepte d’élite de sécurité / police",
  "page": 251,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 4,
    "orks": 5,
    "trolls": 6
   },
   "agilite": {
    "base": 4
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (orks, trolls 5) (6+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 6 (8+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Course 5 (trolls 6) (8+F, RR 0) [si course sur les murs 6 (trolls 7) (8+F, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (6+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Mains nues 8 (8+A, RR 3)"
     },
     {
      "kind": "specialization",
      "text": "Défense 5 (6+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (6+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 5 (8+A, RR 0) [si furtivité améliorée 7 (8+A, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (6+L, RR 0) [si perception améliorée 6 (6+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Éveillé : Adepte."
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché amélioré (pouvoir d’adepte) : RR 3 aux tests de Combat rapproché (mains nues)."
     },
     {
      "kind": "bullet",
      "text": "Sens du combat (pouvoir d’adepte) : RR 1 aux tests d’Athlétisme (défense à distance) et Combat rapproché (défense)."
     },
     {
      "kind": "bullet",
      "text": "Réflexes améliorés (pouvoir d’adepte) : +1 action par narration."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Armure mystique (pouvoir d’adepte) : Armure +1 (physique et magique)."
     },
     {
      "kind": "bullet",
      "text": "Frappe élémentaire électrique (pouvoir d’adepte) : VD +2 à mains nues, fait perdre une action à la cible en cas de blessure."
     },
     {
      "kind": "bullet",
      "text": "Course sur les murs (pouvoir d’adepte) : permet de courir une courte distance sur les murs. RR 1 aux tests d’Athlétisme (course)."
     },
     {
      "kind": "bullet",
      "text": "Furtivité améliorée (pouvoir d’adepte) : RR 2 aux tests de Furtivité (discrétion physique)."
     },
     {
      "kind": "bullet",
      "text": "Perception améliorée (pouvoir d’adepte) : RR 2 aux tests de Perception (physique)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 4 (orks 5, trolls 6) [OK/–/–/–] [si frappe élémentaire VD 6 (orks 7, trolls 8) [OK/–/–/–], perte d’une action en cas de dommage."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure intégrale + Casque (Armure 4)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 8/11/14 (orks 9/12/15, trolls 10/13/16)"
     },
     {
      "kind": "specialization",
      "text": "si armure mystique 9/12/15 (orks 10/13/16, trolls 11/14/17)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     },
     {
      "kind": "specialization",
      "text": "si armure mystique 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "rigger-elite",
  "name": "Rigger d’élite de sécurité / police",
  "page": 252,
  "occupation": "technique",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 4
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (4+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 5 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 5 (8+L, RR 0) [avec Optic-X2 ou MCT-Gnat 7 (8+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Pilotage 5 (6+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Spécialisation selon véhicule ou drone 6 (8+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Armes contrôlées à distance 6 (8+L, RR 1)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Câblage de contrôle de véhicules (cyberware) : IND, RV hot-sim, permet de plonger dans un drone, +1 action par narration en RV."
     },
     {
      "kind": "bullet",
      "text": "Console de commande pour rigger (équipement) : mode siège du capitaine, 4 drones concurrents. RR 1 aux tests de Pilotage et d’Ingénierie (armes contrôlées à distance)."
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 (petit drone volant) : Autopilote 6, Structure 1, Maniabilité 9, Vitesse 4, Blindage 0. RR 2 aux tests de Perception (physique)."
     }
    ]
   },
   {
    "heading": "2 ATOUTS DRONES OU 1 ATOUT VÉHICULE AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "2 MCT-Nissan Roto-drone (drones volants moyens) : Autopilote 6, Structure 2, Maniabilité 7, Vitesse 6, Blindage 2, avec fusil d’assaut."
     },
     {
      "kind": "bullet",
      "text": "2 GM-Nissan Doberman (drones moyens) : Autopilote 6, Structure 2, Maniabilité 7, Vitesse 3, Blindage 2, avec fusil d’assaut."
     },
     {
      "kind": "bullet",
      "text": "2 MCT Gnat (microdrones volants) : Autopilote 6, Structure 0, Maniabilité 10, Vitesse 1, Blindage 0, avec batterie de senseurs : RR 2 aux tests de Perception (physique)."
     },
     {
      "kind": "bullet",
      "text": "Transport blindé Ares Citymaster (véhicule) : Autopilote 6, Structure 9, Maniabilité 1, Vitesse 3, Blindage 9, avec mitrailleuse en tourelle."
     },
     {
      "kind": "bullet",
      "text": "Hélicoptère d’interception Northrup Wasp (véhicule) : Autopilote 6, Structure 5, Maniabilité 4, Vitesse 6, Blindage 3, avec mitrailleuse orientée vers l’avant."
     },
     {
      "kind": "bullet",
      "text": "T-birt Ares Venture (véhicule) : Autopilote 6, Structure 9, Maniabilité 3, Vitesse 10, Blindage 4, avec mitrailleuse en tourelle et 2 missiles anti-véhicules."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Fusil d’assaut (drones) VD 7 [Dés./OK/OK/Dés.]"
     },
     {
      "kind": "bullet",
      "text": "Mitrailleuse (drones et véhicules) VD 9 [–/OK/OK/OK]"
     },
     {
      "kind": "bullet",
      "text": "Missiles anti-véhicules (Ares Venture) VD 16 [–/–/Dés./OK]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure intégrale + Casque (Armure 4)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 1/2/3 //"
     },
     {
      "kind": "bullet",
      "text": "Roto-drone / Doberman 4/6/8 //"
     },
     {
      "kind": "bullet",
      "text": "Ares Citymaster 18/27/36 //"
     },
     {
      "kind": "bullet",
      "text": "Northrup Wasp 8/13/18 //"
     },
     {
      "kind": "bullet",
      "text": "Ares Venture 13/22/31 //"
     }
    ]
   }
  ]
 },
 {
  "id": "militaire",
  "name": "Militaire",
  "page": 252,
  "occupation": "militaire",
  "attributes": {
   "force": {
    "base": 3,
    "orks": 4,
    "trolls": 5
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (5+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 5 (7+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 5 (5+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Arme principale 6 (7+A, RR 2)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Lames 5 (7+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (5+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Survie 3 (3+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques avec réseau tactique et identification de cibles (cyberware) : RR 1 aux tests d’Armes à distance, de Perception (physique) et d’Athlétisme (défense à distance), vision nocturne."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 1 aux tests d’Armes à distance (arme principale)."
     },
     {
      "kind": "bullet",
      "text": "Câblage de compétence (cyberware) : RR 1 aux tests de Combat rapproché (lames)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 3 (orks 4, trolls 5) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau de combat VD 4 (orks 5, trolls 6) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Grenades VD 7 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Une arme au choix parmi les suivantes :"
     },
     {
      "kind": "bullet",
      "text": "Shotgun VD 8 [Dés./OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Fusil d’assaut VD 7 [Dés./OK/OK/Dés.]"
     },
     {
      "kind": "bullet",
      "text": "Mitrailleuse VD 9 [–/OK/OK/OK]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure militaire (Armure 5)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 8/11/14 (orks 9/12/15, trolls 10/13/16)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "decker-elite",
  "name": "Decker d’élite de sécurité / police",
  "page": 253,
  "occupation": "technique",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 4
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (4+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (6+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 5 (8+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Matricielle 5 (8+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Électronique 5 (6+L, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Protection matricielle 6 (8+L, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 6 (8+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Piratage 5 (6+L, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Cybercombat 6 (8+V, RR 1) [si agresseur 8 (8+V, RR 3)]"
     },
     {
      "kind": "specialization",
      "text": "Force brute 6 (8+L, RR 1) [si exploitation 8 (8+L, RR 3)]"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Cyberdeck (Attaque 5, Firewall 5, filtre de biofeedback: Armure +1)."
     },
     {
      "kind": "bullet",
      "text": "Cyberjack (cyberware) : IND, RV hot-sim, +1 action par narration en RV."
     },
     {
      "kind": "bullet",
      "text": "Compétences câblées (cyberware) : RR 1 aux tests d’Électronique et de Piratage."
     }
    ]
   },
   {
    "heading": "2 ATOUTS AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Programme exploitation (équipement) : RR 2 aux tests de Piratage (force brute)."
     },
     {
      "kind": "bullet",
      "text": "Programme agresseur (équipement) : RR 2 aux tests de Piratage (cybercombat)."
     },
     {
      "kind": "bullet",
      "text": "Programme biofeedback (équipement) : inflige des dommages de biofeedback en cybercombat."
     },
     {
      "kind": "bullet",
      "text": "Programme marteau (équipement) : VD +2 en cybercombat."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Électromatraque VD 5 [OK/–/–/–], perte d’une action en cas de dommages."
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Cybercombat VD 5 (si marteau VD 7)"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure intégrale + Casque (Armure 4)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité forte"
     },
     {
      "kind": "bullet",
      "text": "Physiques 6/9/12 (orks 7/10/13, trolls 8/11/14)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     },
     {
      "kind": "bullet",
      "text": "Biofeedback 4/7/10 (nains 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "Matricielles (cyberdeck) : 5/8/11 //"
     }
    ]
   }
  ]
 },
 {
  "id": "commando",
  "name": "Commando militaire",
  "page": 253,
  "occupation": "militaire",
  "attributes": {
   "force": {
    "base": 4,
    "orks": 5,
    "trolls": 6
   },
   "agilite": {
    "base": 4
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 4 (orks, trolls 5) (6+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 6 (8+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 6 (7+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Fusils 8 (9+A, RR 3)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Lames 7 (7+A, RR 2)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 5 (7+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 5 (7+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Survie 5 (6+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (3+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques avec réseau tactique et identification de cibles (cyberware) : RR 1 aux tests d’Armes à distance, de Perception (physique) et d’Athlétisme (défense à distance), vision nocturne."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 2 aux tests d’Armes à distance (fusils)."
     },
     {
      "kind": "bullet",
      "text": "Câblage de compétence (cyberware) : RR 2 aux tests de Combat rapproché (lames)."
     },
     {
      "kind": "bullet",
      "text": "Réflexes câblés (cyberware) : +1 action par narration."
     },
     {
      "kind": "bullet",
      "text": "Armure dermique : Armure +1."
     },
     {
      "kind": "bullet",
      "text": "Kit de survie en milieu hostile (équipement) : RR 1 aux tests de Survie."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 4 (orks 5, trolls 6) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Couteau de combat VD 5 (orks 6, trolls 7) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     },
     {
      "kind": "bullet",
      "text": "Fusil d’assaut VD 7 [Dés./OK/OK/Dés.]"
     },
     {
      "kind": "bullet",
      "text": "Grenades VD 7 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Armure corporelle intégrale (Armure 4)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité extrême"
     },
     {
      "kind": "bullet",
      "text": "Physiques 9/12/15 (orks 10/13/16, trolls 11/14/17)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "johnson",
  "name": "Johnson",
  "page": 254,
  "occupation": "corporation",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 3,
    "elfes": 4
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Pistolets 4 (5+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (4+L, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Sociale 5 (6+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 5 (5+C, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Bluff 5 (elfes 6) (7+C, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Négociation 5 (elfes 6) (7+C, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Réseau 5 (5+C RR 1)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques (cyberware) : RR 1 aux tests d’Armes à distance (pistolets) et de Perception (physique), vision nocturne."
     },
     {
      "kind": "bullet",
      "text": "Très bien connecté (trait) : RR 1 aux tests de Réseau."
     },
     {
      "kind": "bullet",
      "text": "Phéromones optimisées (bioware) : RR 1 aux tests d’Influence."
     },
     {
      "kind": "bullet",
      "text": "Récepteur de phéromones (bioware) : RR 1 aux tests de Perception (sociale)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Vêtements blindés (Armure 2)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 4/7/10 (orks 5/8/11, trolls 6/9/12)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "employe",
  "name": "Employé corporatiste",
  "page": 254,
  "occupation": "corporation",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 2
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 2 (2+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 2 (elfes 3) (2+C, RR 0)"
     }
    ]
   },
   {
    "heading": "UNE COMPÉTENCE ET SPÉCIALISATION AU CHOIX :",
    "items": [
     {
      "kind": "bullet",
      "text": "Électronique 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 4 (6+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (4+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Négociation 4 (6+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Construction & Réparation au choix 4 (6+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Pilotage 3 (4+A RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Type de véhicule au choix 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Survie 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Premiers soins 4 (6+L, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Datajack (cyberware) : IND, RV cold-sim."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Taser VD 5 [OK/OK/–/–], perte d’une action en cas de dommages."
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Vêtements pare-balles (Armure 1)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité nulle"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "enqueteur",
  "name": "Enquêteur",
  "page": 254,
  "occupation": "securite",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 3,
    "nains": 4
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 3,
    "elfes": 4
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (trolls 4) (4+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Pistolets 4 (4+A, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (4+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 3 (4+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 4 (6+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 5 (7+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Électronique 3 (4+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 5 (6+L, RR 1)"
     },
     {
      "kind": "bullet",
      "text": "Influence 4 (6+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Intimidation 5 (8+C, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Réseau 4 (5+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Gouvernemental 4 (elfes 5) (7+C, RR 0)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Yeux cybernétiques (cyberware) : RR 1 aux tests de Perception (physique), vision nocturne."
     },
     {
      "kind": "bullet",
      "text": "Base de données de la Lone Star (équipement) : RR 1 aux tests d’Électronique (recherche matricielle)."
     },
     {
      "kind": "bullet",
      "text": "Smartlink (cyberware) : RR 1 aux tests d’Armes à distance (pistolets)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Pistolet lourd VD 5 [OK/OK/Dés./–]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Manteau renforcé (Armure 2)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 4/7/10 (orks 5/8/11, trolls 6/9/12)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 3/6/9 (nains 4/7/10)"
     }
    ]
   }
  ]
 },
 {
  "id": "cadre",
  "name": "Cadre corporatiste",
  "page": 255,
  "occupation": "corporation",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 2
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 3,
    "elfes": 4
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 2 (orks, trolls 3) (2+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 2 (2+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Perception 3 (3+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Sociale 4 (5+L, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Influence 3 (elfes 4) (4+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Bluff 4 (6+C, RR 0)"
     }
    ]
   },
   {
    "heading": "1 COMPÉTENCE ET SPÉCIALISATION AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Électronique 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Recherche matricielle 6 (8+L, RR 1) [si cadre supérieur 7 (8+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Influence 4 (6+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Négociation 6 (8+C, RR 1) [si cadre supérieur 7 (8+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 4 (6+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Construction & Réparation au choix 6 (8+L, RR 1) [si cadre supérieur 7 (8+L, RR 2)]"
     },
     {
      "kind": "bullet",
      "text": "Réseau 4 (6+C, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Corporatiste 6 (8+C, RR 1) [si cadre supérieur 7 (8+L, RR 2)]"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Datajack (cyberware) : IND, RV cold-sim."
     },
     {
      "kind": "bullet",
      "text": "Coprocesseur cortical (cyberware) : RR 1 aux tests de la spécialisation en lien avec son métier. (cadres supérieurs uniquement)"
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Application navigateur (équipement) : RR 1 aux tests d’Électronique (recherche matricielle)."
     },
     {
      "kind": "bullet",
      "text": "Base de données commerciale (équipement) : RR 1 aux tests d’Influence (négociation)."
     },
     {
      "kind": "bullet",
      "text": "Base de données techniques en RA (équipement) : RR 1 aux tests d’Ingénierie (C&R au choix)."
     },
     {
      "kind": "bullet",
      "text": "Passe ses journées à comploter (trait) : RR 1 aux tests de Réseau (corporatiste)."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Taser VD 5 [OK/OK/–/–], perte d’une action en cas de dommages."
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Vêtements pare-balles (Armure 1) ou manteau (Armure 2)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité nulle"
     },
     {
      "kind": "bullet",
      "text": "Physiques 3/6/9 (orks 4/7/10, trolls 5/8/11)"
     },
     {
      "kind": "specialization",
      "text": "avec manteau 4/7/10 (orks 5/8/11, trolls 6/9/12)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     }
    ]
   }
  ]
 },
 {
  "id": "coyote",
  "name": "Coyote / contrebandier",
  "page": 255,
  "occupation": "rue",
  "attributes": {
   "force": {
    "base": 2,
    "orks": 3,
    "trolls": 4
   },
   "agilite": {
    "base": 3
   },
   "volonte": {
    "base": 2,
    "nains": 3
   },
   "logique": {
    "base": 3
   },
   "charisme": {
    "base": 2,
    "elfes": 3
   }
  },
  "sections": [
   {
    "heading": "COMPÉTENCES",
    "items": [
     {
      "kind": "bullet",
      "text": "Athlétisme 3 (3+F, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Défense à distance 4 (5+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Armes à distance 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Combat rapproché 3 (3+A, RR 0)"
     },
     {
      "kind": "bullet",
      "text": "Furtivité 4 (5+A, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Discrétion physique 4 (5+A, RR 0) [avec Optic-X2 5 (5+A, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Perception 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Physique 4 (5+L, RR 0) [avec Optic-X2 5 (5+L, RR 1)]"
     },
     {
      "kind": "bullet",
      "text": "Pilotage 5 (5+A, RR 1)"
     },
     {
      "kind": "specialization",
      "text": "Véhicule sélectionné 6 (7+A, RR 2)"
     },
     {
      "kind": "bullet",
      "text": "Ingénierie 4 (5+L, RR 0)"
     },
     {
      "kind": "specialization",
      "text": "Armes contrôlées à distance 5 (7+L, RR 1)"
     }
    ]
   },
   {
    "heading": "ATOUTS",
    "items": [
     {
      "kind": "bullet",
      "text": "Câblage de contrôle de véhicules (cyberware) : IND, RV cold-sim ou hot-sim ; permet de plonger dans un véhicule ; +1 action par combat en plongée ; RR 1 aux tests de Pilotage et d’Ingénierie (armes contrôlées à distance)."
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 (petit drone volant) : Autopilote 6, Structure 1, Maniabilité 9, Vitesse 4, Blindage 0. RR 1 aux tests de Furtivité (discrétion physique) et de Perception (physique)."
     }
    ]
   },
   {
    "heading": "1 ATOUT AU CHOIX",
    "items": [
     {
      "kind": "bullet",
      "text": "Voiture de sport tunée (véhicule) : Autopilote 6, Structure 5, Maniabilité 2, Vitesse 6, Blindage 3 ; RR 1 aux tests de Pilotage (voitures)."
     },
     {
      "kind": "bullet",
      "text": "Fourgon (véhicule) : Autopilote 6, Structure 8, Maniabilité 1, Vitesse 3, Blindage 4 ; RR 1 aux tests de Pilotage (voitures), avec mitrailleuse en tourelle."
     },
     {
      "kind": "bullet",
      "text": "T-birt Ares Venture (véhicule) : Autopilote 6, Structure 9, Maniabilité 3, Vitesse 10, Blindage 4 ; RR 1 aux tests de Pilotage (véhicules volants), avec mitrailleuse en tourelle."
     }
    ]
   },
   {
    "heading": "ARMES",
    "items": [
     {
      "kind": "bullet",
      "text": "Mains nues VD 2 (orks 3, trolls 4) [OK/–/–/–]"
     },
     {
      "kind": "bullet",
      "text": "Mitraillette VD 5 [Dés./OK/OK/–]"
     },
     {
      "kind": "bullet",
      "text": "Mitrailleuse VD 9 [–/OK/OK/OK]"
     }
    ]
   },
   {
    "heading": "ÉQUIPEMENT",
    "items": [
     {
      "kind": "bullet",
      "text": "Commlink"
     },
     {
      "kind": "bullet",
      "text": "Gilet pare-balles (Armure 3)"
     }
    ]
   },
   {
    "heading": "SEUILS DE BLESSURES //",
    "items": [
     {
      "kind": "bullet",
      "text": "Combativité faible"
     },
     {
      "kind": "bullet",
      "text": "Physiques 5/8/11 (orks 6/9/12, trolls 7/10/13)"
     },
     {
      "kind": "bullet",
      "text": "Mentales 2/5/8 (nains 3/6/9)"
     },
     {
      "kind": "bullet",
      "text": "Lockheed Optic-X2 1/2/3 //"
     },
     {
      "kind": "bullet",
      "text": "Voiture de sport tunée 8/13/18 //"
     },
     {
      "kind": "bullet",
      "text": "Fourgon 12/20/28 //"
     },
     {
      "kind": "bullet",
      "text": "Ares Venture 13/22/31 //"
     }
    ]
   }
  ]
 }
];
