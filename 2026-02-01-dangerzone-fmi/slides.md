---
theme: default
title: Dangerzone, ouvrir des documents en toute sécurité
drawings:
  persist: false
transition: slide-left
---

# Dangerzone 

**Ouvrir des documents en toute sécurité**

Alexis Métaireau, Freedom of the Press Foundation

Atelier Festival des Médias Indépendants - Avril 26

---

# Qui suis-je ?

<v-clicks>

- **Alexis Métaireau**
- Développeur logiciel à la **Freedom of the Press Foundation** (FPF)
- Je travaille sur **Dangerzone** et d'autres outils pour journalistes et sources
- Développeur open source

</v-clicks>

---

# Freedom of the Press Foundation

<v-clicks>

Une Organisation à but non lucratif basée aux **États-Unis**

- **Plaidoyer** pour la liberté de la presse
- **Formation des journalistes** sur la sécurité numérique
- **Documentation** des atteintes à la liberté de la press (press freedom tracker)
- Développement d'**outils libres** pour :
  - Les **journalistes**
  - Les **sources** et lanceurs d'alerte
- Projets phares : **SecureDrop**, **Dangerzone**, suivi des atteintes à la presse aux États-Unis…

</v-clicks>

---
layout: center
---

# SecureDrop est utilisé par…

<img src="/assets/securedrop-orgs.png" class="rounded mx-auto" width="820" />

<div class="text-xs opacity-60 mt-4 text-center">
Plus de 80 rédactions à travers le monde utilisent SecureDrop pour recevoir des documents de sources anonymes.
</div>

---
layout: center
---

# Objectifs de cet atelier

<v-clicks>

- Avoir en tête les **risques liés à l'ouverture de documents**
- Présenter **une solution** concrète : **Dangerzone**

</v-clicks>

---
layout: center
---

# Deux problèmes distincts

---

# Problème nº 1 — Les documents peuvent être piégés

<v-clicks>

- Un PDF, un document Word, un tableur peut contenir du **code malveillant**
- Ouvrir un fichier reçu d'une source inconnue = **risque de compromission** de votre machine
- Les journalistes sont des **cibles privilégiées** (États, entreprises, adversaires politiques)

</v-clicks>

<v-click>

<div class="mt-8 p-4 bg-red-100 dark:bg-red-900/30 rounded">
⚠️ Un document malveillant peut compromettre tout votre système.
</div>

</v-click>

---

# Problème nº 2 — Les documents peuvent trahir leurs sources

<v-clicks>

- Un document contient souvent **bien plus d'informations** qu'il n'y paraît :
  - **Métadonnées** (auteur, logiciel, date, GPS…)
  - **Caviardages** mal faits
  - **Filigranes** visibles ou invisibles
  - **Points ajoutés par les imprimantes**
- Publier un document brut peut **exposer la personne** qui vous l'a fourni

</v-clicks>

<v-click>

<div class="mt-8 p-4 bg-red-100 dark:bg-red-900/30 rounded">
⚠️ Un document peut dé-anonymiser votre source.
</div>

</v-click>

---
layout: image-right
image: /assets/evidence-bag.jpg
---

# Quelques cas réels

Quand un document a trahi sa source…

---

# Cas 1 — John McAfee et les métadonnées GPS

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/mcafee-photo.jpg" class="rounded" />
  <img src="/assets/wired-mcafee-headline.jpg" class="rounded" />
</div>

<v-clicks>

- 2012 : John McAfee est en cavale, interviewé par des journalistes de *Vice*
- Ils publient une photo prise avec un iPhone
- Les **coordonnées GPS** étaient dans les métadonnées EXIF
- Sa cachette au Guatemala est révélée en quelques heures

</v-clicks>

<div class="text-xs opacity-60 mt-2">
https://wired.com/2012/12/oops-did-vice-just-give-away-john-mcafees-location-with-this-photo/
</div>

---

# Cas 2 — Google et les métadonnées d'un PDF

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/xml-metadata.jpg" class="rounded" />
  <img src="/assets/register-google-headline.jpg" class="rounded" />
</div>

<v-clicks>

- 2008 : Google dépose un document **anonyme** auprès du régulateur australien
- Les **métadonnées** du PDF contiennent le nom de l'auteur
- On y voit clairement que Google est l'auteur

</v-clicks>

<div class="text-xs opacity-60 mt-2">
theregister.com/2008/05/30/metadata_ruins_google_accc_filing/
</div>

---

# Cas 3 — Sony et les caviardages qui n'en sont pas

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/redaction-sharpie.jpg" class="rounded" />
  <img src="/assets/verge-sony-headline.jpg" class="rounded" />
</div>

<v-clicks>

- 2023 : Sony dépose des documents confidentiels dans un procès contre Microsoft
- Les passages « noircis » étaient **des calques non opaques**
- On pouvait **lire les dates et les chiffres** directement à travers les caviardages

</v-clicks>

<div class="text-xs opacity-60 mt-2">
theverge.com/2023/6/28/23777298/sony-ftc-microsoft-confidential-documents-marker-pen-scanner
</div>

---

# Cas 4 — Les traces des imprimantes

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/nsa-report.jpg" class="rounded" />
  <img src="/assets/atlantic-reality-winner.jpg" class="rounded" />
</div>

<v-clicks>

- 2017 : *The Intercept* publie un document secret de la NSA
- Le document avait été **imprimé puis scanné** par la source
- Les imprimantes laser ajoutent des **points jaunes invisibles** (*tracking dots*)
- Ces points identifient l'imprimante et l'heure → Reality Winner est arrêtée

</v-clicks>

<div class="text-xs opacity-60 mt-2">
theatlantic.com/technology/archive/2017/06/the-mysterious-printer-code-that-could-have-led-the-fbi-to-reality-winner/
</div>

