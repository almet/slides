Cornice
=======

A toolkit for web services

Alexis Métaireau
alexis@mozilla.com

----

Make your life easier
=====================

- Create web services **quickly**
- Avoid usual mistakes
- Respect the **HTTP standards**
- Factorize a bunch of little tools we had on top of Pyramid

----

What's a web service?
=====================

- Doesn't need a browser
- Different "user-agents" can be used

----

Don't
=====

- Web services ≠ Web application
- Doesn't brew your coffee

----

What about the other ones?
==========================

- django-piston, django-tastypie, django-rest-framework (all of them tied to
  django)
- Some toolkits based on top of Pyramid
- Pyramid itself, other frameworks (flask, etc.)

----

Usual mistakes
==============

.fx: bigtitle

----

Security problems with JSON
===========================

::

    # potential security hole for some browsers
    def your_view():
        return [{foo: 'bar', foobar: 'baz'}, {}]

Cornice is nice and tells you so:

    "returning a json array is a potential security hole, please ensure you really want to do this."

See http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx

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

In python
=========

- Uses python `@decorators` to have a clean and readable code
- Ties together code and documentation (docstrings!)

.. code-block:: python

    from cornice import Service

    pubs = Service(name='pubs', path='/pubs',
                   description='List of pubs in dublin')

    PUBS = {}

    @pubs.get()
    def pubs_list(request):
        """List all the pubs"""
        return PUBS

----

Under the hood
==============

What cornice does for you here?

- Generates HTTP errors when it makes sense (404, 405, 406)
- Generates the documentation for you
- Adds validators and filters

----

Validation with Cornice
=======================

.fx: bigtitle

----

Using Colander
==============

- A tool to do scheme validation
- Here is an example, for the pubs:

.. code-block:: python

    from colander import MappingSchema, SchemaNode, String, OneOf

    class PubSchema(MappingSchema):
        name = SchemaNode(String(), type='str')
        place = SchemaNode(String(), type='str')
        status = SchemaNode(String(),
                            validator=OneOf(['open', 'close']))

----

Plugging this with Cornice
==========================

.. code-block:: python

    from collections import namedtuple
    Pub = namedtuple('Pub', ['name', 'place', 'status', 'slug'])

    @pubs.post(schema=PubSchema)
    def add_pub(request):
        # If we're here, the schema is valid
        args = {}
        for item in ('name', 'place', 'status'):
            args[item] = request.validated[item]
        args['slug'] = slugify(args['name'])

        pub = Pub(**args)
        PUBS[pub.slug] = pub

----

A data-exchange protocol
========================

- Error handling
- Uses a specific format
- Machine parsable

.. code-block:: bash

    curl -X POST http://localhost:8080/pubs
        -d "{name: 'Anseo',
             place: 'SODA',
             status: 'not-valid'}"
        -H "Content-Type: application/json"

::

    {'status': 'error',
     'errors': [{location: 'body', name: 'status',
                 description: 'status should be one of open, close',
                 values: ['open', 'close']}],
    }

----

Custom validators
=================

- We don't have to validate colander schemas.

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

    > GET -H 'Accept: application/json' url
    < Content-Type: "application/json"
    < JSON response

    > GET -H 'Accept: audio/*' url
    < 406 Not Acceptable
    < Acceptable = ['application/json', 'text/json', 'text/plain']

----

Automatic generation of the documentation
=========================================

In Sphinx:

.. code-block:: rst

    My super service
    ================

    Here is a service which can list all
    the pubs in Dublin.

    .. services::
       :modules: myapp.pubs

----

Define resources
================


.. code-block:: python

    from cornice.resource import resource, view

    @resource(collection_path='/pubs', path='/pubs/{slug}')
    class Pubs(object):

        def __init__(self, request):
            self.request = request

        def collection_get(self):                 # GET /pubs
            return {'pubs': PUBS.values()}

        @view(renderer='json')             # GET /pubs/{slug}
        def get(self):                   
            return PUBS.get(self.request.matchdict['slug'])

        @view(renderer='json', accept='text/json')
        def collection_post(self):               # POST /pubs
            # what we had previously

----

Some other options
==================

.. code-block:: python

    @service.method(**options)

- filters (callable)
- acl (callable)
- ACL factory (callable)
- error_handler (callable)
- exclude (list of validators / filters)

----

A description tool
==================

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

Relation with Pyramid
======================

- Cornice < 0.9 was built around Pyramid, exclusively.
- Since that, has the possibility to use it within other frameworks too.

----

Feedback
========

- We used it a lot at Mozilla Services
    - The Token Server
    - Sync 2.0
    - App in The Clouds
- Good feedback, allows us to speed the creation of web services and avoid
  usual mistakes.

----

What's in the future?
=====================

- Description format for the Web Services →  Generic Client.
- Better integration with other frameworks
- Enhance automatic documentation generation.
- Your patches?

----

Ressources
==========

- Colander's documentation: http://docs.pylonsproject.org/projects/colander/en/latest/
- Cornice's docs: http://cornice.rtfd.org
- Cornice's code: http://github.com/mozilla-services/cornice
- the HTTP spec, obviously! http://pretty-rfc.herokuapp.com/RFC2616

----

Merci !
=======

.fx: bigtitle
