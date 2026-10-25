// Références de sélection : noms et valeurs factuelles, sans reproduire les descriptions du livre.
export const baseSkills = [
 ['Athlétisme','Générale','agilite','course, escalade, natation, parkour, défense à distance'],
 ['Furtivité','Générale','agilite','discrétion physique, astrale ou matricielle, escamotage, crochetage'],
 ['Perception','Générale','logique','physique, sociale, astrale, matricielle'],
 ['Pilotage','Générale','agilite','motos, voitures, camions, véhicules aquatiques ou volants, drones'],
 ['Survie','Générale','logique','milieu naturel, orientation, premiers soins, dressage, sang-froid'],
 ['Armes à distance','Combat','agilite','armes de jet, armes de trait, pistolets, mitraillettes, fusils, lance-grenades, armes lourdes, armes montées'],
 ['Combat rapproché','Combat','agilite','mains nues, lames, armes contondantes, combat astral, défense'],
 ['Électronique','Technique','logique','appareils personnels, protection matricielle, recherche matricielle'],
 ['Piratage','Technique','logique','backdoor, force brute, cybercombat'],
 ['Ingénierie','Technique','logique','armes contrôlées à distance, construction et réparation, explosifs, guerre électronique'],
 ['Influence','Sociale','charisme','bluff, étiquette, imposture, négociation, intimidation'],
 ['Réseau','Sociale','charisme','corporatiste, criminel, rue, gouvernemental, ingénierie, magique, matriciel, médiatique, médical, universitaire'],
 ['Sorcellerie','Magique','volonte','sorts de combat, détection, santé, illusion, manipulation, contresort'],
 ['Conjuration','Magique','logique','esprits de l’air, eau, feu, terre, aînés, bêtes, plantes, bannissement']
].map(([name,category,attribute,specializations],i)=>({id:`skill-${i+1}`,name,category,attribute,description:specializations,source:'Anarchy V2, p. 54 (P1, PDF 56)'}));

