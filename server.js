const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Définir le répertoire racine pour Windows ou Linux
const rootDirectory = path.resolve('/'); // Changez en 'C:\\' pour Windows si nécessaire

// Liste des fichiers et dossiers à ignorer sous Windows et Linux
const ignoreList = [
    'C:\\bootTel.dat',
    'C:\\DumpStack.log',
    'C:\\DumpStack.log.tmp',
    'C:\\hiberfil.sys',
    'C:\\pagefile.sys',
    'C:\\PerfLogs',
    'C:\\Recovery',
    'C:\\swapfile.sys',
    'C:\\System Volume Information',
    'C:\\Users\\DefaultAppPool',
    '/proc',
    '/sys',
    '/dev',
    '/boot',
    '/etc',
    '/var/log',
    '/tmp',
    '/root',
    '/run',
    '/mnt',
    '/media'
];

// Middleware pour servir les fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Fonction pour vérifier si un chemin doit être ignoré
function shouldIgnorePath(filePath) {
    return ignoreList.some(ignorePath => filePath.startsWith(ignorePath));
}

// Fonction pour récupérer le contenu d'un répertoire
function getDirectoryContent(directoryPath) {
    try {
        return fs.readdirSync(directoryPath).map(name => {
            const filePath = path.join(directoryPath, name);
            if (shouldIgnorePath(filePath)) {
                console.warn(`Ignoré: ${filePath}`);
                return null;
            }
            const isDirectory = fs.statSync(filePath).isDirectory();
            return {
                name,
                isDirectory,
                url: path.relative(rootDirectory, filePath).replace(/\\/g, '/')
            };
        }).filter(item => item !== null); // Filtrer les items null (ignorés)
    } catch (err) {
        console.error(`Erreur lors de la lecture du répertoire: ${err.message}`);
        return [];
    }
}

// Route pour afficher le contenu d'un répertoire
app.get('*', (req, res) => {
    let requestedPath = decodeURIComponent(req.path);
    
    // Si le chemin demandé est la racine
    if (requestedPath === '/') {
        requestedPath = ''; // Utiliser la racine du répertoire
    } else {
        requestedPath = requestedPath.slice(1); // Retirer le premier '/' pour correspondre à `rootDirectory`
    }

    const currentPath = path.join(rootDirectory, requestedPath);

    // Chemin du répertoire parent pour le lien de navigation
    const parentPath = path.dirname(currentPath);

    if (fs.existsSync(currentPath) && fs.statSync(currentPath).isDirectory()) {
        const files = getDirectoryContent(currentPath);

        // Calculer le chemin relatif du répertoire parent pour l'URL
        const relativeParentPath = path.relative(rootDirectory, parentPath).replace(/\\/g, '/');
        const parentUrl = relativeParentPath ? '/' + relativeParentPath : '/';

        // Éviter les chemins en double dans l'URL
        const normalizedCurrentPath = path.relative(rootDirectory, currentPath).replace(/\\/g, '/');

        res.render('index', { 
            files,
            parentPath: parentUrl,
            currentPath: normalizedCurrentPath
        });
    } else {
        res.status(404).send('Répertoire introuvable');
    }
});

// Configuration du moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});