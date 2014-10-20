Cornice 
=======

.fx: bigtitle

----

Pour se faciliter la vie
========================

- Créer des services web **rapidement**
- Ne pas faire les erreurs courantes
- Respecter les **standards HTTP**
- Factoriser plein d'utilitaires qu'on avait par dessus Pyramid.

----

Un service web ?
================

- Pas besoin de navigateur
- Plusieurs "user agent" possibles
- HTTP !

----

Don't
=====

- Services web ≠ Applications web
- Ne fait pas le café

----

Et les autres ?
===============

- django-piston, django-tastypie, django-rest-framework (tous liés à django)
- Quelques toolkits existent en pyramid
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
    def your_view(request):
        return [{foo: 'bar', foobar: 'baz'}, {}]

Cornice est sympa et vous tiens au courant:

    "Euh, mais c'est pas très sécure ça, retourner un array JSON est une faille potentiel, mec !"

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
                   description='Liste des bars à Paris')

    PUBS = {}

    @pubs.get()
    def pubs_list(request):
        """Retourne la liste des bars parisiens."""
        return PUBS

----

Sous le capot
=============

Qu'est-ce que fait Cornice pour vous ?

- Génère les erreurs HTTP qui vont bien (404, 405, 406 etc.)
- Génère la documentation du service pour vous
- Ajoute des "validateurs" et "filtres" par défaut

----

Validation avec Cornice
=======================

.fx: bigtitle

----

Utilisation de colander
=======================

- Un outil pour faire de la validation de schema
- Voila un exemple pour les bars:

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

    @pubs.post(schema=PubSchema)
    def add_pub(request):
        # si on est là, c'est que le schema est validé
        args = {}
        for item in ('name', 'location', 'status'):
            args[item] = request.validated[item]
        args['slug'] = slugify(args['name'])

        PUBS[pub.slug] = Pub(**args)

----

Un protocole d'échange de données
=================================

- Gestion des erreurs
- Utilise un schema particulier
- Compréhensible par des machines !

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

Gestion du Cross Origin
=======================

.. code-block:: python
    
    >>> cors_policy = {'origins': ('notmyidea.org',),
    ...                'max_age': 42,
    ...                'credentials': True}
    >>> service = Service(name='', path='/service',
                          cors_policy=cors_policy)

----

Ou même
=======

.. code-block:: python

    from cornice.service import Service
    Service.cors_origins = ('*', )

----

Support de SPORE
================

- OH: "WSDL pour les services REST"

.. code-block:: python

    from cornice.service import get_services
    generate_spore_description(get_services(), 'Service name', request.application_url, '1.0')

- 

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

Retours
=======

- Beaucoup utilisé à Mozilla Services
- location.services.mozilla.com
- Projet de serveur de tokens
- Sync 2.0
- Daybed
- Retours positifs, permet de "speeder" la création de services web en évitant
  les erreurs courantes.

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
