Cornice
=======

Une boite à outils pour services web

Alexis Métaireau - alexis@notmyidea.org

----

Se faciliter la vie !
=====================

- Créer des services web **rapidement**
- Ne pas faire les erreurs courantes
- Respecter les **standards HTTP**
- Factoriser plein d'utilitaires qu'on avait par dessus Pyramid.

----

Un service web ?
================

- Pas besoin de navigateur
- Plusieurs "user agent" possibles

----

Don't
=====

- Services web ≠ Applications web
- Ne fait pas le café

----

Et les autres ?
===============

- django-piston, django-tastypie, django-rest-framework (tous liés à django)
- Quelques toolkits en pyramid
- Pyramid lui même

----

Erreurs courantes
=================

.fx: bigtitle

----

Faille de sécurité JSON
=======================

::

    # Faille de sécu potentielle sur certain navigateurs
    def your_view():
        return [{foo: 'bar', foobar: 'baz'}, {}]

Cornice est sympa et vous tiens au courant:

    "returning a json array is a potential security hole, please ensure you really want to do this."

----

WRONG !
=======

::

    > GET /resource
    < 200 OK

    > PUT /resource
    < 404 Not Found

----

GOOD
====

::

    > PUT /resource
    < 405 Method Not Allowed

----

En python
=========

- Utilisation des `@decorateurs` python pour avoir un code plus lisible
- Lier le code et la documentation (docstrings !)

.. code-block:: python

    from cornice import Service

    pubs = Service(name='pubs', path='/pubs',
                   description='Liste des pubs à Paris')

    PUBS = {}

    @pubs.get()
    def pubs_list(request):
        """List all the pubs"""
        return PUBS

----

Sous le capot
=============

Qu'est-ce que fait Cornice pour vous ?

- Génère les erreurs HTTP qui vont bien (404, 405, 406)
- Génère la documentation du service pour vous
- Validateurs et Filtres par défaut

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

    class PubSchema(MappingSchema):
        name = SchemaNode(String(), type='str')
        location = SchemaNode(String(), type='str')
        status = SchemaNode(String(),
                            validator=OneOf(['open', 'close']))

----

On branche ça avec cornice
==========================

.. code-block:: python

    from collections import namedtuple
    Pub = namedtuple('Pub', ['name', 'location', 'status', 'slug'])

    @pubs.post(schema=PubSchema)
    def add_pub(request):
        # si on est là, c'est que le schema est validé
        args = {}
        for item in ('name', 'location', 'status'):
            args[item] = request.validated[item]
        args['slug'] = slugify(args['name'])

        pub = Pub(**args)
        PUBS[pub.slug] = pub

----

Un protocole d'échange de données
=================================

- Gestion des erreurs
- Utilise un schema particulier
- machine parsable !

Par exemple:

.. code-block:: bash

    curl -X POST http://localhost:8080/pubs
        -d "{name: 'Le folies',
             location: 'Belleville',
             status: 'not-valid'}"
        -H "Content-Type: application/json"

::

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

Accept
======

.. code-block:: python

    pub = service('pub', path='/pub/{slug}')

    @pub.get(accept=("application/json", "text/json"))
    @pub.get(accept=("text/plain"), renderer="string")
    def get_pub(request):
        return PUBS.get(request.matchdict('slug'))

----

::

    > GET -H 'Accept: application/json' urlkivabien
    < Content-Type: "application/json"
    < Réponse en JSON

    > GET -H 'Accept: audio/*' urlkivabien
    < 406 Not Acceptable
    < Acceptable = ['application/json', 'text/json', 'text/plain']

----

Génération automatique de la documentation
==========================================

Dans sphinx:

.. code-block:: rst

    My super service
    ================

    Voila le service qui permet de lister
    les bières à paris, d'en ajouter etc.

    .. services::
       :modules: myapp.pubs

----

Définir des ressources
======================


.. code-block:: python

    from cornice.resource import resource, view

    @resource(collection_path='/pubs', path='/pubs/{slug}')
    class Pubs(object):

        def __init__(self, request):
            self.request = request

                                                 # GET /pubs
        def collection_get(self):
            return {'pubs': PUBS.values()}

                                          # GET /pubs/{slug}
        @view(renderer='json')
        def get(self):                   
            return PUBS.get(self.request.matchdict['slug'])

                                                # POST /pubs
        @view(renderer='json', accept='text/json')
        def collection_post(self):             
            # ce qu'on avait toute à l'heure

----

Quelques autres options
=======================

.. code-block:: python

    @service.method(**options)

- filters (callable)
- acl (callable)
- ACL factory (callable)
- error_handler (callable)
- exclude (list of validators / filters)

----

Un outil de description
=======================

.. code-block:: python

    >>> from cornice.service import get_services
    >>> get_services()
    [<Service foobar at /foobar>]
    >>> service = get_services()[0]
    >>> service.get_acceptable('get')
    ['text/plain', 'text/json']
    >>> service.get_validators('get')
    [<function my_validator at 0xa7ccb1c>]

----

Relations avec Pyramid
======================

- Cornice < 0.9 construit autour de Pyramid.
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

Le futur ?
==========

- Format de description de WS → Client générique
- Meilleure intégration avec d'autres frameworks
- Améliorer la génération de documentation
- Vos patchs ?

----

Ressources
==========

- la documentation de colander: http://docs.pylonsproject.org/projects/colander/en/latest/
- la documenation de cornice: http://cornice.rtfd.org
- le code de cornice: http://github.com/mozilla-services/cornice
- la specification HTTP ! http://pretty-rfc.herokuapp.com/RFC2616

----

Merci !
=======

.fx: bigtitle
