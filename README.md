# Szerveroldali webprogramozás 2021 ősz

- [Szerveroldali webprogramozás 2021 ősz](#szerveroldali-webprogramozás-2021-ősz)
  - [Ismertető](#ismertető)
  - [Laravel](#laravel)
    - [Átmenet a Webprogramozásból](#átmenet-a-webprogramozásból)
    - [Szükséges programok](#szükséges-programok)
      - [Automatikus telepítő](#automatikus-telepítő)
    - [A Laravel](#a-laravel)
    - [Új Laravel projekt létrehozása](#új-laravel-projekt-létrehozása)
    - [A projekt első indítása](#a-projekt-első-indítása)
    - [Egy Laravel projekt felépítése](#egy-laravel-projekt-felépítése)
    - [Laravel Dokumentáció](#laravel-dokumentáció)
  - [Node.js, Express.js](#nodejs-expressjs)
    - [Szükséges programok](#szükséges-programok-1)
    - [Node.js](#nodejs)
    - [npm](#npm)
      - [Új projekt létrehozása](#új-projekt-létrehozása)
      - [npm csomagok telepítése](#npm-csomagok-telepítése)
      - [Egy alap Node.js program](#egy-alap-nodejs-program)
      - [Próbáljuk ki](#próbáljuk-ki)
      - [Hogy működik?](#hogy-működik)
      - [Mi ezzel a "probléma"?](#mi-ezzel-a-probléma)
    - [Express](#express)
      - [Express telepítése a projekthez](#express-telepítése-a-projekthez)
      - [Nodemon telepítése a projekthez](#nodemon-telepítése-a-projekthez)
      - [Az első Express alkalmazás](#az-első-express-alkalmazás)
      - [Próbáljuk ki](#próbáljuk-ki-1)
      - [Tulajdonképpen mi is történik itt?](#tulajdonképpen-mi-is-történik-itt)
      - [Miért jó ez nekünk?](#miért-jó-ez-nekünk)

## Ismertető

Ebben a GitHub repository-ban találhatók a 2021 őszi félévben tartott Szerveroldali webprogramozás tárgyhoz tartozó gyakorlati anyagok és az egyéb segédanyagok is.

A repository szerkezete:

- csut_16_00:
  - Csütörtök 16:00-kor kezdődő nappalis csoporthoz tartozó anyagok
- csut_19_30:
  - Csütörtök 19:30-kor kezdődő összevont estis csoportokhoz tartozó anyagok
- Ami a fenti két mappán kívül van, azok pedig közös fájlok

A tárgy követelményei és az oktatók elérhetőségei a Canvas-ben találhatók.

## Laravel

Hasznos információk a Laravellel kapcsolatban.

### Átmenet a Webprogramozásból

- Tegyük világossá, honnan hová tartunk. A webes vonal eddigi felépítése:

  - Web1 - nézet, HTML, CSS, érintőleges JS. Ezek még csak statikus oldalak
  - Web2 (Webprogramozás) - JS bővebben, majd natív PHP. Ezek már dinamikus oldalak.
  - Szerveroldali webprogramozás - csomagkezelők, keretrendszerek bevezetése, népszerű keretrendszerek alapjai.

- Csomagkezelők
  - Nem szükséges mindent natívan megírni, hanem egy-egy részfeladat megoldására használhatunk csomagot, ami már tartalmazza azt a logikát, amire szükségünk van
    - Előnyei:
      - nem kell olyan dolgot lefejleszteni, ami már tulajdonképpen kész van és ingyenesen hozzáférhető
      - valószínűleg (főleg ha népszerűbb csomagról van szó), jobban ki van dolgozva, előjöttek már időközben problémák, amik meg lettek oldva <-> ezzel szemben mi lehet nem foglalkoznánk ezzel ennyit, főleg egy nagyobb projekt részeként, ami hibalehetőség lenne
      - kisebb a kódbázis, hiszen nálunk csak egy projektleíró fájl van, ami megmondja, melyik csomagból melyik verzió szükséges, ez alapján pedig a csomagkezelő egy távoli szerverről letölti a megfelelő fájlokat
  - A félév során két csomagkezelőt fogunk használni, az egyik a Composer, a másik az npm
    - Hasonló elven működnek
    - A Laravelben mindkettő megtalálható
  - Meg szokták kérdezni, hogy miért kellett akkor a natív PHP, miért nem lehetett rögtön csomagkezelőt használni? Szükséges bejárni az utat, hogy az ember értse az alapokat, ami a csomagok mögött is húzódik. Meg így jobban is értékeli a csomagokat :)

### Szükséges programok

- A Laravel futtatásához szükséges a legfrisebb PHP, ill. Composer telepítése. Ezt Windows rendszeren elvégzi helyetted az automatikus telepítő.

#### Automatikus telepítő

- [https://github.com/totadavid95/PhpComposerInstaller](https://github.com/totadavid95/PhpComposerInstaller)
- Csak le kell tölteni a jobb oldalon lévő [Releases-ből](https://github.com/totadavid95/PhpComposerInstaller/releases), majd futtatni az exe fájlt
  - Lehet, hogy a Smart Screen nem engedi elsőre futtatni (Run anyway lehetőséget kell választani), illetve a víruskeresők (tipikusan az AVG és az Avast) hibás működést idézhetnek elő, így ezeket érdemes a telepítés idejére kikapcsolni

### A Laravel

A Laravel egy PHP MVC keretrendszer, azaz a kód strukurálására a Modell-Nézet-Vezérlő mintát ajánlja. Ebben a **modell** felelős az adatok tárolásáért és felületfüggetlen feldolgozásáért, a **nézet** az adatok megjelenítéséért, azaz a mi esetünkben a HTML előállításáért, és a **vezérlő** az, ami fogadja a HTTP kérést, beolvassa az adatokat, meghívja a Modellréteg feldolgozó függvényeit, majd ezek eredményét a kiírja a nézet meghívásával. A legtöbb MVC-s keretrendszernek központi eleme még a **routing**, amely során egy URL, egy végpontot a megfelelő vezérlőlogikához rendelünk.

Egy egyszerű HTML oldal megjelenítéséhez nem kell adat, viszont végpont alatt jelennek az oldalak, azaz kell bele routing, ami egy vezérlőmetódushoz irányítja a végrehajtást, ami egyszerűen megjeleníti a nézetet, ami a HTML-ünket tartalmazza. Azaz ezt az egyszerű kis dolog elvégézéséhez rögtön három komponens kell:

- routing
- controller
- view

### Új Laravel projekt létrehozása

- Ajánlott rendszergazdai parancssorral dolgozni
- Hozzunk létre egy új Laraveles projektet, az alábbi parancs segítségével:
  ```shell
  composer create-project --prefer-dist laravel/laravel PROJEKT NEVE
  ```
- Ez a megadott projektnévvel létre fog hozni egy könyvtárat (ott, ahol kiadtuk a parancsot), majd a távoli szerverről letölti a Laravelhez tartozó Composeres csomagokat, végül inicializálja a projektet (autoload, stb.)
- A folyamat időigényes, és függ a hálózati viszonyoktól, illetve a munkaállomás konfigurációjától, pl. hogy SSD vagy HDD van-e, stb.

### A projekt első indítása

- Nyissunk egy terminált / parancssort a projekt mappájában
- Indítsuk el a projektet, erre két lehetőség is van:
  - `php artisan serve`
    - A port állítható így: `php artisan serve --port=8080`
  - `php -S 127.0.0.10:80 -t public/`
    - Ekkor ezt az IP-t hozzá is rendelhetjük egy domain-hez a host fájlban, pl.
      `127.0.0.10 szerveroldali.dev`
- Ezt követően nyissuk meg a projektet a böngészőben:
  - `php artisan serve` esetén [http://localhost:8000](http://localhost:8000)
  - a másik lehetőségnél, ha van beállítva hosts fájl, akkor [http://szerveroldali.dev](http://szerveroldali.dev), ha pedig nincs, akkor a natív IP-t kell megadni: [http://127.0.0.10](http://127.0.0.10)
- A második módszer előnye az `artisan serve` paranccsal szemben, hogy működik a gyorsítótárazás, ezért gyorsabb, illetve beszédesebb a domainnév is, valamint lehet játszani, hogy a vége 127.0.0.10, 11, 12, stb. legyen, így a különböző projektekhez lehet rendelni egyedi domainneveket.

### Egy Laravel projekt felépítése

- Első ránézésre a Laravel projektszerkezete egyáltalán nem egyértelmű olyan embereknek, akik először látják azt. Erre igazán csak gyakorlati úton lehet ráérezni.
- Nagyon nagy vonalakban a projekt szerkezete a következő:
  - **app**:
    - Gyakorlatilag az alkalmazás kódjának a magját tartalmazza
    - A félév során megkerülhetetlen lesz, fontos taglalni az almappákat is:
      - **app/Models**:
        - létre fogunk hozni modelleket, ezek ebben a mappában találhatók
      - **app/Http**
        - Tartalmazza a controllereket, middleware-ket, és a formokhoz tartozó request-eket
        - Mondhatni itt dolgozzuk fel szinte az összes kérést, ami az alkalmazáshoz érkezik a kliensektől
        - **app/Http/Controllers**
          - Különböző vezérlőlogikák, amiket hozzá tudunk rendelni az egyes végpontokhoz
        - **app/Http/Middleware**
          - A middleware fogalma gyakran elő fog jönni a félévben (a Node.js-nél is)
          - Amikor bejön egy kérés, middleware-k sora hajtódik végre, tehát ez úgymond egy köztes logika.
          - Például:
            - megvan a middleware-k sorrendje, ha bejön egy kérés, azt a web middleware veszi át, majd utána hajtódik végre a végpont mögött rejlő vezérlési logika. Azonban ha beállítunk egy autentikációt, akkor a web middleware után egy auth middleware hajtódik végre. Itt pedig ha nem sikerül a hitelesítés, akkor pl. átirányítja a felhasználót a login oldalra, nem pedig a végponthoz tartozó vezérlés következik.
            - [web mw] -> [auth mw] -> [kiszolgálás]
      - **app/Http/Requests**
        - Amikor form-okat (űrlapokat) küld el a felhasználó, akkor létre lehet hozni ilyen request objektumokat, amik egy-egy ilyen form logikáját le tudják kezelni. Ezek találhatók itt.
  - **bootstrap**
    - Ez a félév során számunkra érdektelen, ha bele is kell valaha nyúlni, akkor azt csak indokolt esetben és körültekintően érdemes megtenni.
    - Itt található az app.php fájl, ami kvázi "felállítja" (bootstrap-eli, bár erre nincs nagyon egyszavas értelmes magyar fordítás) az alkalmazást, illetve a gyorsítótárazás is itt van kezelve, ami arra szolgál, hogy segítsen optimalizálni a teljesítményt
  - **config**
    - Elég egyértelmű a neve alapján, és pontosan arra is való, amit az ember sejtene mögötte: itt van az alkalmazás konfigurációja
    - Elég érthetően kategóriákra van bontva a fájlok szerint, minimális szinten bele fogunk nézni a félév során
  - **database**
    - Ennek is egyértelmű a neve, az adatbázissal kapcsolatos dolgokat tartalmazza
    - Három almappát tartalmaz, mindegyik aktívan kelleni fog majd a félév során:
      - **migrations**:
        - itt írjuk le az adatbázis szerkezetét, fontos, hogy a fájlok neve előtt van egy timestamp (időbélyeg), a Laravel eszerint rendezi sorba őket
        - felfogható az adatbázis szerkezethez tartozó "verziókezelésként" is
      - **factories**:
        - modell"gyárak", egy megadott logika szerint generálhatunk modelleket
      - **seeders**:
        - A seeder arra való, hogy feltöltse az adatbázist adatokkal
        - A migration-ök, factory-k és a seederek egymásra épülnek, hiszen az adatbázis szerkezetét, a táblákat, kapcsolatokat a migration-ök adják meg, az egyes adatokat a factory-k, a factory-k által generált modelleket pedig a seederben tudjuk egy meghatározott logika szerint feltölteni
  - **public**
    - Itt található az index.php, ami az összes bejövő kérés belépési pontja, valamint meghatározza az alkalmazás autoload-ját
    - Ezen felül itt találhatók az "asset-ek": képek, JS és CSS fájlok
      - ha npm-et használunk és pl npm segítségével töltjük le a Bootstrap-et, a Laravel Mix build kimenetei is ide kerülnek tipikusan JS és CSS fájlok formájában
    - Ha egy hostingra töltjük fel az appot, ezt a mappát kell az úgynevezett _www_ vagy _public_html_ mappába tenni, és az alkalmazás többi részét egy szinttel feljebb
  - **resources**
    - Ez is egy fontos mappa lesz a félév során, már rögtön a legelején
    - Ez tartalmazza a css és js fájlok "natív" verzióit (a public mappába ezeknek a build-je kerül általában), a nyelvi fájlokat (lang), valamint a **view-okat** (az MVC logikából a V), ezekben fogjuk létrehozni a Blade template-ket
    - A későbbiekben nézünk példát a lang magyarosítására is
  - **routes**
    - Meghatározza az összes útvonalat, ami az alkalmazáshoz tartozik
    - Nekünk alapvetően ebből csak a **web.php** az, ami fontos lesz
    - De tulajdonképpen mik is vannak itt:
      - **web.php**
        - A `RouteServiceProvider`-re épül, ami biztosít session-t (munkamenetet), CSRF védelmet (OWASP top 10-ben is benne van, és EA anyag is lesz), valamint cookie titkosítást is
        - Ha az alkalmazás nem használ állapotmentes (stateless) RESTful API-t (márpedig a mienk nem fog a félévben), akkor kb. ezzel a fájllal le is fedtük az összes route-ot.
      - **api.php**:
        - Szintén a `RouteServiceProvider`-re épül, viszont ezek stateless (állapotmentes) útvonalak, ezért tokennel kell hitelesíteni őket. Ezt a fájlt kell(ene) használni, ha REST API-t készítünk és ahhoz veszünk fel route-okat, viszont azt mi a félév második felében nem Laravellel, hanem Express JS-el fogunk csinálni, Node.js környezetben.
      - **console.php**
        - Gyakorlatilag artisan parancsokat lehet felvenni, pl. `php artisan valami`, nem fogunk ilyet csinálni a félévben.
      - **channels.php**
        - Ez akkor lényeges, ha használunk valamilyen event broadcasting-ot, gyakorlatilag ezzel lehet live chatet, játékot stb. csinálni, de nagyon nem ennek a félévnek az anyaga.
  - **storage**
    - Ez a könyvtár elég sok minden tartalmaz, de csak érintőlegesen fogunk vele foglalkozni a gyakorlatokon
    - Például itt vannak a naplófájlok, illetve minden olyan fájl, amit az alkalmazás hoz létre / generál ki
    - Alapvetően három almappára van bontva: _app, framework, logs_ (alkalmazás és framework által generált dolgok, valamint a generált naplók)
    - A **storage/app/public** mappát fogjuk használni, ide berakhatók a felhasználókhoz köthető fájlok (pl. egy kép, amit feltölt valamihez). Ehhez a mappához lehet készíteni egy _symlink_-et (symbolic link), hogy hozzáférhető legyen a public mappából is, erre lesz majd a `php artisan storage:link` parancs, de ezt majd később... lehet olyat is csinálni, hogy egy végpont különböző fájlműveletekkel lekérjen innen célzottan egy fájlt és azt visszaadja, és akkor nem kell symlink. Legfeljebb ha nem létezik a lekérni kívánt fájl, akkor valami default oldalra irányít, vagy 404 választ ad.
  - **tests**
    - Itt találhatóak az automatikusan futtatható unit testek, a félév során erre nem lesz idő
  - **vendor**
    - Itt találhatóak a Composeres csomagok, amiket a _Composer_ a távoli szerverről töltött le a _composer.json_ fájl alapján.
  - **node_modules**
    - Itt találhatóak az npm-es csomagok, amiket a _Node Package Manager_ (röviden _npm_) a távoli szerverről töltött le a _package.json_ fájl alapján.
- Az alkalmazás gyökérmappájában található fájlokról röviden, hogy mi micsoda:
  - **.env**:
    - environment, azaz környezeti fájl, leírja, hogy az alkalmazáshoz egy adott környezetben milyen konfiguráció tartozik (pl. más a fejlesztési környezet és az a környezet ahol az alkalmazás majd ténylegesen fut, más az adatbázis kapcsolódás, stb.)
    - Biztonsági okokból ez nincs verziókezelve a git által (a .gitignore része)
  - **.env.example**
    - Egy jó kiindulópont, ha _.env_ fájlt akarunk csinálni, csak lemásoljuk és átnevezzük _.env_-nek, az összes basic dolog benne van, csak minimálisan kell átírni, majd egy APP_KEY-t generálni a `php artisan key:generate` paranccsal.
  - **composer.json**, **package.json**, illetve a lock fájlok:
    - Ezek leírják, hogy a Composer és az npm milyen csomagokat telepítsen, a lock fájlokat csak ehhez generálják (a lock file csak annyit csinál, hogy az adott csomag milyen verziójú alcsomagokat követel meg, és mivel generált fájl, ezért nem szabad átírni)
  - **.gitattributes**, **.gitignore**
    - Git-hez tartozó beállításokat, kizárásokat tartalmazó fájlok
  - **.editorconfig**
    - Ez egy konfigurációs fájl, ami az editoroknak (VSCode, PHPStorm, stb) ad meg különböző beállításokat, pl. egyes fájlok, fájltípusok karakterkódolását, tab-ot/space-t használjanak, stb.
  - **webpack.mix.js**
    - Ezt az npm működteti, és a Laravel Mix konfigurációját adja meg, vagyis azt, hogy milyen logika szerint generálja ki a frontend oldali asset-eket
  - **artisan**
    - Az Artisan konzolt működteti
  - **server.php**
    - Hasonló a **public/index.php**-hoz, azonban az Apache "mod_rewrite" funkcionalitását szimulálja, így ezáltal "valódi" webszerver nélkül is tesztelhető az alkalmazás, a [PHP beépített dev webszerverét](https://www.php.net/manual/en/features.commandline.webserver.php) használva
  - **phpunit.xml**
    - Fentebb már volt szó a tesztelésről, ezt a _PHPUnit_ nevű csomag látja el, ez az XML fájl pedig annak a [konfigurációját](https://phpunit.readthedocs.io/en/9.5/configuration.html) írja le
  - **.styleci.yml**
    - A _phpunit.xml_-hez hasonlóan ez is egy konfigurációs fájl, a _StyleCI_ csomaghoz

### Laravel Dokumentáció

- A Laravel jól dokumentált, és a dokumentációja jól forgatható.
- A Laravelnek alapvetően kétféle dokumentációja van:
  - egy beszédesebb, amiben a főbb dolgok és az irányvonal le van írva, és ehhez számtalan példát is mutat:
    - [https://laravel.com/docs](https://laravel.com/docs)
      - ez a link mindig a legújabb kiadásra fog átirányítani
  - és van egy "szárazabb" verzió is, ami leírja az összes funkció felépítését:
    - [https://laravel.com/api/8.x/index.html](https://laravel.com/api/8.x/index.html)
      - értelemszerűen a listából mindig ki kell választani az aktuálisan legfrissebb verziót

## Node.js, Express.js

A félév másik nagy anyagrésze a Node.js és az ehhez kapcsolódó különböző technológiák. Ez a leírás a Node.js-be való bevezetést, illetve a REST API anyagrész alapjait mutatja be.

### Szükséges programok

Az alábbi programokat be kell szerezni, ha még nincsenek feltelepítve.

- Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/) (az LTS verziót érdemes letölteni)
- Firecamp: [https://firecamp.io/download](https://firecamp.io/download) (vagy [Chrome áruházból](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl) egyszerűbb telepíteni)

Mindkét program elérhető Windowsra, Linuxra és macOS-re.

A telepítést ellenőrizhetjük az alábbi parancsok segítségével:

```powershell
node --version
npm --version
```

### Node.js

Egy nyílt forráskódú szoftverrendszer, amit skálázható webes alkalmazások írására hoztak létre. Az alkalmazásokat JavaScript nyelven tudjuk elkészíteni, a rendszer pedig a háttérben a Chrome által is használt V8 JS motor segítségével futtatja őket. Eseményalapú, aszinkron I/O-t használ, így minimalizálja a túlterhelést, és maximalizálja a skálázhatóságot.

### npm

A Node.js mellett feltelepül az **npm** (ami a **Node Package Manager** rövidítése). Ez egy széles körben használt csomagkezelő rendszer, amihez rengeteg könyvtár érhető el. (Lásd a csomag repository-t itt: [https://www.npmjs.com/](https://www.npmjs.com/))

#### Új projekt létrehozása

Amikor az npm segítségével készítünk egy projektet, akkor a projektünk adatait, valamint a benne használt csomagokat a **package.json** fájlban írjuk le. Új projektet úgy tudunk indítani, hogy a kívánt mappában kiadjuk az alábbi parancsot:
`npm init`

Ekkor a rendszer bekéri a csomag adatait (nevét, leírását, stb.). Az adatok bekérését követően pedig összeállítja belőlük a package.json fájlt.

#### npm csomagok telepítése

Két lehetőségünk van egy npm csomag telepítésekor.

1. Globálisan telepítjük
   - Ilyenkor a csomagot nem kell minden egyes projektünkhöz telepíteni, hanem bárhonnan hozzájuk tudunk férni. Tipikusan a CLI alapú csomagoknál érdemes ezt a telepítést választani, pl. Nodemon, Angular CLI, stb. A telepítéshez szükséges parancs:
     - `npm install -g <CSOMAG NEVE>`
2. Lokálisan telepítjük
   - Ilyenkor csak az adott projektből férünk hozzá a csomaghoz. Tipikusan keretrendszereket vagy különböző könyvtárakat érdemes ilyen módon telepíteni. A parancs ugyanaz, mint az előbb, csak itt nem kell a **-g** kapcsoló.
     - `npm install <CSOMAG NEVE>`

A telepített csomagokat az `npm ls` parancssal tudjuk kilistázni.

#### Egy alap Node.js program

Itt látható egy példa az alap Node.js alkalmazásra. Készítsünk új projektet, majd az **index.js** fájlba másoljuk be az alábbi kódot:

```javascript
const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  })
  .listen(8080);
```

Ezt követően mentsük el a fájt, és indítsuk el a programot az alábbi paranccsal:
`node index.js`

#### Próbáljuk ki

Egy tetszőleges böngészővel nyissuk meg a következő címet: [http://localhost:8080/](http://localhost:8080/)
Ekkor a betöltött oldalon meg kell, hogy jelenjen a _Hello World!_ szöveg.

#### Hogy működik?

Beimportáljuk a Node **http modulját** ([doksi](https://nodejs.org/dist/latest-v14.x/docs/api/http.html)), amihez utána a **http változón** keresztül hozzáférünk. A http modul **createServer** metódusával létrehozunk egy szervert, amiben van egy úgynevezett callback function, aminek van egy request és egy response paramétere (vagyis a szerver felé beérkező kérés - ez a request, és a kliensnek adott válasz - ez a response).

Ez a callback function minden egyes kérés alkalmával le fog futni, aszinkron módon. Tulajdonképpen annyit csinál, hogy 200-as állapotkóddal (ami azt jelenti, hogy a kérés rendben ki lett szolgálva, lásd [http állapotkódok](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)) egy plain text típusú választ ad, majd beírja a Hello World! szöveget a válaszba és elküldi azt a kliens felé.

Végpontkezelés nincs benne, tehát bármilyen végponttal is hívom meg a szervert, ugyanazt a választ fogom kapni. Ki lehet próbálni mondjuk a [http://localhost:8080/valami](http://localhost:8080/valami) címmel.

#### Mi ezzel a "probléma"?

Az, hogy ez egy nagyon alacsony szintű kód. Igazából ebből a példából annyira nem is érzékelhető ez a probléma, viszont gondoljunk bele, ha szeretnénk kezelni sok összetett végpontot (vagyis egy végpont kezelhet mondjuk GET és POST kéréseket is, különböző adatokat kaphat, amiket fel kell dolgozzon, az URL-ből kell kinyerjen adatot, vagy az URL-nek egy adott mintára kell illeszkednie, stb.) Érezhető, hogy ez ilyen alacsony szintű eszközökkel elég sok munka lenne...

Mi pedig nem szeretnénk ennek kitenni magunkat, tehát jó lenne nekünk egy olyan eszköz, ami egy magasabb szintű api-val elfedi ezt a sok alacsony szintű kódot, és ezáltal könnyebbé, átláthatóbbá tenné számunkra a fejlesztést. **Itt jön képbe az Express**, ami jóval magasabb szintű eszközöket ad nekünk.

### Express

#### Express telepítése a projekthez

Ha készen áll a projektünk, akkor hozzá kell adnunk az Express-t. Ezt a projektünk mappájában az alábbi parancs kiadásával tehetjük meg:
`npm install --save express`

Ekkor egy távoli szerverről letölti a csomaghoz szükséges fájlokat, amik a **node_modules** mappába kerülnek.

A **--save** kapcsoló helyettesíthető az **-S** kapcsolóval is, és azt mondja meg, hogy az Express-t a **package.json** fájlhoz is hozzá szeretnénk adni a csomagot.

Ez azt jelenti, hogy legközelebb elég kiadnunk az `npm install` (vagy rövidebben: `npm i`) parancsot, és a **package.json** fájlban leírt adatok alapján a rendszer automatikusan fel fogja telepíteni az ide mentett csomagokat (a dependencies rész alatt vannak listázva).

Létezik a **--save** mellett egy **--save-dev** nevű opció is, ez annyiban különbözik a sima save-től, hogy a fejlesztéshez szükséges függőségek közé menti el a csomagot a package.json-ben (devDependencies). Ezek az eszközök tehát a fejlesztő munkáját segítik valamilyen módon, de ahhoz nem szükségesek, hogy az alkalmazás fusson és működjön, ellentétben a save kapcsolóval telepített csomagokkal, amik azonban mindenképpen szükségesek.

#### Nodemon telepítése a projekthez

Könnyítsük tovább a saját dolgunkat, és telepítsük a **nodemon**-t. Ez egy fejlesztői eszköz, és arra való, hogyha módosítunk egy fájlt, akkor automatikusan újraindítja a szerverünket a háttérben, hogy a változásokat azonnal láthassuk és ne nekünk kelljen minden egyes mentés után kézzel elvégezni az újraindítást.

A következő paranccsal lehet telepíteni:
`npm install -g nodemon`

#### Az első Express alkalmazás

Ha minden szükséges csomagot feltelepítettünk, elkezdhetjük az alkalmazásunk tényleges fejlesztését. Ehhez készítsünk egy **index.js** nevű fájlt, amibe írjuk bele az alábbi kódot:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
```

Miután elmentettük a fájlt, a következő paranccsal indítható az alkalmazás:
`nodemon index.js`

(Ha ez nem működik, mert a környezeti változók nem jól vannak beállítva, és ismeretlen parancsnak tekinti a rendszer, akkor az `npx nodemon index.js` parancsot érdemes megpróbálni).

Ha azt szeretnénk, hogy az `npm start` vagy az `npm run dev` paranccsal induljon az alkalmazás (mivel a nodemon egy fejlesztői eszköz, célszerűbb az npm run dev), azt úgy tehetjük meg, hogy a package.json-ben a `scripts` részhez felvesszük:

```json
{
  "scripts": {
    "dev": "npx nodemon index.js"
  }
}
```

#### Próbáljuk ki

Egy tetszőleges böngészővel nyissuk meg a következő címet: [http://localhost:3000/](http://localhost:3000/)
Ekkor a betöltött oldalon meg kell, hogy jelenjen a _Hello World!_ szöveg.

Próbáljunk meg olyan végpontot is meghívni, ami nem létezik:
[http://localhost:3000/valami](http://localhost:3000/valami)

A válasz ekkor egy értelmes hibaüzenet lesz.

Kipróbálhatjuk azt is, hogy a Hello World!-öt átírjuk valami másra és elmentjük a fájlt. A szerver mindenféle manuális újraindítás nélkül az új szöveget fogja elküldeni.

#### Tulajdonképpen mi is történik itt?

A programunk első sora beimportálja az Express-t, amihez az **express** változón keresztül kapunk hozzáférést. Ennek segítségével csinálunk egy alkalmazást, amit az **app** nevű változóhoz kötünk.

Majd pedig az alkalmazás az alábbi funkciókat használja:

- app.get(route, callback függvény)
  - Azt írja le, hogy mi történjen, ha get metódussal hívjuk meg az adott route-ot. A callback funkciónak (ez értelemszerűen lehet sima function vagy arrow function) 2 paramétere van, a **request (req)**, illetve a **response (res)**. Ezek szabványos HTTP kéréseket reprezentálnak, amelyeknek vannak tulajdonságaik, paramétereik, fejléceik, törzsük, stb.
- res.send()
  - Ez a funkció fog egy objektumot, és továbbítja a válaszban a kérést küldő kliens felé. Ezen a ponton küldjük át a kliensnek (jelen esetben pl. böngészőnek) a _Hello world!_ szöveget.
- app.listen(port, [host], [backlog], [callback]])
  - Ennek hatására a program elkezdi figyelni a kapcsolódásokat a megadott címen. A portot mindenképpen meg kell adni, a többi opcionális paraméter.

#### Miért jó ez nekünk?

Látszik, hogy a kód sokkal strukturáltabb, átláthatóbb, a végpontok pedig szépen elkülönülnek majd egymástól. Magasabb szinten tudunk fejleszteni, mintha csak a sima http modult használnánk.
