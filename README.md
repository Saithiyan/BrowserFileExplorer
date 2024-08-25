# BrowserFileExplorer (BFE)

**BrowserFileExplorer** (BFE) est un explorateur de fichiers web permettant de naviguer et de télécharger des fichiers à partir d'une interface web. Ce projet fournit une interface utilisateur simple et intuitive pour explorer les répertoires et les fichiers sur un serveur, tout en permettant le téléchargement direct de fichiers depuis le navigateur.

## Fonctionnalités

- **Navigation des répertoires** : Parcourez les répertoires de votre système de fichiers via une interface web.
- **Téléchargement de fichiers** : Téléchargez des fichiers directement depuis l'interface web.
- **Interface utilisateur** : Vue en liste ou en cartes pour une meilleure visualisation des fichiers et répertoires.
- **Thèmes** : Basculer entre les modes clair et sombre pour une meilleure personnalisation.

## Prérequis

Avant de pouvoir exécuter le projet, assurez-vous d'avoir installé les éléments suivants sur votre système :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)

## Installation

Pour installer et exécuter le projet, suivez ces étapes :

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/Saithiyan/BrowserFileExplorer.git
   ```

2. **Accédez au répertoire du projet :**
```bash
cd BrowserFileExplorer
```

3. **Installez les dépendances :**
```bash
npm install
```

4. **Démarrez le serveur :**
```bash
npm bje
```
Par défaut, le serveur sera disponible sur http://localhost:3000.

## Utilisation
Naviguer dans les répertoires : Utilisez les liens fournis pour explorer les répertoires. Vous pouvez cliquer sur les répertoires pour les ouvrir ou sur les fichiers pour les télécharger.

Télécharger des fichiers : Cliquez sur le lien de téléchargement associé aux fichiers pour les télécharger sur votre ordinateur.

Changer le thème : Utilisez le bouton de basculement de thème pour passer entre le mode clair et sombre.

Changer la vue : Utilisez le bouton de basculement de vue pour passer entre la vue en liste et la vue en cartes.

## Structure du Projet
server.js : Le fichier principal du serveur Node.js. Configure le serveur Express et gère les requêtes pour la navigation et le téléchargement de fichiers.
views/ : Contient les fichiers de template EJS pour le rendu de l'interface web.
public/ : Contient les fichiers statiques accessibles au public, tels que les CSS et JavaScript.
assets/ : Contient les icônes et images utilisées dans l'interface utilisateur.
package.json : Fichier de configuration du projet contenant les dépendances et les scripts npm.

## Auteur

- **Sai** - [Profil GitHub](https://github.com/Saithiyan)


