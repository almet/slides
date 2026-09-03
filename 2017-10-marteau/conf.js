function r(f){/loaded|complete/.test(document.readyState)?f():setTimeout("r("+f+")",9);}
function go() {
    var body = document.getElementsByTagName('body')[0];
    var e = document.createElement('p');
    e.setAttribute('class', 'cop');
    e.innerHTML =
    'Circus, gestion de process & sockets. <a href="http://www.notmyidea.org/">Alexis Métaireau</a>, <a href="http://mozilla.org">Mozilla</a>'
    body.appendChild(e);
}
r(go);
