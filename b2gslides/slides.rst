Pourquoi Firefox OS ?
#####################

----

On se connait ?
===============

----

Pourquoi Firefox OS ?
=====================

- Un téléphone avec des technologies utilisées partout;
- Pousser la plateforme web;
- Éviter les silos propriétaires;
- Créer des standards web necessaires.

----

Historique rapide
#################

----

- Decembre 2012: 1.0
- Juillet 2014: 2.0


----

Quelle architecture ?
#####################


----

Packager pour le web
####################

----

Périphériques
=============

- Téléphones Android
- Téléphones FirefoxOS
- Applications "de bureau" / Firefox desktop
- Tablettes, TV, Dongle (matchstick)…

----

Vos sites web peuvent se transformer en app
###########################################

----

Types d'applications
====================

- packagées (certifiées / privilégiées)
- hebergées

----

Process de revue
================

- Qualité du code et de l'interface;
- Sécurité (malwares)

----

Pour les applications empaquetées
=================================

- .js + .html + .css →  zip !
- Un fichier "manifest.webapp" à la racine

::

    $ zip -r package.zip .

----

manifest.webapp
===============

::
    
    {                                                       
      "name": "Novaplanet",
      "description": "Nova la nuit, mais pendant la journée.",
      "launch_path": "/index.html",
      "icons": {
        "128": "/img/icon-128.png"
      },
      "developer": {
        "name": "Alexis",
        "url": "http://notmyidea.org"
      },
      "default_locale": "fr",
      "fullscreen": "true",
      "audio-channel-content": {}
    }


----

Utilisation du marketplace?
===========================

Marketplace pas necessaire tout le temps

1. Uploadez les fichiers quelque part;
2. Créez un fichier `package.manifest`::

    {
        "name": "Votre app",
        "package_path" : "http://domain.tld/app-directory/my-app.zip",
        "version": "1",
        "developer": {
            "name": "Alexis",
            "url": "http://domain.tld"
        }
    } 

----

Pour les applications hebergées
===============================

- Mime Type: `application/x-web-app-manifest+json`.
- Une seule application par origine

----

Installer depuis une page html
==============================

`navigator.mozApps.installPackage` avec l'url du manifest::

   var manifestUrl = 'http://domain.tld/app-directory/package.manifest';
   var req = navigator.mozApps.installPackage(manifestUrl);
   req.onsuccess; // this.result.origin
   req.onerror; // this.error.name

----

Les APIs auquelles vous pouvez avoir accès
##########################################

----

Définitions
===========

https://wiki.mozilla.org/WebAPI/#Planned_for_initial_release_of_B2G_.28aka_Basecamp.29

- **Certifié** = Uniquement pour les applications qui font parti de FirefoxOS directement (pas public);

- **Privilégié** = Uniquement pour les applications qui ont étées approuvées sur le marketplace;

- Flashez votre téléphone pour autoriser d'autres certs: https://github.com/briansmith/marketplace-certs

----

APIs pour tout le monde
=======================

https://developer.mozilla.org/en-US/Apps/Build/App_permissions

- **Vibration API**: Controle la vibration du periphérique, par exemple pour le
  "haptic feedback" dans les jeux;
- **Screen Orientation**: Permet d'etre notifié quand l'orientation du periphérique
  change, et controle ce que l'application veut comme orientation;
- **Geolocation API**: Pour connaitre l'emplacement de l'utilisateur
- **Open WebApps** : mozApps

----

APIs (2)
========

- **Battery Status API**:  Connaitre quel est le niveau de charge de la batterie et si le periphérique est connecté;
- **Alarm API**: planifier une notification ou pour démarer une application à un certain moment;
- **Web Activities**: délègue une activité à une autre application (pensez à la navigation de photos par exemple);
- **Push Notifications API**: permet de reveiller des applications à la demande d'un serveur;
- **WebFM API**: Pour pouvoir faire de la radio FM;

----

APIs (3)
========

- **FileHandle API**: écriture de fichiers;
- **WebPayment**: permet à une application Web d'initier des paiements;
- **IndexedDB**: Permet de stocker et d'acceder des données sur le client;
- **Ambiant light sensor**: Accède aux capteurs de lumière ambiente;
- **Proximity sensor**: Capteurs de proximités
- **WebRTC**

----

Petite démonstration
====================

- Installer une app
- Debugger une app

----

Merci
=====
