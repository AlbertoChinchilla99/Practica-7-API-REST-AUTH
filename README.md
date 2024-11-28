<!DOCTYPE html><html><head><meta charset="utf-8"><title>Práctica 6 - API REST.md</title><style></style></head><body id="preview">
<h1 class="code-line" data-line-start="0" data-line-end="1"><a id="Prctica_6__API_REST_0"></a>Práctica 6 - API REST</h1>
<p class="has-line-data" data-line-start="2" data-line-end="4">En este proyecto he hecho dos colecciones: “Movies” y “Cinemas”, ambas tienes el CRUD completo y los endpoints creados en insomnia. Los endpoints son<br>
los siguientes:</p>
<ul>
<li class="has-line-data" data-line-start="5" data-line-end="6">Get: recibe elementos de la colección</li>
<li class="has-line-data" data-line-start="6" data-line-end="7">Post: sube nuevos elementos a la colección</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">Put: actualiza elementos en la colección</li>
<li class="has-line-data" data-line-start="8" data-line-end="10">Delete: elimina elementos en la colección</li>
</ul>
<h2 class="code-line" data-line-start="10" data-line-end="11"><a id="Movies_10"></a>Movies</h2>
<p class="has-line-data" data-line-start="12" data-line-end="13">Cada movie consta de las siguientes características:</p>
<ul>
<li class="has-line-data" data-line-start="14" data-line-end="15">Title: el título de la película</li>
<li class="has-line-data" data-line-start="15" data-line-end="16">Duration: la duración de la película</li>
<li class="has-line-data" data-line-start="16" data-line-end="17">Categories: categoria de la película (actualmente solo puede tener 1)</li>
<li class="has-line-data" data-line-start="17" data-line-end="18">Img: una imagen de la película mediante url</li>
</ul>
<h2 class="code-line" data-line-start="20" data-line-end="21"><a id="Cinemas_20"></a>Cinemas</h2>
<p class="has-line-data" data-line-start="22" data-line-end="23">Cada Cinema cosnta de las siguientes características:</p>
<ul>
<li class="has-line-data" data-line-start="24" data-line-end="25">Address: la dirección del cine</li>
<li class="has-line-data" data-line-start="25" data-line-end="26">Name: el nombre del cine</li>
<li class="has-line-data" data-line-start="26" data-line-end="28">Movies: las películas que estarían en el cine (vienen de la colección de “Movies”)</li>
</ul>
<h2 class="code-line" data-line-start="28" data-line-end="29"><a id="Conexin_entre_galerias_28"></a>Conexión entre galerias</h2>
<p class="has-line-data" data-line-start="30" data-line-end="31">Ambas galerias estan conectadas, cuando se actualiza alguna información en alguna Movie tambien se ve reflejado en el cinema.</p>
</body></html>