export const baseAssets = [
  {
    "id": "asset-1",
    "name": "Jumelles Evo Night Hawk 500",
    "category": "Équipement",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-2",
    "name": "Jumelles thermiques",
    "category": "Équipement",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-3",
    "name": "Kit d’effraction",
    "category": "Équipement",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-4",
    "name": "Marqueurs senseurs",
    "category": "Équipement",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-5",
    "name": "Matériel d’escalade",
    "category": "Équipement",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-6",
    "name": "Microphone laser",
    "category": "Équipement",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 136 (P3-1, PDF 5)"
  },
  {
    "id": "asset-7",
    "name": "Garde robe fournie",
    "category": "Équipement",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 139 (P3-1, PDF 8)"
  },
  {
    "id": "asset-8",
    "name": "Kit de maquillage",
    "category": "Équipement",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 139 (P3-1, PDF 8)"
  },
  {
    "id": "asset-9",
    "name": "Nanocrème de maquillage",
    "category": "Équipement",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 139 (P3-1, PDF 8)"
  },
  {
    "id": "asset-10",
    "name": "Programme linguistique expert",
    "category": "Équipement",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 139 (P3-1, PDF 8)"
  },
  {
    "id": "asset-11",
    "name": "Jet setter",
    "category": "Trait",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 139 (P3-1, PDF 8)"
  },
  {
    "id": "asset-12",
    "name": "Fouet monofilament",
    "category": "Arme",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-13",
    "name": "Yamaha Pulsar",
    "category": "Arme",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-14",
    "name": "Tiffani Needler",
    "category": "Arme",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-15",
    "name": "Shiawase Arms Puzzler",
    "category": "Arme",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-16",
    "name": "Ares Predator IV",
    "category": "Arme",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-17",
    "name": "Ares Predator V",
    "category": "Arme",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-18",
    "name": "Ares Predator VI",
    "category": "Arme",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-19",
    "name": "Ruger Super Warhawk",
    "category": "Arme",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-20",
    "name": "Ingram Smartgun",
    "category": "Arme",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-21",
    "name": "Ares Alpha Mk II",
    "category": "Arme",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-22",
    "name": "Barret Model 122",
    "category": "Arme",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-23",
    "name": "Ranger Arms SM−6",
    "category": "Arme",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 144 (P3-1, PDF 13)"
  },
  {
    "id": "asset-24",
    "name": "Combinaison caméléon",
    "category": "Armure",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 149 (P3-1, PDF 18)"
  },
  {
    "id": "asset-25",
    "name": "Costume Actioneer",
    "category": "Armure",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 149 (P3-1, PDF 18)"
  },
  {
    "id": "asset-26",
    "name": "Costume ou robe Armanté",
    "category": "Armure",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 149 (P3-1, PDF 18)"
  },
  {
    "id": "asset-27",
    "name": "SecureTech Invisi-shield",
    "category": "Armure",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 149 (P3-1, PDF 18)"
  },
  {
    "id": "asset-28",
    "name": "Berserker",
    "category": "Drogue",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-29",
    "name": "Bliss",
    "category": "Drogue",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-30",
    "name": "Casanova",
    "category": "Drogue",
    "level": 10,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-31",
    "name": "Céréprax",
    "category": "Drogue",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-32",
    "name": "Cram",
    "category": "Drogue",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-33",
    "name": "Deepweed",
    "category": "Drogue",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-34",
    "name": "Jazz",
    "category": "Drogue",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-35",
    "name": "Kamikaze",
    "category": "Drogue",
    "level": 14,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-36",
    "name": "Nitro",
    "category": "Drogue",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-37",
    "name": "Novacoke",
    "category": "Drogue",
    "level": 10,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-38",
    "name": "Psyché",
    "category": "Drogue",
    "level": 12,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-39",
    "name": "Zen",
    "category": "Drogue",
    "level": 8,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 150 (P3-1, PDF 19)"
  },
  {
    "id": "asset-40",
    "name": "Couteau de combat avec toxine létale",
    "category": "Équipement",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 152 (P3-1, PDF 21)"
  },
  {
    "id": "asset-41",
    "name": "Couteau de combat avec toxine débilitante",
    "category": "Équipement",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 152 (P3-1, PDF 21)"
  },
  {
    "id": "asset-42",
    "name": "Datajack",
    "category": "Cyberware",
    "level": 2,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-43",
    "name": "Datajack débridé",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-44",
    "name": "Cyberjack MCT Decker-Pro",
    "category": "Cyberware",
    "level": 7,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-45",
    "name": "Câblage de contrôle de véhicule Shiawase Neo-Rigger",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-46",
    "name": "Câblage de contrôle de véhicule Ares FeelTheRide",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-47",
    "name": "Câblage de contrôle de véhicule Dassault MilRig+",
    "category": "Cyberware",
    "level": 9,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-48",
    "name": "Commlink implanté",
    "category": "Cyberware",
    "level": 3,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-49",
    "name": "Coprocesseur cortical",
    "category": "Cyberware",
    "level": 11,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 155 (P3-1, PDF 24)"
  },
  {
    "id": "asset-50",
    "name": "Yeux cybernétiques standards",
    "category": "Cyberware",
    "level": 1,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-51",
    "name": "Yeux cybernétiques L’Oréal Fashion Top",
    "category": "Cyberware",
    "level": 2,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-52",
    "name": "Yeux cybernétiques Universal Omnitech ProView",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-53",
    "name": "Yeux cybernétiques Universal Omnitech AbsoluteView",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-54",
    "name": "Yeux cybernétiques Ares ProShooter",
    "category": "Cyberware",
    "level": 5,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-55",
    "name": "Yeux cybernétiques Ares SharpShooter",
    "category": "Cyberware",
    "level": 9,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-56",
    "name": "Yeux cybernétiques Evo EyeDrone",
    "category": "Cyberware",
    "level": 5,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 156 (P3-1, PDF 25)"
  },
  {
    "id": "asset-57",
    "name": "Oreilles cybernétiques standards",
    "category": "Cyberware",
    "level": 1,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 157 (P3-1, PDF 26)"
  },
  {
    "id": "asset-58",
    "name": "Oreilles cybernétiques Universal Omnitech ProSound",
    "category": "Cyberware",
    "level": 3,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 157 (P3-1, PDF 26)"
  },
  {
    "id": "asset-59",
    "name": "Oreilles cybernétiques Universal Omnitech UltraSound",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 157 (P3-1, PDF 26)"
  },
  {
    "id": "asset-60",
    "name": "Amplificateur de réaction",
    "category": "Cyberware",
    "level": 3,
    "essence": 1.15,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-61",
    "name": "Réflexes câblés Ares",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-62",
    "name": "Réflexes câblés Evo",
    "category": "Cyberware",
    "level": 8,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-63",
    "name": "Move-by-wire",
    "category": "Cyberware",
    "level": 15,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-64",
    "name": "Armure dermique",
    "category": "Cyberware",
    "level": 2,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-65",
    "name": "Auto-injecteur",
    "category": "Cyberware",
    "level": 1,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-66",
    "name": "Auto-injecteur et biomoniteur",
    "category": "Cyberware",
    "level": 3,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-67",
    "name": "Bras cybernétique synthétique avec lame cybernétique",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-68",
    "name": "Bras cybernétique synthétique avec pistolet lourd",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-69",
    "name": "Bras d’escalade",
    "category": "Cyberware",
    "level": 3,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-70",
    "name": "Jambes cybernétiques",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-71",
    "name": "Jambes cybernétiques digitigrades",
    "category": "Cyberware",
    "level": 8,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-72",
    "name": "Ossature renforcée en plastique",
    "category": "Cyberware",
    "level": 4,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-73",
    "name": "Ossature renforcée en aluminium",
    "category": "Cyberware",
    "level": 5,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-74",
    "name": "Ossature renforcée en titane",
    "category": "Cyberware",
    "level": 8,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-75",
    "name": "Substituts musculaires",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-76",
    "name": "Amplificateur synaptique",
    "category": "Bioware",
    "level": 7,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-77",
    "name": "Amplification cérébrale",
    "category": "Bioware",
    "level": 12,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-78",
    "name": "Augmentation de densité osseuse",
    "category": "Bioware",
    "level": 6,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-79",
    "name": "Filtre trachéal et extracteur de toxines",
    "category": "Bioware",
    "level": 2,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-80",
    "name": "Fixateurs de réflexes",
    "category": "Bioware",
    "level": 4,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-81",
    "name": "Fixateurs de réflexes Universal Omnitech PrimeSkill",
    "category": "Bioware",
    "level": 6,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-82",
    "name": "Fixateurs de réflexes Evo ReflexUltra",
    "category": "Bioware",
    "level": 8,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-83",
    "name": "Orthoderme",
    "category": "Bioware",
    "level": 3,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-84",
    "name": "Phéromones large spectre",
    "category": "Bioware",
    "level": 12,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-85",
    "name": "Phéromones optimisées",
    "category": "Bioware",
    "level": 7,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-86",
    "name": "Producteurs de plaquettes",
    "category": "Bioware",
    "level": 8,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-87",
    "name": "Renforcement musculaire",
    "category": "Bioware",
    "level": 12,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-88",
    "name": "Tonification musculaire",
    "category": "Bioware",
    "level": 12,
    "essence": 0.5,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 159 (P3-1, PDF 28)"
  },
  {
    "id": "asset-89",
    "name": "Médikit autonome CrashCart Essential",
    "category": "Drone",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 160 (P3-1, PDF 29)"
  },
  {
    "id": "asset-90",
    "name": "Médikit autonome DocWagon Pro+",
    "category": "Drone",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 160 (P3-1, PDF 29)"
  },
  {
    "id": "asset-91",
    "name": "Armurier",
    "category": "Contact",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-92",
    "name": "Avocat",
    "category": "Contact",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-93",
    "name": "Cadre corporatiste",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-94",
    "name": "Consigliere de la Mafia",
    "category": "Contact",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-95",
    "name": "Contrebandier",
    "category": "Contact",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-96",
    "name": "Doc des rues",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-97",
    "name": "Flic sous couverture",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-98",
    "name": "Ganger",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-99",
    "name": "Intermédiaire",
    "category": "Contact",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-100",
    "name": "Journaliste",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-101",
    "name": "M. Dupont",
    "category": "Contact",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-102",
    "name": "Marchand de talismans",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-103",
    "name": "Mécanicien",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-104",
    "name": "Paradis numérique",
    "category": "Contact",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-105",
    "name": "Patron de bar",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-106",
    "name": "Professeur d’université",
    "category": "Contact",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 164 (P3-1, PDF 33)"
  },
  {
    "id": "asset-107",
    "name": "Chat",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-108",
    "name": "Chien",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-109",
    "name": "Coyote",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-110",
    "name": "Loup",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-111",
    "name": "Oiseau-tonnerre",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-112",
    "name": "Ours",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-113",
    "name": "Raton laveur",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-114",
    "name": "Tueur de dragons",
    "category": "Esprit mentor",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 174 (P3-2, PDF 7)"
  },
  {
    "id": "asset-115",
    "name": "Focus sorcier",
    "category": "Focus",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-116",
    "name": "Focus de détection mineur",
    "category": "Focus",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-117",
    "name": "Focus d’illusion majeur",
    "category": "Focus",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-118",
    "name": "Focus de contresort",
    "category": "Focus",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-119",
    "name": "Focus de maintien",
    "category": "Focus",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-120",
    "name": "Focus de conjuration",
    "category": "Focus",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-121",
    "name": "Focus de l’air mineur",
    "category": "Focus",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-122",
    "name": "Focus des bêtes",
    "category": "Focus",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-123",
    "name": "Focus du feu majeur",
    "category": "Focus",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-124",
    "name": "Focus de bannissement",
    "category": "Focus",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-125",
    "name": "Focus de contrôle",
    "category": "Focus",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-126",
    "name": "Focus d’arme (couteau)",
    "category": "Focus",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-127",
    "name": "Focus d’arme (épée)",
    "category": "Focus",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-128",
    "name": "Arme élémentaire",
    "category": "Pouvoir d’adepte",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-129",
    "name": "Armure",
    "category": "Pouvoir d’adepte",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-130",
    "name": "Armure astrale",
    "category": "Pouvoir d’adepte",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-131",
    "name": "Armure mystique",
    "category": "Pouvoir d’adepte",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-132",
    "name": "Attribut amélioré",
    "category": "Pouvoir d’adepte",
    "level": 11,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-133",
    "name": "Compétence améliorée",
    "category": "Pouvoir d’adepte",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-134",
    "name": "Contrôle vocal",
    "category": "Pouvoir d’adepte",
    "level": 8,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-135",
    "name": "Contrôle vocal et morphologique",
    "category": "Pouvoir d’adepte",
    "level": 10,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-136",
    "name": "Course sur les murs",
    "category": "Pouvoir d’adepte",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-137",
    "name": "Frappe à distance",
    "category": "Pouvoir d’adepte",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-138",
    "name": "Frappe élémentaire",
    "category": "Pouvoir d’adepte",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-139",
    "name": "Mains mortelles",
    "category": "Pouvoir d’adepte",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-140",
    "name": "Perception améliorée",
    "category": "Pouvoir d’adepte",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-141",
    "name": "Poids plume",
    "category": "Pouvoir d’adepte",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-142",
    "name": "Réflexes accrus",
    "category": "Pouvoir d’adepte",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-143",
    "name": "Réflexes améliorés",
    "category": "Pouvoir d’adepte",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-144",
    "name": "Résistance à la douleur",
    "category": "Pouvoir d’adepte",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-145",
    "name": "Sens du combat",
    "category": "Pouvoir d’adepte",
    "level": 8,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-146",
    "name": "Sens du danger",
    "category": "Pouvoir d’adepte",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-147",
    "name": "Sens empathique",
    "category": "Pouvoir d’adepte",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 191 (P3-2, PDF 24)"
  },
  {
    "id": "asset-148",
    "name": "Fatalité",
    "category": "Trait (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-149",
    "name": "Mutation",
    "category": "Trait (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-150",
    "name": "Pestilence",
    "category": "Trait (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-151",
    "name": "Pollution",
    "category": "Trait (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-152",
    "name": "Frappe toxique",
    "category": "Pouvoir d’adepte (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-153",
    "name": "Nuage pestilentiel",
    "category": "Pouvoir d’adepte (PNJ corrompu)",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 200 (P3-2, PDF 33)"
  },
  {
    "id": "asset-154",
    "name": "Biofeedback",
    "category": "Équipement",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-155",
    "name": "Filtre de biofeedback",
    "category": "Équipement",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-156",
    "name": "Verrouillage de connexion",
    "category": "Équipement",
    "level": "",
    "essence": 0,
    "description": "Atout de PNJ corrompu : aucun niveau chiffré fourni par le livre. Arbitrage du meneur nécessaire.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-157",
    "name": "Erika MCD−6",
    "category": "Cyberdeck",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-158",
    "name": "Spinrad Falcon",
    "category": "Cyberdeck",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-159",
    "name": "MCT 360",
    "category": "Cyberdeck",
    "level": 11,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-160",
    "name": "Renraku Kitsune",
    "category": "Cyberdeck",
    "level": 14,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-161",
    "name": "Shiawase Cyber−6",
    "category": "Cyberdeck",
    "level": 20,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-162",
    "name": "Fairlight Excalibur",
    "category": "Cyberdeck",
    "level": 30,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 210 (P4, PDF 10)"
  },
  {
    "id": "asset-163",
    "name": "Essy Motors DroneMaster",
    "category": "Équipement",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 232 (P4, PDF 32)"
  },
  {
    "id": "asset-164",
    "name": "Horizon Overseer",
    "category": "Équipement",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 232 (P4, PDF 32)"
  },
  {
    "id": "asset-165",
    "name": "Proteus Poseidon",
    "category": "Équipement",
    "level": 8,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 232 (P4, PDF 32)"
  },
  {
    "id": "asset-166",
    "name": "Ares Red Dog Series",
    "category": "Équipement",
    "level": 12,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 232 (P4, PDF 32)"
  },
  {
    "id": "asset-167",
    "name": "Moto tout-terrain",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-168",
    "name": "Moto de combat / chopper",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-169",
    "name": "Berline",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-170",
    "name": "SUV / pick-up",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-171",
    "name": "Van",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-172",
    "name": "Bus / semi-remorque",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-173",
    "name": "Jet-ski",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-174",
    "name": "Bateau pneumatique semi-rigide",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-175",
    "name": "Moto Horizon-Doble Revolution",
    "category": "Véhicule",
    "level": 2,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-176",
    "name": "Harley-Davidson Centaur",
    "category": "Véhicule",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-177",
    "name": "Mitsubishi Nightsky",
    "category": "Véhicule",
    "level": 9,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-178",
    "name": "Microdrone",
    "category": "Drone",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-179",
    "name": "Petit drone",
    "category": "Drone",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-180",
    "name": "Drone moyen",
    "category": "Drone",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-181",
    "name": "Grand drone",
    "category": "Drone",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-182",
    "name": "Shiawase Kanmushi",
    "category": "Drone",
    "level": 3,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-183",
    "name": "MCT Gnat",
    "category": "Drone",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-184",
    "name": "Cyberspace Design Quadrotor",
    "category": "Drone",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-185",
    "name": "Chrysler-Nissan Pursuit V",
    "category": "Drone",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-186",
    "name": "GM-Nissan Doberman",
    "category": "Drone",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-187",
    "name": "MCT-Nissan Roto-drone",
    "category": "Drone",
    "level": 5,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-188",
    "name": "Ares-DocWagon First Responder",
    "category": "Drone",
    "level": 9,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-189",
    "name": "Steel Lynx",
    "category": "Drone",
    "level": 7,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  },
  {
    "id": "asset-190",
    "name": "Trait à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 0,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-191",
    "name": "Éveillé",
    "category": "Modèle à personnaliser",
    "level": 0,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-192",
    "name": "Cyberware à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 1,
    "essence": 1,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-193",
    "name": "Bioware à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 2,
    "essence": 0.5,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-194",
    "name": "Pouvoir d’adepte à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 1,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-195",
    "name": "Équipement à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 0,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-196",
    "name": "Cyberdeck à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 1,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-197",
    "name": "Véhicule à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 1,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-198",
    "name": "Drone à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 1,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-199",
    "name": "Contact à personnaliser",
    "category": "Modèle à personnaliser",
    "level": 0,
    "essence": 0,
    "description": "Modèle de construction : compléter les effets et ajuster le niveau avec le meneur. Le niveau du trait dépend notamment de sa place parmi les traits du personnage.",
    "source": "Anarchy V2, p. 58–61 (P1, PDF 60–63)"
  },
  {
    "id": "asset-200",
    "name": "Bras d’escalade avec lance-grappin",
    "category": "Cyberware",
    "level": 6,
    "essence": 1.0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 158 (P3-1, PDF 27)"
  },
  {
    "id": "asset-201",
    "name": "Focus de manipulation",
    "category": "Focus",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 189 (P3-2, PDF 22)"
  },
  {
    "id": "asset-202",
    "name": "Moto de course",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-203",
    "name": "Voiture de sport",
    "category": "Véhicule",
    "level": 1,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-204",
    "name": "Artemis Industries Nightwing",
    "category": "Véhicule",
    "level": 4,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 238 (P4, PDF 38)"
  },
  {
    "id": "asset-205",
    "name": "Lockheed Optic-X2",
    "category": "Drone",
    "level": 6,
    "essence": 0,
    "description": "Valeurs de référence à adapter aux améliorations choisies. Consulter la page source pour les effets et conditions.",
    "source": "Anarchy V2, p. 241 (P4, PDF 41)"
  }
];