---

# Cas 5 — Filigranes invisibles

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/watermark-service.jpg" class="rounded" />
  <img src="/assets/intercept-musk-headline.jpg" class="rounded" />
</div>

<v-clicks>

- Il est possible d'insérer des **filigranes invisibles** dans les documents
- Certaines plateformes proposent cela comme service
- Espacements de mots, tournures de phrases, pixels altérés…
- Chaque copie distribuée peut être **unique** → la fuite peut être tracée jusqu'à la source

</v-clicks>

---

# Cas 6 — Les effets d'environnement

<div class="grid grid-cols-2 gap-4 items-center">
  <img src="/assets/sasaeng-eye.jpg" class="rounded" />
  <img src="/assets/koreaboo-headline.jpg" class="rounded" />
</div>

<v-clicks>

- Une fan (« sasaeng ») a retrouvé l'adresse d'une idole japonaise
- En zoomant sur le **reflet dans ses yeux** sur une photo publiée en ligne
- Caméras et micros capturent **tout l'environnement** autour du sujet
- Reflets, bruits de fond, paysages, objets : **autant d'indices** qui peuvent trahir un lieu ou une personne

</v-clicks>

<div class="text-xs opacity-60 mt-2">
koreaboo.com/stories/matsuoka-ena-sasaeng-obsessed-fan-idol-stalker-photo-eyes-reflection/
</div>

---
layout: center
---

# Quelles solutions techniques ?

---

# Les outils à notre disposition

<v-clicks>

- **Exiftool** — supprime les métadonnées des images et PDF
  - Rapide, mais **laisse des traces** et **ne protège pas contre les malwares**
- **MAT2** — plus complet, gère de nombreux formats
  - Bon pour beaucoup de cas, mais **ne protège pas non plus contre les malwares**
- **Dangerzone** — approche radicale : le document est **reconstruit à partir de zéro**
  - Lent, mais **neutralise les malwares** et supprime la plupart des métadonnées

</v-clicks>

<v-click>

<div class="mt-8 text-sm opacity-80 text-center">
Aucun outil n'est parfait. Le choix dépend de votre modèle de menace.
</div>

</v-click>

---

# Tableau comparatif

<div class="text-base">

|  | Métadonnées | Malwares | Canary tokens | Environnement |
|---|:---:|:---:|:---:|:---:|
| **Exiftool** | ⚠️ | ❌ | ❌ | ❌ |
| **MAT2** | ✅ | ❌ | ❌ | ❌ |
| **Dangerzone** | ✅ | ✅ | ✅ | ❌ |

</div>

---
layout: two-cols-header
---

# Dangerzone

::left::

<img src="https://raw.githubusercontent.com/freedomofpress/dangerzone/main/install/common/dangerzone.png" width="180"/>

::right::

<v-clicks>

- Supporte de nombreux formats (PDF, Word, Excel, images…)
- Disponible sur **Windows**, **macOS** et **Linux**
- Pensé pour les utilisateurs **non techniques**
- Conçu d'abord pour neutraliser les **documents piégés**
- Effet secondaire bienvenu : **supprime aussi les métadonnées**
- Maintenu par la Freedom of the Press Foundation

</v-clicks>

<div class="text-xs opacity-60 mt-4">
https://dangerzone.rocks/
</div>

---

# Comment fonctionne Dangerzone ?

<div class="grid grid-cols-3 gap-6 items-center mt-8">

  <div class="text-center">
    <div class="text-7xl">💻</div>
    <div class="font-bold mt-3">Votre ordinateur</div>
  </div>

  <div class="text-center">
    <v-click>
      <div class="text-5xl">📄☠️ →</div>
      <div class="mt-3 text-sm">
        <span class="bg-orange-500 text-white px-2 py-1 font-bold rounded">1</span>
        Le document est envoyé à Dangerzone
      </div>
    </v-click>
  </div>

  <div class="text-center">
    <v-click>
      <div class="text-7xl">📦</div>
      <div class="font-bold mt-3">Conteneur isolé</div>
      <div class="mt-1 text-sm">
        <span class="bg-orange-500 text-white px-2 py-1 font-bold rounded">2</span>
        Ouvert dans un bac à sable
      </div>
    </v-click>
  </div>

</div>

<div class="grid grid-cols-3 gap-6 items-center mt-10">

  <div class="text-center">
    <v-click at="4">
      <div class="text-7xl">📄 ✅</div>
      <div class="font-bold mt-3">PDF sain</div>
      <div class="mt-1 text-sm">
        <span class="bg-orange-500 text-white px-2 py-1 font-bold rounded">4</span>
        Reconstruit à partir des pixels
      </div>
    </v-click>
  </div>

  <div class="text-center">
    <v-click at="4">
      <div class="text-5xl">←</div>
      <div class="italic text-xs mt-2 opacity-70">Le « trou analogique »</div>
    </v-click>
  </div>

  <div class="text-center">
    <v-click at="3">
      <div class="text-7xl">🖨️</div>
      <div class="font-bold mt-3">Conversion en pixels</div>
      <div class="mt-1 text-sm">
        <span class="bg-orange-500 text-white px-2 py-1 font-bold rounded">3</span>
        Chaque page devient une image
      </div>
    </v-click>
  </div>

</div>

---
layout: center
---

# Démo

**Voyons Dangerzone en action**

<div class="text-6xl mt-8">🖥️</div>

---
layout: center
---

# Merci !

**Questions ?**

<div class="mt-8 text-sm">

🌐 [dangerzone.rocks](https://dangerzone.rocks/)
🐙 [github.com/freedomofpress/dangerzone](https://github.com/freedomofpress/dangerzone)
🐘 [social.freedom.press/@dangerzone](https://social.freedom.press/@dangerzone)

</div>
