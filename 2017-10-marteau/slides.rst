Marteau
#######

.. image:: marteau.svg
    :height: 800px

----


Let's break things ™
####################

----

http://client11.scl2.svc.mozilla.com:8080/

----

.. code-block:: python

    from funkload.FunkLoadTestCase import FunkLoadTestCase

    class YourTest(FunkLoadTestCase):

        def test_some_url(self):
            self.get('http://marketplace.allizom.org')

See https://github.com/mozilla/marketplace-loadtest/blob/master/loadtest.py
