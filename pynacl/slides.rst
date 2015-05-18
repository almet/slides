Faire de la crypto en préservant son cerveau !
##############################################

----

Alexis
======

- Dévelopeur python et node.js chez mozilla;
- J'écris des outils et des services web (HTTP);

-----

Et donc ?
=========

- Brian warner, mon sauveur;
- Importance de la crypto au jour le jour;
- Surveillance de masse;

----

Python + libsodium =  ♥
########################

----

- Une boite à outil cryptographique;
- http://pynacl.readthedocs.org

----

Qu'est-ce que ça fait ?
=======================

- Chiffrement à clé publique;
- Chiffrement à clés privées;
- Signatures.

----

Chiffrement à clé publique
##########################

- Alice veut recevoir des messages de la part de Bob;
- Elle veut être certaine que personne n'a alteré le message;
- Elle veut être certaine de l'identité de Bob;
- Elle veut être sur d'être la seule à pouvoir ouvrir le message.

----

.. figure:: images/box+lock.png

----

.. figure:: images/box+2locks.png

----

.. code-block:: python

  import nacl.utils
  from nacl.public import PrivateKey, Box

  # Gènère la clé privée qui doit rester secrete.
  skbob = PrivateKey.generate()

  # La clé publique peut etre donné à n'importe qui
  # qui souhaite envoyer un message chiffré à Bob.
  pkbob = skbob.public_key

  # Alice fait la meme chose et donne sa clé publique
  # à Bob.
  skalice = PrivateKey.generate()
  pkalice = skalice.public_key

----

.. code-block:: python

  # Bob veut envoyer un message chiffré à alice.
  # Il crée donc une "boite" avec sa clé privée et la
  # clé publique d'Alice.
  bob_box = Box(skbob, pkalice)

  nonce = nacl.utils.random(Box.NONCE_SIZE)

  encrypted = bob_box.encrypt(message, nonce)

  # Pour que Alice puisse déchiffrer le message,
  # elle crée une "boite" avec sa clé privée et la clé
  # publique de bob.
  alice_box = Box(skalice, pkbob)

  plaintext = alice_box.decrypt(encrypted)

----

Chiffrement à clé secrete
#########################

----

.. figure:: images/box+key.png

----

.. code-block:: python

  import nacl.secret
  import nacl.utils

  # Générez une clé, qui doit rester secrete.
  # Il s'agit de la clé de votre coffre.
  key = nacl.utils.random(nacl.secret.SecretBox.KEY_SIZE)

  box = nacl.secret.SecretBox(key)

  # De la même manière que toute à l'heure, un "nonce"
  # doit être généré.
  nonce = nacl.utils.random(nacl.secret.SecretBox.NONCE_SIZE)
  encrypted = box.encrypt(b"Nicolas Ledez est un robot", nonce)

  # Pour dechiffrer le message, il suffit de lui passer
  # le contenu chiffré.
  plaintext = box.decrypt(encrypted)

----

La gestion des clés
###################

----

À retenir
#########

- La crypto peut être simple (pour des cas simples);
- Le problème se situe en fait au niveau de la gestion des clés;
- "Ne pas réinventer la roue"

----

"Don't reinvent the wheel"
##########################

----

Merci !
#######

