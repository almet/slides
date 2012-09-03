.. class:: center

    **Cornice:**
    **Une boite à outils pour services web**

    Alexis Métaireau - alexis@notmyidea.org

----

Se faciliter la vie !
=====================

- Créer des services web **rapidement**
- Ne pas faire les erreurs courantes
- Respecter les **standards HTTP**

----

Don't
=====

- Services web ≠ Applications web
- Ne fait pas le café

----

Erreurs courantes
=================

- Problèmes de sécurité
- mauvaise comprehension de la specification HTTP
- pas de documentation pour le service (ou pas à jour)

----

En python
=========

- Utilisation des `@decorateurs` python pour avoir un code plus lisible
- Lier le code et la documentaion (docstrings !)

.. code-block:: python
    
    from cornice import Service

    pubs = Service(name='pubs', path='/pubs',
                   description='Liste des pubs à Paris')

    PUBS = []

    @pubs.get()
    def pubs_list(request):
        return PUBS

----

Validation avec Cornice
=======================

.fx: bigtitle

----

Utilisation de colander
=======================

- Un outil pour faire de la validation de schema
- Voila un exemple pour les pubs:

.. code-block:: python
    
    from colander import MappingSchema, SchemaNode, String, OneOf

    from collections import namedtuple
    Pub = namedtuple('Pub', ['name', 'location', 'status'])

    class PubSchema(MappingSchema):
        name = SchemaNode(String(), type='str')
        location = SchemaNode(String(), type='str')
        status = SchemaNode(String(),
                            validator=OneOf(['open', 'close']))

----

On branche ça avec cornice
==========================

.. code-block:: python

    @pub.post(schema=PubSchema)
    def add_pub(request):
        # si on est là, c'est que le schema est validé
        args = {}
        for item in ('name', 'location', 'status'):
            args[item] = request.validated[item]

        PUBS.append(Pub(**args))

----

Un protocole d'échange de données
=================================

- Gestion des erreurs
- Utilise un schema particulier

Par exemple:

.. code-block:: bash

    curl -X POST http://localhost:8080/pubs 
        -d "{name: 'Le folies',
             location:'belleville',
             status: 'not-valid'}"
        -H "Content-Type: application/json"

.. code-block:: javascript

    {'status': 'error', 
     'errors': [{location: 'body', name: 'status',
                 description: 'status should be one of open, close',
                 values: ['open', 'close']}],
    }

----

Validateurs custom
==================

- On est pas obligé de valider des schemas colander !

.. code-block:: python

    def super_validator(request):
        if 'X-YOUR-HEADER' not in request.headers:
            request.errors.add(location='header',
                               name='X-YOUR-HEADER')
    
    @service.post(validators=[super_validator])
    def foobar(request):
        # do something with it.

----

Respect de la specification HTTP
================================

- Ressource existante mais mauvais verbe → 405 Method Not Allowed.
- Mauvais content type demandé → 406, Not Acceptable.

----

Génération automatique de la documentation
==========================================

Dans sphinx:

.. code-block:: rst

    .. services::
       :modules: cornice.tests.validationapp

----


Relations avec pyramid
======================

- Cornice < 0.9 consruit autour de Pyramid.
- Possibilité d'utiliser un autre framework depuis.

----

Retours
=======

- Beaucoup utilisé à Mozilla Services
- Projet de serveur de tokens
- Sync 2.0
- App In The Clouds

- Retours positifs, permet de "speeder" la création de services web en évitant
  les erreurs courantes.

----

Ressources
==========

- la documentation de colander: http://docs.pylonsproject.org/projects/colander/en/latest/
- la documenation de cornice: http://cornice.rtfd.org
- le code de cornice: http://github.com/mozilla-services/cornice
- la specification HTTP ! http://pretty-rfc.herokuapp.com/RFC2616
