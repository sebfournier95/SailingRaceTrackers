# GeovoileTracker - Extraction et traitement de données du tracker Geovoile

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Mise à jour](https://img.shields.io/badge/dernière%20mise%20à%20jour-Novembre%202025-green.svg)
![Statut](https://img.shields.io/badge/statut-en%20développement-yellow.svg)
![Licence](https://img.shields.io/badge/licence-propriétaire-red.svg)

## 📋 Description

**GeovoileTracker** est un outil Node.js/Python spécialisé dans l'extraction et le traitement de données de trackers GPS depuis la plateforme **Geovoile** pour les courses nautiques de haut niveau. Ce module permet de récupérer, décoder et analyser des trajectoires de bateaux en temps réel depuis le système Geovoile utilisé par les plus grandes courses océaniques.

Le module s'articule autour de trois fonctionnalités principales :

- **Extraction de données** : Récupération automatique des positions depuis les serveurs Geovoile avec décodage propriétaire
- **Traitement et analyse** : Conversion, nettoyage et enrichissement des trajectoires via notebooks Jupyter
- **Export multi-formats** : Génération de fichiers JSON structurés pour analyse et intégration

### Particularité technique

GeovoileTracker implémente le **décodage propriétaire** des données Geovoile (format `.hwx`), permettant l'extraction des positions GPS qui sont encodées par le système de tracking. Cette implémentation reverse-engineered garantit la compatibilité avec les flux de données officiels des courses.

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

```
GeovoileTracker/
├── download-reports.js         # Template de script de téléchargement générique
├── download-reports-VG.js      # Exemple de script (Vendée Globe 2024)
├── generate-result.js          # Template de script de génération générique
├── generate-result-VG.js       # Exemple de script (VG 2024)
├── boats.json                  # Template de fichier de configuration bateaux
├── boats-VG.json               # Exemple de données (VG 2024)
├── tracks.json                 # Template de fichier de trajectoires
├── tracks-VG.json              # Exemple de données (VG 2024)
├── boats_result.json           # Template de fichier de résultats
├── boats_result_VG.json        # Exemple de données (VG 2024)
├── Notebook/                   # Notebooks Jupyter d'analyse
│   ├── Generate_BoatInfo.ipynb     # Extraction métadonnées bateaux
│   └── boatinfo_json_VG.json       # Exemple de métadonnées (VG 2024)
├── .github/                    # Configuration GitHub (workflows, etc.)
├── package.json                # Dépendances Node.js
├── package-lock.json           # Lock file des dépendances
├── .gitignore                  # Fichiers exclus du versioning
├── example.md                  # Exemple de documentation (template)
└── README.md                   # Ce fichier
```

### Notes sur la structure

- La branche **`master`** contient uniquement les **templates génériques** et des **exemples de référence**
- Les fichiers **sans suffixe** (`download-reports.js`, `generate-result.js`, etc.) sont des **templates** réutilisables pour toute course
- Les fichiers **avec suffixe `-VG`** sont des **exemples** basés sur la Vendée Globe 2024, utilisables comme point de départ pour créer vos propres scripts
- Les **implémentations fonctionnelles** pour chaque course (y compris la Vendée Globe 2024) sont dans des **branches `prod-xxxxx`** dédiées
- **Pour utiliser réellement le tracker sur une course**, basculez vers la branche `prod-` correspondante (ex: `prod-vg2024`, `prod-tjv-2023`, etc.)

> ⚠️ **Important** : Les fichiers `-VG` sur `master` sont des **exemples pédagogiques** uniquement. Pour suivre la Vendée Globe 2024 en temps réel, utilisez la branche [`prod-vg2024`].

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
git clone https://github.com/votre-username/GeovoileTracker.git
cd GeovoileTracker
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

#### Téléchargement de données depuis Geovoile

> ⚠️ **Note importante** : Les exemples ci-dessous montrent les **templates de référence** disponibles sur `master`. Pour utiliser réellement le tracker sur une course, basculez vers la **branche `prod-`** correspondante.

##### Exemple : Vendée Globe 2024

Les fichiers [`download-reports-VG.js`](download-reports-VG.js) et [`generate-result-VG.js`](generate-result-VG.js) sur `master` sont des **exemples pédagogiques** montrant comment adapter les templates.

**Pour suivre la Vendée Globe 2024 en temps réel** :
```bash
# Basculer vers la branche de production
git checkout prod-vg2024

# Télécharger les données
node download-reports-VG.js

# Générer les résultats
node generate-result-VG.js
```

##### Pour d'autres courses

Les **implémentations fonctionnelles** de toutes les courses se trouvent dans des **branches `prod-*` dédiées** :

| Course | Branche | Commande |
|--------|---------|----------|
| Vendée Globe 2024 | `prod-vg2024` | `git checkout prod-vg2024` |
| Transat Jacques Vabre 2023 | `prod-tjv-2023` | `git checkout prod-tjv-2023` |
| Arkea Ultim Challenge Brest 2024 | `prod-aucb-2024` | `git checkout prod-aucb-2024` |
| Retour à la Base 2023 | `prod-rab-2023` | `git checkout prod-rab-2023` |

> **💡 Conseil** : Consultez les branches `prod-*` pour voir des implémentations complètes et fonctionnelles adaptées à chaque course spécifique.

#### Génération de résultats traités

Une fois les données téléchargées, générez les fichiers de résultats structurés :

```bash
# Vendée Globe 2024
node generate-result-VG.js
```

Pour d'autres courses, créez des scripts spécifiques en dupliquant et adaptant [`generate-result-VG.js`](generate-result-VG.js).

Le script [`generate-result-VG.js`](generate-result-VG.js) :
- Charge les données brutes depuis [`boats-VG.json`](generate-result-VG.js:4) et [`tracks-VG.json`](generate-result-VG.js:5)
- Reconstruit les trajectoires complètes à partir des deltas
- Calcule les statistiques de course (cap, vitesse, distances)
- Exporte vers [`boats_result_VG.json`](generate-result-VG.js:87)

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

#### Workflow typique

##### Workflow 1 : Suivi d'une course en temps réel

```bash
# 1. Télécharger les dernières données
node download-reports-VG.js

# 2. Générer les résultats traités
node generate-result-VG.js

# 3. Analyser avec Python (optionnel)
jupyter lab Notebook/Generate_BoatInfo.ipynb
```

##### Workflow 2 : Mise à jour automatique

Créer un script de mise à jour automatique (exemple avec cron sur Linux) :

```bash
#!/bin/bash
# update-vg.sh

cd /path/to/GeovoileTracker
node download-reports-VG.js && node generate-result-VG.js
```

Ajouter au crontab pour exécution toutes les 5 minutes :

```bash
*/5 * * * * /path/to/update-vg.sh
```

##### Workflow 3 : Développement d'une nouvelle course

```bash
# 1. Dupliquer les scripts existants
cp download-reports-VG.js download-reports-NEWRACE.js
cp generate-result-VG.js generate-result-NEWRACE.js

# 2. Modifier le hostname et les paramètres dans les scripts

# 3. Tester le téléchargement
node download-reports-NEWRACE.js

# 4. Générer les résultats
node generate-result-NEWRACE.js

# 5. Vérifier les données générées
cat boats_result_NEWRACE.json | jq '.result | keys'
```

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

## 🔧 Bonnes pratiques Git

Ce projet suit un workflow Git structuré pour garantir la qualité du code et la stabilité des versions de production.

### Structure des branches

Le projet utilise un système de branches pour organiser le développement :

- **`master`** : Branche de production contenant uniquement le code stable et testé
- **`dev`** : Branche de développement où les nouvelles fonctionnalités sont intégrées
- **`feat-xxxxx`** : Branches de fonctionnalités pour le développement isolé de nouvelles fonctionnalités
  - Exemple : `feat-nouvelle-course-rdr2026`, `feat-export-gpx`, `feat-dashboard-web`
- **`fix-xxxxx`** : Branches dédiées aux corrections de bugs
  - Exemple : `fix-decode-timestamps`, `fix-utf8-encoding`
- **`docs-xxxxx`** : Branches pour les modifications de documentation
  - Exemple : `docs-update-readme`, `docs-add-algorithm-doc`
- **`prod-xxxxx`** : Branches de production pour des projets ou courses spécifiques
  - Exemple : `prod-tjv-2023`, `prod-rdr-2026`, `prod-aucb-2024`

### Conventions de nommage des branches

- Utilisez des **tirets** (`-`) pour séparer le type et le nom : `type-description`
- Le nom doit être en **kebab-case** (mots en minuscules séparés par des tirets)
- Soyez **descriptif** mais **concis** : `feat-export-gpx` plutôt que `feat-add-new-export-feature-for-gpx`
- Pour les branches de production, incluez le **code de la course/projet** et l'**année** : `prod-vg-2024`, `prod-tjv-2023`

### Types de commits

Le projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/) pour structurer les messages de commit :

#### **`feat:`** Nouvelle fonctionnalité
Ajout d'une nouvelle fonctionnalité au code.

**Exemples :**
```bash
feat: ajout du support de la Transat Jacques Vabre 2023
feat: implémentation du calcul de VMG sur 24h dans generate-result
feat: ajout de l'export GPX des trajectoires
feat: création d'un script de téléchargement automatique
```

#### **`fix:`** Correction de bug
Correction d'un bug ou d'un comportement incorrect.

**Exemples :**
```bash
fix: correction du décodage des timestamps négatifs dans UInt8Array
fix: résolution du problème d'encodage UTF-8 dans boats-VG.json
fix: correction de la reconstruction des trajectoires avec points manquants
fix: gestion des erreurs réseau dans download-reports-VG.js
```

#### **`docs:`** Documentation
Modifications concernant uniquement la documentation.

**Exemples :**
```bash
docs: mise à jour du README avec exemples de courses
docs: ajout de documentation sur l'algorithme de décodage
docs: correction des liens cassés vers les scripts
```

#### **`refactor:`** Refactorisation
Modification du code qui n'ajoute pas de fonctionnalité et ne corrige pas de bug.

**Exemples :**
```bash
refactor: extraction du décodeur UInt8Array en module séparé
refactor: simplification de la fonction findLocById dans generate-result
refactor: harmonisation des noms de variables entre download-reports et generate-result
refactor: réorganisation de la structure des dossiers
```

#### **`chore:`** Tâches de maintenance
Modifications qui ne concernent ni le code source ni les tests.

**Exemples :**
```bash
chore: mise à jour d'axios vers la version 1.7.7
chore: ajout des fichiers JSON de données dans .gitignore
chore: configuration de prettier pour le formatage JavaScript
chore: mise à jour du package-lock.json
```

### Workflow de développement

#### 1. Développement d'une nouvelle fonctionnalité

```bash
# Mettre à jour la branche dev
git checkout dev
git pull origin dev

# Créer une nouvelle branche de fonctionnalité
git checkout -b feat-export-gpx

# Développer et commiter régulièrement
git add .
git commit -m "feat: ajout de la fonctionnalité d'export GPX"

# Pousser la branche vers le dépôt distant
git push origin feat-export-gpx
```

#### 2. Intégration d'une fonctionnalité

```bash
# Mettre à jour dev avec les dernières modifications
git checkout dev
git pull origin dev

# Merger la fonctionnalité dans dev
git merge feat-export-gpx

# Tester l'intégration
node download-reports-VG.js
node generate-result-VG.js
# Vérifier que tout fonctionne

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

# Incrémenter la version dans README.md
# Suivre le versionnage sémantique : MAJOR.MINOR.PATCH

# Créer un tag de version
git tag -a v1.1.0 -m "Version 1.1.0 : Ajout export GPX et amélioration décodeur"

# Pousser master et les tags
git push origin master
git push origin --tags
```

### Format des messages de commit

```bash
# Format recommandé
git commit -m "type: description courte en minuscules

Description détaillée si nécessaire (optionnel)
- Point 1
- Point 2
- Point 3"
```

### Versionnage sémantique

Le projet suit la spécification [Semantic Versioning 2.0.0](https://semver.org/) :

- **Version format** : `MAJOR.MINOR.PATCH`
- **MAJOR** : Changements incompatibles (ex: refonte complète du décodeur)
- **MINOR** : Ajout de fonctionnalités rétrocompatibles (ex: nouvelle course)
- **PATCH** : Corrections de bugs rétrocompatibles (ex: fix décodage)

Fichier à mettre à jour lors d'un changement de version :
- Badge de version dans ce README (ligne 3)

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

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez** le projet
2. Créez une **branche de fonctionnalité** depuis `dev` : `git checkout -b feat-amazing-feature`
3. **Commitez** vos changements en suivant les conventions : `git commit -m 'feat: add amazing feature'`
4. **Pushez** vers votre fork : `git push origin feat-amazing-feature`
5. Ouvrez une **Pull Request** vers la branche `dev` du dépôt principal

### Guidelines de contribution

- ✅ **Suivez les conventions de commit** (Conventional Commits - voir section [Types de commits](#types-de-commits))
- ✅ **Testez votre code** : vérifiez que les scripts fonctionnent correctement
- ✅ **Mettez à jour la documentation** : ajoutez/modifiez le README si nécessaire
- ✅ **Respectez le style de code** : utilisez le formatage existant (Prettier pour JS)
- ✅ **Une PR = un sujet** : ne mélangez pas plusieurs fonctionnalités ou corrections

### Processus de review

1. Les **Pull Requests** sont reviewées par les mainteneurs
2. Après approbation, elles sont **mergées dans `dev`**
3. Les tests d'intégration sont effectués sur `dev`
4. Les versions stables sont **mergées de `dev` vers `master`**
5. Un **tag de version** est créé sur `master` pour chaque release (ex: `v1.1.0`)

### Comment contribuer à une nouvelle course

Si vous souhaitez ajouter le support d'une nouvelle course :

1. **Consultez les exemples existants** dans les branches `prod-` pour voir des implémentations de référence
2. Créez une branche `prod-nom-course-année` depuis `dev` (ou depuis `master` pour une utilisation production immédiate)
3. Dupliquez les scripts VG (ou partez d'un exemple dans une branche prod-) et adaptez-les
4. Testez minutieusement avec des données réelles
5. Documentez les spécificités de la course (hostname, format de données, etc.)
6. Soumettez une PR avec des exemples de résultats

> **Note sur les branches prod-** : Les branches `prod-xxxxx` contiennent les **implémentations fonctionnelles complètes** pour des courses spécifiques. Elles sont basées sur les templates de `master` mais adaptées avec les configurations réelles de chaque course (hostname, parsing spécifique, etc.). Ces branches servent de **code de production** pour le suivi en temps réel ET de **documentation vivante** pour de nouvelles implémentations.

**Implémentations disponibles :**
- `prod-vg2024` : Vendée Globe 2024 (implémentation complète et opérationnelle)
- `prod-tjv-2023` : Transat Jacques Vabre 2023
- `prod-aucb-2024` : Arkea Ultim Challenge Brest 2024
- `prod-rab-2023` : Retour à la Base 2023

## 👥 Contributeurs

- **Sébastien Fournier** - Développeur principal - [sebastien.fournier.95@gmail.com](mailto:sebastien.fournier.95@gmail.com)

## 📄 Licence

Licence propriétaire

Tous droits réservés.

Ce logiciel est protégé par les lois sur la propriété intellectuelle et les traités internationaux. Toute reproduction ou distribution non autorisée de ce logiciel, ou de toute partie de celui-ci, peut entraîner de graves sanctions civiles et pénales, et sera poursuivie dans toute la mesure permise par la loi.

## 📞 Contact

Pour toute question ou assistance, contactez l'équipe de développement :

- **Sébastien Fournier** : [sebastien.fournier.95@gmail.com](mailto:sebastien.fournier.95@gmail.com)

## 🙏 Remerciements

- **Geovoile** pour leur plateforme de tracking innovante
- Les **organisateurs de courses** (Vendée Globe, TJV, etc.) pour les données publiques
- La **communauté open-source** pour les outils utilisés (Node.js, Python, Jupyter)

---

**Outil de tracking pour les courses nautiques - Développé avec ❤️ pour les passionnés de voile**