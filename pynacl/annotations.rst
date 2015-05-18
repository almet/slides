Qu'est-ce que je veux raconter ?
================================

Je veux raconter que la crypto est necessaire, mais facile à utiliser de
travers, ce qui peut amener à des problèmes (se faire passer pour quelqu'un
d'autre, déchiffrer des données privées, etc.)

Quel est le personnage principal de l'histoire ?
================================================

Un developeur qui connais bien son language de programmation, qui connait
certains concepts de base de crypto, mais qui ne les utilise pas parce que "la
crypto c'est compliqué".

Quelle est la raison de ma présence ici ?
=========================================

- En tant que developpeur chez mozilla, j'ai rencontré des "experts" de la
  cryptographie, qui m'ont permis d'y voir clair dans ce monde qui parait
  compliqué de l'exterieur (des maths appliqués). Merci Brian Warner.
- Je me rends compte de l'importance de la cryptographie dans nos applications
  de tous les jours, à fortiori suite a des projets de lois sur la surveillance
  généralisée.

Qu'est-ce que je veux que l'auditoire retienne ?
================================================

- La crypto c'est pas aussi compliqué;
- Se reposer sur des bibliothèques existantes qui nous simplifient la vie est
  important aussi d'un point de vue sécurité des applications.

Quels sont les retours d'expérience que j'ai à faire ?
======================================================

- Nous utilisons Sync à mozilla pour stocker des données utilisateurs
  critiques, et la cryptographie joue un role clé: le serveur ne voit jamais
  les données en clair, et pourtant les clients sont capables de synchroniser
  leurs données.
- L'utilisation du chiffrement permet de ne pas stocker d'informations
  confidentielle sur nos serveurs. Par exemple, pour Firefox Hello, aucune
  information n'est stockée sur les utilisateurs sans qu'elle soit chiffrée
  avec une clé qui n'est au moins accessible que lors de la requête (si
  quelqu'un récupère un "snapshot" à froid de la base les informations seront
  chiffrées).

Quel est l'auditoire ?
======================

- Codeurs ?
- Personnes qui font du logiciel libre ?
- Chefs d'entreprise ?
