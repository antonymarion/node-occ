# Node-API, compression de pointeurs et un modeleur 3D dans Node.js

Un addon natif écrit avec NAN ne démarre pas dans un Node.js compilé avec la compression de pointeurs V8. Le même code, exposé via Node-API, se charge. Sur 4 000 solides OpenCascade et leurs 32 000 sommets, le tas V8 passe de 246 Mo à 138 Mo.

## Deux Node.js, un seul binaire

[node-occ](https://github.com/antonymarion/node-occ) enveloppe OpenCascade (OCCT) pour construire des solides, faire des booléens et lire du STEP ou du BREP depuis JavaScript. Le dépôt d’Etienne Rossignon (OpenWebCAD/node-occ, commit `e135bd1`) parlait encore à V8 à travers NAN.

NAN inclut les en-têtes V8. La disposition des pointeurs y est figée à la compilation. [node-caged](https://github.com/platformatic/node-caged), le Node.js de Platformatic compilé avec `--experimental-enable-pointer-compression`, range ces pointeurs sur 32 bits. Un addon NAN charge mal, ou pas du tout. Node-API ne voit pas cette disposition : l’ABI est stable, le même `.node` tourne des deux côtés.

La migration part du fork antonymarion, reprend l’arbre OpenWebCAD (OCCT 7.5 à l’origine, toujours en NAN), puis remplace NAN par un shim `src/nan.h` écrit au-dessus de `node-addon-api`. Les classes C++ (`Nan::ObjectWrap`, `NAN_METHOD`, les templates) restent en place. Le shim n’inclut ni `v8.h` ni `nan`. Le correctif du cône non tronqué (`R2 = 0`) du fork est conservé. Le code est aussi adapté à OpenCascade 7.8, livré par Debian : triangulation (`Poly_Triangulation::Node`), et `TopoDS_Shape::HashCode`, retiré au profit de `std::hash`.

## Comment la mesure est faite

L’image Docker `Dockerfile` part de `platformatic/node-caged:26`, installe OpenCascade, puis le Node.js officiel 22.21.0. L’addon est compilé une fois, contre les en-têtes de ce Node 22, avec `NAPI_VERSION=8`.

Le même processus `bench/memory.js` crée 4 000 boîtes (`makeBox`), puis récupère leurs sommets (32 000 objets), avec `--expose-gc` avant chaque relevé. On lit `process.memoryUsage().heapUsed` et `rss`.

| | Node 22.21.0 | node-caged 26.10.0 |
| --- | ---: | ---: |
| Compression de pointeurs | non | oui |
| Plafond du tas V8 | 4,05 Go | 4,00 Go |
| Tas après 4 000 solides | 131,27 Mo | 74,27 Mo |
| RSS après 4 000 solides | 261,09 Mo | 204,61 Mo |
| Tas après les 32 000 sommets | 245,78 Mo | 138,49 Mo |
| RSS après les 32 000 sommets | 394,53 Mo | 317,36 Mo |

Le tas des solides baisse de 43 %. Celui des solides plus les sommets baisse de 44 % (246 Mo → 138 Mo). On n’atteint pas 50 % : un objet JavaScript n’est pas fait que de pointeurs, et les nombres (doubles) ne rétrécissent pas.

Le RSS baisse moins, et c’est le point utile. Entre les deux runs, la baisse de RSS des 4 000 boîtes est de 56 Mo, soit presque exactement la baisse du tas V8 (57 Mo). La mémoire native des B-Rep OpenCascade, elle, ne change pas. La compression de pointeurs allège les objets JavaScript qui enveloppent la géométrie. Elle ne compresse pas les allocations C++ d’OCCT.

node-caged plafonne aussi chaque isolate à 4 Go. Ici les deux processus sont sous ce plafond (le Node officiel de la mesure annonce 4,05 Go sur cette machine). Le gain observé est bien celui de la largeur des pointeurs, pas un effet de limite.

Les 265 tests Mocha du dépôt passent sur le Node officiel, avec cet addon.

## Reproduire

```bash
docker build -t node-occ-napi .
docker run --rm node-occ-napi /opt/node-stock/bin/node --expose-gc bench/memory.js
docker run --rm node-occ-napi sh -c '"$(cat /opt/caged-node-path)" --expose-gc bench/memory.js'
```

Le champ `pointerCompression` du JSON vaut `0` ou `1`. `binding` vaut `node-api`.

## Ce qu’il faut en retenir

Pour un addon qui doit vivre sur plusieurs versions de Node, et sur un Node à pointeurs compressés, Node-API est le contrat. NAN reste lié à une disposition V8. Sur un modeleur, le gros de la RSS est natif : la compression se voit dans le tas, sur les milliers de wrappers, de sommets et de tableaux, pas dans les solides OCCT eux-mêmes.

---

### Note LinkedIn

Migrer un addon Node de NAN vers Node-API ne sert pas qu’à suivre les versions de Node. C’est ce qui permet de le charger dans un Node compilé avec la compression de pointeurs V8 (node-caged).

Sur node-occ (OpenCascade), le même binaire Node-API fait tourner 4 000 solides et 32 000 sommets :

- tas V8 : 246 Mo → 138 Mo (−44 %)
- la mémoire native des B-Rep, elle, ne bouge pas

265 tests Mocha passent. L’article détaillé est sur Medium.
