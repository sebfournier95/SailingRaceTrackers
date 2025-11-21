# SailingRaceTrackers - Extraction et traitement de données du tracker Geovoile

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/sebfournier95/SailingRaceTrackers/tree/v0.0.0)
![Mise à jour](https://img.shields.io/badge/dernière%20mise%20à%20jour-Novembre%202025-green.svg)
![Mise à jour](https://img.shields.io/badge/dernière%20mise%20à%20jour-Novembre%202025-green.svg)
![Statut](https://img.shields.io/badge/statut-production-brightgreen.svg)
[![Licence](https://img.shields.io/badge/licence-LGPL_v3-blue.svg)](/LICENCE)

## 📋 Description

**SailingRaceTrackers** est un système automatisé Node.js spécialisé dans l'extraction et le traitement de données de trackers GPS depuis la plateforme **Geovoile** pour les courses nautiques. Ce système permet de récupérer, décoder et analyser des trajectoires de bateaux en temps réel depuis le système Geovoile utilisé par les plus grandes courses océaniques, avec **mise à jour automatique via GitHub Actions**.

Le système s'articule autour de quatre piliers principaux :

- **Extraction automatisée** : Récupération périodique des positions depuis les serveurs Geovoile avec décodage propriétaire
- **Traitement et analyse** : Conversion, nettoyage et enrichissement des trajectoires avec calculs nautiques
- **Automatisation GitHub Actions** : Exécution programmée, suivi continu et versioning automatique des données
- **Export multi-formats** : Génération de fichiers JSON structurés pour analyse et intégration

### Particularité technique

SailingRaceTrackers implémente le **décodage propriétaire** des données Geovoile (format binaire compressé), permettant l'extraction des positions GPS encodées par le système de tracking. Cette implémentation reverse-engineered garantit la compatibilité avec les flux de données officiels des courses et supporte **l'automatisation complète via CI/CD**.

## 🌟 Fonctionnalités

### Extraction de données Geovoile

- **Décodage propriétaire** : Implémentation du décodeur Geovoile (format `.hwx`) extrait depuis Chrome
- **Support multi-courses** : Compatible avec Vendée Globe, Transat Jacques Vabre, et autres courses utilisant Geovoile
- **Mise à jour automatique** : Scripts de téléchargement automatisés avec gestion des versions
- **Double format** : Récupération des configurations bateaux (`tracker_config.hwx`) et trajectoires (`tracker_tracks.hwx`)

### Traitement des données

- **Décompression et parsing** : Conversion des données binaires Geovoile en JSON lisible
- **Calculs nautiques** : Extraction de cap, vitesse, distance parcourue, DTF (Distance To Finish), DTL (Distance To Leader)
- **Historique complet** : Reconstruction des trajectoires complètes avec résolution temporelle fine
- **Métadonnées enrichies** : Informations de bateaux (nom, skipper, catégorie) depuis les fichiers de configuration

### Export et intégration

- **Format JSON structuré** : Données organisées par bateau avec métadonnées complètes
- **Trajectoires complètes** : Points GPS avec timestamps pour chaque bateau
- **Statistiques de course** : Classement, distances, vitesses moyennes
- **Extraction de métadonnées** : Notebooks Jupyter pour générer les informations bateaux

## 🗂️ Structure du projet

### Sur les branches de production (`prod-*`)

```
SailingRaceTrackers/
├── download-reports.js         # Script de téléchargement des données Geovoile
├── generate-result.js          # Script de génération des résultats traités
├── boats.json                  # Données brutes des bateaux (auto-généré)
├── tracks.json                 # Données des trajectoires (auto-généré)
├── boats_result.json           # Résultats traités finaux (auto-généré)
├── Notebook/                   # Notebooks Jupyter d'analyse
│   ├── Generate_BoatInfo.ipynb     # Extraction métadonnées bateaux
│   └── boatinfo_json_*.json        # Métadonnées par course (optionnel)
├── .github/                    # Configuration GitHub Actions
│   └── workflows/
│       └── generate-boats-result.yml  # Workflow d'automatisation
├── package.json                # Dépendances Node.js
├── package-lock.json           # Lock file des dépendances
├── .gitignore                  # Fichiers exclus du versioning
└── README.md                   # Documentation (ce fichier)
```

### Sur la branche master

La branche **`master`** contient uniquement :
- Ce fichier README avec la documentation complète
- Les templates de base pour créer de nouvelles branches de production
- Les exemples de configuration

### Architecture des branches

Le projet utilise une **architecture multi-branches** pour séparer les différentes courses :

```
master                    # Documentation et templates
├── prod-vg2024          # Vendée Globe 2024
├── prod-minitransat-2025 # Mini Transat 2025 - Production active
├── prod-tjava-2023      # Transat Jacques Vabre 2023
├── prod-aucb-2024       # Arkea Ultim Challenge Brest 2024
└── prod-rab-2023        # Retour à la Base 2023
```

**Principes de l'architecture :**
- **Une branche = Une course** : Chaque course a sa propre branche de production
- **Scripts standardisés** : Tous les scripts utilisent les mêmes noms de fichiers (`download-reports.js`, `generate-result.js`)
- **Configuration par branche** : Seuls les paramètres (hostname, chemins) changent entre les branches
- **Données versionnées** : Les fichiers JSON sont committés automatiquement selon la fréquence définie dans le CRON du workflow
- **Historique complet** : Chaque commit représente un instant T de la course

> ⚠️ **Important** : Pour utiliser le tracker sur une course, basculez toujours vers la branche `prod-*` correspondante. La branche `master` ne contient que la documentation.

## 🚀 Installation et utilisation

### Prérequis

#### Prérequis système

- **Node.js 18+** - Pour l'exécution des scripts de téléchargement
- **npm** - Gestionnaire de paquets Node.js
- **Python 3.10+** - Pour les notebooks d'analyse (optionnel)
- **uv** - Gestionnaire de paquets Python moderne (recommandé pour Python) ou **pip** classique
- **Accès Internet** - Pour la récupération des données en temps réel

### Installation

#### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/SailingRaceTrackers.git
cd SailingRaceTrackers
```

#### 2. Installer les dépendances Node.js

```bash
npm install
```

Les dépendances suivantes seront installées :
- [`axios`](package.json:3) - Client HTTP pour les requêtes vers Geovoile
- [`jsdom`](package.json:4) - Parsing HTML/XML pour les données de configuration

#### 3. (Optionnel) Installer l'environnement Python

Si vous souhaitez utiliser les notebooks Jupyter pour l'analyse, nous recommandons **uv**, un gestionnaire de paquets Python moderne et performant.

##### Installation de uv

```bash
# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# Ou via pip
pip install uv
```

##### Configuration de l'environnement

```bash
# Initialiser l'environnement avec uv
uv venv

# Activer l'environnement
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate

# Installer les dépendances avec uv (beaucoup plus rapide que pip)
uv pip install pandas numpy gpxpy pyproj jupyterlab xmltodict lxml
```

##### Alternative avec pip classique

Si vous préférez utiliser pip standard :

```bash
# Créer un environnement virtuel
python -m venv .venv

# Activer l'environnement
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate

# Installer les dépendances
pip install pandas numpy gpxpy pyproj jupyterlab xmltodict lxml
```

> **💡 Pourquoi uv ?** `uv` est 10-100x plus rapide que `pip` pour l'installation de paquets et offre une meilleure gestion des dépendances. Plus d'infos sur [docs.astral.sh/uv](https://docs.astral.sh/uv/)

### Utilisation

#### Mode 1 : Utilisation automatisée (recommandé)

**Le système est entièrement automatisé via GitHub Actions.** Une fois configuré, les données sont mises à jour automatiquement selon la fréquence définie dans le workflow.

##### Consulter les données automatiquement générées

```bash
# Basculer vers la branche de production de la course souhaitée
git checkout prod-minitransat-2025

# Récupérer les dernières données
git pull origin prod-minitransat-2025

# Les fichiers sont automatiquement à jour :
# - boats.json : données brutes des bateaux
# - tracks.json : trajectoires brutes
# - boats_result.json : données traitées et enrichies
```

**Avantages du mode automatisé :**
- ✅ Mise à jour automatique périodique sans intervention
- ✅ Historique complet dans les commits Git
- ✅ Données toujours disponibles et à jour
- ✅ Pas besoin d'exécuter les scripts manuellement
- ✅ Fonctionne 24/7, même ordinateur éteint

##### Comprendre l'automatisation GitHub Actions

Le workflow automatique (voir [`.github/workflows/generate-boats-result.yml`](.github/workflows/generate-boats-result.yml)) :

1. **Déclenchement** : Selon la fréquence définie dans le CRON (ex: `0 */1 * * *` pour toutes les heures) et à chaque push sur la branche
2. **Téléchargement** : Exécute [`download-reports.js`](download-reports.js) pour récupérer les données Geovoile
3. **Traitement** : Exécute [`generate-result.js`](generate-result.js) pour calculer les résultats
4. **Versioning** : Commit automatique des fichiers JSON avec horodatage
5. **Accessibilité** : Les données sont immédiatement disponibles via `git pull`

**Consulter l'historique des mises à jour :**
```bash
# Voir les 10 derniers commits (mises à jour)
git log --oneline -10

# Voir les changements entre deux instants
git diff HEAD~5 HEAD boats_result.json
```

#### Mode 2 : Exécution manuelle locale

Si vous souhaitez exécuter les scripts localement (développement, tests, ou utilisation hors GitHub) :

##### Téléchargement et génération des données

```bash
# Basculer vers la branche de production
git checkout prod-minitransat-2025

# Télécharger les données depuis Geovoile
node download-reports.js

# Générer les résultats traités
node generate-result.js

# Les fichiers générés :
# - boats.json : données brutes téléchargées
# - tracks.json : trajectoires brutes
# - boats_result.json : résultats traités et enrichis
```

Le script [`download-reports.js`](download-reports.js) :
- Se connecte au serveur Geovoile configuré (ligne 73: `geovoileHostname`)
- Récupère les données binaires compressées (format `.hwx`)
- Applique le décodeur propriétaire ([`UInt8Array`](download-reports.js:34))
- Sauvegarde les fichiers [`boats.json`](download-reports.js:133) et [`tracks.json`](download-reports.js:142)

Le script [`generate-result.js`](generate-result.js) :
- Charge les données brutes depuis [`boats.json`](generate-result.js:4) et [`tracks.json`](generate-result.js:5)
- Reconstruit les trajectoires complètes à partir des deltas cumulatifs
- Calcule les statistiques de course (cap, vitesse, distances, DTF, DTL, DTP)
- Exporte vers [`boats_result.json`](generate-result.js:122)

##### Courses disponibles

Les **implémentations fonctionnelles** se trouvent dans des **branches `prod-*` dédiées** :

| Course | Branche | Statut | GitHub Actions |
|--------|---------|--------|----------------|
| Mini Transat 2025 | `prod-minitransat-2025` | ✅ Active | Automatisé |
| Vendée Globe 2024 | `prod-vg2024` | 📦 Archivée | - |
| Transat Jacques Vabre 2023 | `prod-tjava-2023` | 📦 Archivée | - |
| Arkea Ultim Challenge Brest 2024 | `prod-aucb-2024` | 📦 Archivée | - |
| Retour à la Base 2023 | `prod-rab-2023` | 📦 Archivée | - |

> **💡 Note** : Les branches archivées contiennent les données historiques complètes mais n'ont plus d'automatisation active.

#### Structure des données générées

##### Format `boats_result_*.json`

```json
{
  "result": {
    "123": {
      "sail": 123,
      "rank": 1,
      "heading": 245,
      "speed": 18.5,
      "timestamp": 1699012345,
      "lat_dec": 46.275,
      "lon_dec": -1.475,
      "24hour_heading": 240,
      "24hour_distance": 450.5,
      "dtf": 1234.5,
      "dtl": 0.0,
      "dtp": 45.2,
      "track": [
        [46.275, -1.475],
        [46.280, -1.480],
        ...
      ]
    }
  }
}
```

Champs disponibles :
- `sail` : Numéro de voile du bateau
- `rank` : Classement actuel
- `heading` : Cap actuel (degrés)
- `speed` : Vitesse actuelle (nœuds)
- `timestamp` : Timestamp Unix de dernière position
- `lat_dec`, `lon_dec` : Position GPS (degrés décimaux)
- `24hour_distance` : Distance parcourue sur 24h (milles nautiques)
- `dtf` : Distance to Finish (milles nautiques)
- `dtl` : Distance to Leader (milles nautiques)
- `dtp` : Distance to Predecessor (milles nautiques)
- `track` : Tableau de points GPS `[lat, lon]`

#### Extraction de métadonnées bateaux

Les notebooks Jupyter permettent d'extraire les informations détaillées des bateaux :

```bash
# Lancer Jupyter Lab
jupyter lab

# Ouvrir le notebook
# Notebook/Generate_BoatInfo.ipynb
```

Le notebook [`Generate_BoatInfo.ipynb`](Notebook/Generate_BoatInfo.ipynb) :
- Charge les fichiers de configuration depuis Dropbox
- Parse les données XML des bateaux
- Extrait nom du bateau, skippers, catégorie
- Génère les fichiers [`boatinfo_json_*.json`](Notebook/Generate_BoatInfo.ipynb:80)

Structure des fichiers `boatinfo_json`:

```json
{
  "123": {
    "boatName": "Biotherm",
    "skipperNames": "Paul_Meilhat",
    "category": "IMOCA"
  }
}
```

#### Workflows d'utilisation

##### Workflow 1 : Consultation des données en temps réel (automatisé)

**Cas d'usage** : Suivre une course en cours sans exécuter de scripts

```bash
# 1. Cloner le dépôt (première fois uniquement)
git clone https://github.com/votre-username/SailingRaceTrackers.git
cd SailingRaceTrackers

# 2. Basculer vers la course souhaitée
git checkout prod-minitransat-2025

# 3. Récupérer les dernières données (à répéter quand besoin)
git pull origin prod-minitransat-2025

# 4. Analyser les données
cat boats_result.json | jq '.result | keys'  # Liste des bateaux
cat boats_result.json | jq '.result."123"'   # Détails du bateau 123

# 5. Analyser avec Python (optionnel)
jupyter lab Notebook/Generate_BoatInfo.ipynb
```

**Avantage** : Données toujours à jour sans rien exécuter. GitHub Actions fait tout le travail !

##### Workflow 2 : Développement et tests locaux

**Cas d'usage** : Développer ou tester des modifications

```bash
# 1. Basculer vers la branche de production
git checkout prod-minitransat-2025

# 2. Exécuter manuellement les scripts
node download-reports.js
node generate-result.js

# 3. Vérifier les résultats
git diff boats_result.json  # Comparer avec la version GitHub Actions

# 4. Analyser les données
cat boats_result.json | jq '.result | length'  # Nombre de bateaux
```

##### Workflow 3 : Créer une nouvelle branche de production pour une course

**Cas d'usage** : Ajouter le support d'une nouvelle course Geovoile

```bash
# 1. Partir de master ou d'une branche prod existante
git checkout master  # ou prod-minitransat-2025 pour partir d'un exemple
git checkout -b prod-newrace-2025

# 2. Modifier les paramètres dans download-reports.js
# - Ligne 73: geovoileHostname (ex: 'newrace.geovoile.com')
# - Ligne 74: resourcesBasePath (ex: '/2025/resources/versions/leg1/')
# - Ligne 75: trackerBasePath (ex: '/2025/tracker/resources/leg1/')

# 3. Tester le téléchargement
node download-reports.js

# 4. Adapter generate-result.js si nécessaire
# (généralement fonctionne tel quel si le format Geovoile est standard)
node generate-result.js

# 5. Vérifier les données générées
cat boats_result.json | jq '.result | keys'

# 6. Configurer GitHub Actions
# Modifier .github/workflows/generate-boats-result.yml :
# - Ligne 1: Nom du workflow
# - Ligne 11: Nom de la branche dans le trigger

# 7. Pousser vers GitHub
git add .
git commit -m "feat: ajout support pour New Race 2025"
git push origin prod-newrace-2025
```

**Important** : Après le premier push, GitHub Actions se déclenchera automatiquement selon la fréquence configurée.

##### Workflow 4 : Analyse historique d'une course

**Cas d'usage** : Analyser l'évolution d'une course terminée

```bash
# 1. Cloner la branche de la course
git checkout prod-vg2024

# 2. Explorer l'historique Git
git log --oneline --since="2024-11-01" --until="2024-11-10"

# 3. Extraire les données à un instant T
git checkout <commit-hash> boats_result.json

# 4. Comparer deux instants
git diff <commit1> <commit2> boats_result.json

# 5. Générer un export de l'évolution (exemple Python)
# Itérer sur les commits pour extraire les positions au fil du temps
```

**Avantage** : L'historique Git permet de rejouer la course dans son intégralité !

## 🔍 Détails techniques

### Algorithme de décodage Geovoile

Le module implémente le décodeur propriétaire Geovoile extrait depuis Chrome DevTools. L'algorithme utilise :

1. **XOR Shift RNG** : Générateur de nombres pseudo-aléatoires pour le déchiffrement
2. **Compression LZ77** : Décompression des trajectoires encodées
3. **Deltas cumulatifs** : Reconstruction des positions à partir de deltas

Le code de décodage se trouve dans la fonction [`UInt8Array()`](download-reports-VG.js:34-69) qui :
- Initialise le générateur aléatoire avec la première byte
- Décode la taille des données décompressées
- Applique l'algorithme de décompression LZ77
- Reconstruit le flux de données original

### Format des données Geovoile

#### `tracker_config.hwx`
Contient la configuration de la course :
- Liste des bateaux participants
- Métadonnées (nom, skipper, catégorie)
- Configuration du tracking

#### `tracker_tracks.hwx`
Contient les trajectoires encodées :
- Positions GPS sous forme de deltas
- Timestamps relatifs
- Indices de compression pour réduire la taille

### Reconstruction des trajectoires

Le script [`generate-result-VG.js`](generate-result-VG.js:33-48) reconstruit les trajectoires :

```javascript
// Point initial (coordonnées absolues)
const firstPoint = [
    (locForId[0][1] / 100000),
    (locForId[0][2] / 100000)
];

// Points suivants (deltas cumulés)
for (let j = 0; j < locForId.length - 1; j++) {
    lastLocDatetime += locForId[j + 1][0];  // Delta temps
    const transformedPoint = [
        (locForId[j + 1][1] / 100000) + track[j][0],  // Delta lat
        (locForId[j + 1][2] / 100000) + track[j][1]   // Delta lon
    ];
    track.push(transformedPoint);
}
```

## 📊 Courses supportées

Le module supporte toutes les courses utilisant la plateforme **Geovoile**. Chaque course dispose de sa propre **branche de production** (`prod-*`) avec une implémentation fonctionnelle complète.

### Implémentations disponibles

| Course | Année | Code | Branche | Hostname |
|--------|-------|------|---------|----------|
| **Vendée Globe** | 2024 | VG | `prod-vg2024` | tracking2024.vendeeglobe.org |
| **Transat Jacques Vabre** | 2023 | TJV | `prod-tjv-2023` | tracking2023.transat-jacques-vabre.org |
| **Arkea Ultim Challenge Brest** | 2024 | AUCB | `prod-aucb-2024` | tracking-aucb.geovoile.com |
| **Retour à la Base** | 2023 | RAB | `prod-rab-2023` | tracking-rab.geovoile.com |

> ⚠️ **Important** : La branche `master` contient uniquement des **templates génériques** et des **exemples pédagogiques** (fichiers `-VG`). Pour utiliser le tracker, basculez toujours vers la branche `prod-*` correspondante.

### Autres courses potentiellement supportables

Toute course utilisant la plateforme **Geovoile** peut être supportée en créant une nouvelle branche `prod-*`. Exemples de courses compatibles :

- **Route du Rhum** (RdR)
- **Mini Transat**
- **The Ocean Race** (certaines éditions)
- **Solitaire du Figaro**
- **Transat AG2R La Mondiale**

Pour chaque nouvelle course, il suffit de :
1. Identifier le hostname du tracker (ex: `tracking2023.transat-jacques-vabre.org`)
2. Dupliquer et adapter les scripts VG (ou consulter les branches prod pour des exemples)
3. Tester le téléchargement et la génération

### Ajout d'une nouvelle course

Pour ajouter le support d'une nouvelle course Geovoile :

1. **Consulter les exemples existants** :
```bash
# Voir les branches de production disponibles
git branch -r | grep prod-

# Exemple : consulter l'implémentation pour la Transat Jacques Vabre
git checkout prod-tjv-2023
# Examinez les fichiers download-reports-TJV.js et generate-result-TJV.js
```

2. **Dupliquer les scripts existants** :
```bash
# Revenir sur la branche de travail
git checkout dev

# Dupliquer les scripts (ou partir d'un exemple dans une branche prod-)
cp download-reports-VG.js download-reports-NEWRACE.js
cp generate-result-VG.js generate-result-NEWRACE.js
```

3. **Modifier le hostname** dans `download-reports-NEWRACE.js` :
```javascript
const geovoileHostname = 'tracking2024.newrace.org';
```

4. **Mettre à jour les noms de fichiers** :
```javascript
// Dans download-reports-NEWRACE.js
fs.writeFile('./boats-NEWRACE.json', reportData, ...);
fs.writeFile('./tracks-NEWRACE.json', reportData, ...);

// Dans generate-result-NEWRACE.js
const inputJson = fs.readFileSync('boats-NEWRACE.json', 'utf8');
const inputTracks = fs.readFileSync('tracks-NEWRACE.json', 'utf8');
fs.writeFileSync('boats_result_NEWRACE.json', resultJson, 'utf8');
```

5. **Tester le téléchargement** :
```bash
node download-reports-NEWRACE.js
node generate-result-NEWRACE.js
```

> **💡 Astuce** : Les branches `prod-xxxxx` contiennent des implémentations complètes et testées pour différentes courses. Utilisez-les comme référence pour identifier les adaptations spécifiques nécessaires (hostname, format de données, particularités de tracking, etc.).

## 🐙 Bonnes pratiques Git

Ce projet suit un workflow Git structuré pour garantir la qualité du code et la stabilité des versions de production.

### Structure des branches

Le projet utilise un système de branches pour organiser le développement :

- **`master`** : Branche de production contenant uniquement le code stable et testé
- **`dev`** : Branche de développement où les nouvelles fonctionnalités sont intégrées
- **`feat-xxxxx`** : Branches de fonctionnalités pour le développement isolé de nouvelles fonctionnalités
- **`fix-xxxxx`** : Branches dédiées aux corrections de bugs
- **`docs-xxxxx`** : Branches pour les modifications de documentation
- **`prod-xxxxx`** : Branches de déploiement pour des projets spécifiques

### Types de commits

Le projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/) pour structurer les messages de commit. Chaque commit doit commencer par un type suivi d'une description claire :

#### **`feat:`** Nouvelle fonctionnalité
Ajout d'une nouvelle fonctionnalité au code. Correspond à une incrémentation MINOR en versionnage sémantique.

**Exemples :**
```bash
feat: ajout du module d'analyse de densité pour les cachalots
feat: intégration du support des fichiers AIS pour les trajectoires
feat: implémentation du calcul de probabilité de collision multi-espèces
```

#### **`fix:`** Correction de bug
Correction d'un bug ou d'un comportement incorrect. Correspond à une incrémentation PATCH en versionnage sémantique.

**Exemples :**
```bash
fix: correction du calcul de distance pour les trajectoires circulaires
fix: résolution du problème d'encodage UTF-8 dans les fichiers GPX
fix: correction de la gestion des fuseaux horaires dans les données temporelles
```

#### **`docs:`** Documentation
Modifications concernant uniquement la documentation (README, commentaires, docstrings, etc.). N'affecte pas le code fonctionnel.

**Exemples :**
```bash
docs: mise à jour du guide d'installation avec les nouvelles dépendances
docs: ajout d'exemples d'utilisation du module de trajectoires
docs: correction des liens cassés dans le README
```

#### **`style:`** Formatage du code
Changements qui n'affectent pas le sens du code (espaces, formatage, points-virgules manquants, etc.).

**Exemples :**
```bash
style: application de black sur le module track.py
style: correction de l'indentation dans les fichiers Python
style: mise en conformité avec PEP 8 du module density.py
```

#### **`refactor:`** Refactorisation
Modification du code qui n'ajoute pas de fonctionnalité et ne corrige pas de bug. Améliore la structure interne du code.

**Exemples :**
```bash
refactor: réorganisation du module d'analyse en sous-modules
refactor: extraction de la logique de calcul dans une classe dédiée
refactor: simplification de la fonction de parsing des fichiers GPX
```

#### **`test:`** Ajout ou modification de tests
Ajout de tests manquants ou correction de tests existants.

**Exemples :**
```bash
test: ajout des tests unitaires pour le module density
test: correction des tests d'intégration pour l'analyse de collision
test: amélioration de la couverture de tests pour le module track
```

#### **`chore:`** Tâches de maintenance
Modifications qui ne concernent ni le code source ni les tests (mise à jour de dépendances, configuration, scripts de build, etc.).

**Exemples :**
```bash
chore: mise à jour des dépendances Python vers les dernières versions
chore: ajout de .gitignore pour les fichiers temporaires R
chore: configuration de pre-commit hooks pour le formatage automatique
```

### Workflow de développement

#### 1. Développement d'une nouvelle fonctionnalité

```bash
# Mettre à jour la branche dev
git checkout dev
git pull origin dev

# Créer une nouvelle branche de fonctionnalité
git checkout -b feat/nom-de-la-fonctionnalite

# Développer et commiter régulièrement
git add .
git commit -m "Description claire des modifications"

# Pousser la branche vers le dépôt distant
git push origin feat/nom-de-la-fonctionnalite
```

#### 2. Intégration d'une fonctionnalité

Après validation des tests unitaires :

```bash
# Mettre à jour dev avec les dernières modifications
git checkout dev
git pull origin dev

# Merger la fonctionnalité dans dev
git merge feat/nom-de-la-fonctionnalite

# Résoudre les conflits si nécessaire
# Tester l'intégration

# Pousser les modifications
git push origin dev
```

#### 3. Déploiement en production

```bash
# Mettre à jour master avec la dernière version de dev
git checkout master
git pull origin master

# Merger dev dans master
git merge dev

# IMPORTANT : Incrémenter la version dans README.md et pyproject.toml
# Suivre le versionnage sémantique : MAJOR.MINOR.PATCH
# - MAJOR : changements incompatibles avec les versions précédentes
# - MINOR : ajout de fonctionnalités rétrocompatibles
# - PATCH : corrections de bugs rétrocompatibles

# Exemple : 1.0.1 → 1.1.0 (nouvelle fonctionnalité)
#          1.1.0 → 2.0.0 (changement majeur)
#          1.1.0 → 1.1.1 (correction de bug)

# Créer un tag de version
git tag -a v1.1.0 -m "Version 1.1.0 : Description des changements"

# Pousser master et les tags
git push origin master
git push origin --tags
```

#### 4. Branches de production pour projets spécifiques

Les branches `prod-xxxxx` permettent d'utiliser la version la plus récente du code (depuis `master`) pour réaliser un projet spécifique sans polluer la branche dédiée au code stable. Elles peuvent également servir pour des correctifs urgents qui ne peuvent attendre le cycle normal de développement.

##### Cas d'usage : Projet spécifique

```bash
# Créer une branche de production depuis master
git checkout master
git pull origin master
git checkout -b prod/nom-du-projet

# Développer et adapter pour le projet
git add .
git commit -m "Feat: adaptation pour le projet X"

# Les modifications restent isolées dans cette branche
# Elles ne sont pas mergées dans master sauf si elles apportent
# une amélioration générique utile au projet principal
```

### Format des messages de commit

Utilisez des messages de commit clairs et descriptifs en respectant le format suivant :

```bash
# Format recommandé
git commit -m "type: description courte en minuscules

Description détaillée si nécessaire (optionnel)
- Point 1
- Point 2
- Point 3"
```

**Exemples complets :**

```bash
# Commit simple
git commit -m "feat: ajout du support des fichiers CSV pour les trajectoires"

# Commit avec description détaillée
git commit -m "fix: correction du calcul de distance

- Prise en compte de la courbure terrestre
- Amélioration de la précision pour les longues distances
- Ajout de tests unitaires pour valider la correction"
```

Pour plus de détails sur chaque type de commit, consultez la section [Types de commits](#types-de-commits) ci-dessus.

### Versionnage sémantique

Le projet suit la spécification [Semantic Versioning 2.0.0](https://semver.org/) :

- **Version format** : `MAJOR.MINOR.PATCH`
- **MAJOR** : Changements incompatibles de l'API
- **MINOR** : Ajout de fonctionnalités rétrocompatibles
- **PATCH** : Corrections de bugs rétrocompatibles

### 🔄 Processus de versionnage automatisé

Le versionnage est entièrement automatisé grâce à GitHub Actions.

Pour publier une nouvelle version :

1. **Faire un commit sur `master`** contenant dans le message un motif du type :

``` python 
Version vX.Y.Z : Description
```

2. Lors du push, le workflow :
- détecte automatiquement le numéro de version `X.Y.Z`
- met à jour tous les éléments liés à la version dans `README.md` :
  - badge de version (`version-1.0.1-blue.svg`)
  - badge “dernière mise à jour” basé sur la date du commit
  - lien vers le tag (`tree/vX.Y.Z`)
- met à jour tous les éléments liés à la version dans `pyproject.toml`
- met à jour automatiquement uv.lock avec la commande `uv lock`
- génère un **tag annoté** `vX.Y.Z` à partir du message du commit
- pousse le commit mis à jour ainsi que le tag vers le dépôt

### 📌 À noter
- Aucun fichier n’a besoin d’être modifié manuellement pour changer de version.
- Le README du tag `vX.Y.Z` est toujours synchronisé avec celui de `master`.
- Le tag final suit systématiquement le format : `vMAJOR.MINOR.PATCH`.

## ✅ Tâches à suivre

Cette section liste les tâches de développement en cours, les améliorations prévues et les bugs identifiés.

### 🚧 Développement en cours

- [ ] Migration vers une architecture modulaire avec décodeur centralisé
- [ ] Documentation complète de l'algorithme de décodage Geovoile

### 🔮 Améliorations prévues

#### Module d'extraction
- [ ] Support de l'authentification pour les courses privées
- [ ] Système de cache pour optimiser les requêtes répétées
- [ ] Mode offline avec synchronisation différée
- [ ] Retry automatique en cas d'échec de téléchargement
- [ ] Support de proxy pour contourner les restrictions IP

#### Traitement des données
- [ ] Calcul automatique des statistiques avancées (VMG, polaires)
- [ ] Détection et correction des anomalies de trajectoire
- [ ] Interpolation des points manquants
- [ ] Export vers format GPX pour compatibilité avec logiciels de navigation

#### Export et visualisation
- [ ] Export vers bases de données (InfluxDB, PostgreSQL)
- [ ] API REST pour accès aux données en temps réel
- [ ] Dashboard web de visualisation
- [ ] Export CSV avec métadonnées enrichies

#### Compatibilité
- [ ] Support de TypeScript pour meilleure maintenabilité
- [ ] Tests unitaires pour le décodeur
- [ ] CI/CD avec GitHub Actions
- [ ] Conteneurisation Docker

### 🧪 Tests à ajouter

- [ ] Tests unitaires pour le décodeur Geovoile
- [ ] Tests d'intégration pour les workflows complets
- [ ] Tests de validation des données générées
- [ ] Tests de performance sur grandes quantités de données
- [ ] Tests de robustesse face aux données corrompues

### 🐛 Bugs connus

- [ ] Gestion des timestamps négatifs dans certains cas edge
- [ ] Problèmes d'encodage avec certains caractères spéciaux dans les noms de bateaux accentués
- [ ] Décodage imparfait quand les données sont partiellement corrompues

### 🔄 Maintenance

- [ ] Mise à jour régulière des dépendances Node.js
- [ ] Vérification de la compatibilité avec les nouvelles versions de Geovoile
- [ ] Nettoyage des fichiers JSON temporaires
- [ ] Documentation des changements de format Geovoile

> **Note** : Cette liste est maintenue activement. Les éléments cochés sont complétés, les nouveaux items sont ajoutés au fur et à mesure de l'évolution du projet.

## 🔒 Sécurité et confidentialité

### Données sensibles

Les scripts ne collectent ni ne transmettent aucune donnée personnelle. Seules les données publiquement disponibles sur les trackers officiels des courses sont téléchargées.

### Respect des conditions d'utilisation

Ce projet est conçu pour un usage personnel et éducatif. Assurez-vous de respecter :
- Les conditions d'utilisation de Geovoile
- Les limitations de taux de requêtes (rate limiting)
- Les droits de propriété intellectuelle des organisateurs de courses

### Recommandations d'usage

- **Limitez la fréquence** de téléchargement à 5-10 minutes minimum entre requêtes
- **N'utilisez pas les données** à des fins commerciales sans autorisation
- **Mentionnez toujours** la source des données (Geovoile) dans vos publications


## 👥 Contributeurs

| Nom                    | Rôle |
|------------------------|------|
| [globe-coder](https://github.com/globe-coder) | Développeur principal (Fork) |
| [ccyrille](https://github.com/ccyrille) | Contributeur (Fork) |
| [Bendrog](https://github.com/Bendrog) | Contributeur (Fork) |
| [sebfournier95](https://github.com/sebfournier95) | Développeur principal |

## 📄 Licence

Ce projet est distribué sous la licence **GNU Lesser General Public License v3.0**.

Voir le fichier [`LICENCE`](LICENCE) pour plus d'informations.

## 📞 Contact

Pour toute question ou assistance, contactez l'équipe de développement :

- **Sébastien Fournier** : [sebastien.fournier.95@gmail.com](mailto:sebastien.fournier.95@gmail.com)

## 🙏 Remerciements

- **Geovoile** pour leur plateforme de tracking innovante
- Les **organisateurs de courses** (Vendée Globe, TJV, etc.) pour les données publiques
- La **communauté open-source** pour les outils utilisés (Node.js, Python, Jupyter)

---

**Outil de tracking pour les courses nautiques - Développé avec ❤️ pour les passionnés des trackers de course**