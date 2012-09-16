Daybed !
########

* Un service de validation de modèles
* En REST !

.. image:: logo_afpy.png

----

Pousser un modèle
=================

::

    curl -X PUT http://localhost:8000/definition/confs -d

.. code-block:: javascript

    {
        "fields": [{
            "type": "enum",
            "name": "type",
            "choices": ["lightning", "presentation", "atelier"],
            "description": "Type de présentation"
        },
        {
            "type": "string",
            "name": "title",
        },
        {
            "type": "list",
            "name": "authors",

        }],
        "description": "Conférences",
    }

    {"token": "9caa3fd65d77fb46"}

----

Ou pas…
=======

.. code-block:: javascript

    {"status": "error", "errors": [
        {"location": "body",
         "name": "fields.2.type",
         "description": "Required"}]}

----

Utiliser la validation de modèles
=================================


::

    curl -X POST http://localhost:8000/ohyeah -d

.. code-block:: javascript

    {
        "type": "lightning",
        "name": "daybed",
        "authors": ["Alexis", "Remy"],
    }

    {"id": "67cf1da3b2ea4533cb1e0cdcd50018ea"}

----

Quelles utilisations ?
======================

* Remplacer google forms ?
* Pour une mapping party (OSM)
* Un backend SIG simple à utiliser

----

Un sprint ?
===========

* Les 5, 6 et 7 Octobre dans la belle campagne angevine


.. image:: logo_afpy.png
  
----

Plus d'infos ?
==============

* http://blog.notmyidea.org/carto-forms-fr.html
* http://github.com/spiral-project/daybed

----

Contactez moi :
===============

alexis@notmyidea.org
