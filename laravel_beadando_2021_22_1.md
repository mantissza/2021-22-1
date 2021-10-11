# Szerveroldali webprogramozás 2021/22/1 - Laravel beadandó

## Tartalomjegyzék

- [Szerveroldali webprogramozás 2021/22/1 - Laravel beadandó](#szerveroldali-webprogramozás-2021221---laravel-beadandó)
  - [Tartalomjegyzék](#tartalomjegyzék)
  - [Feladat](#feladat)
    - [Adatmodellek](#adatmodellek)
    - [Relációk](#relációk)
  - [1. felvonás (30 pont)](#1-felvonás-30-pont)
    - [Seeder (3 pont)](#seeder-3-pont)
    - [Főoldal (5 pont)](#főoldal-5-pont)
    - [Toplista (2 pont)](#toplista-2-pont)
    - [Film adatlapja (10 pont)](#film-adatlapja-10-pont)
    - [Film értékelése (10 pont)](#film-értékelése-10-pont)
  - [2. felvonás (30 pont)](#2-felvonás-30-pont)
    - [Film hozzáadása (7 pont)](#film-hozzáadása-7-pont)
    - [Film módosítása (3 pont)](#film-módosítása-3-pont)
    - [Értékelések törlése (3 pont)](#értékelések-törlése-3-pont)
    - [Film törlése (3 pont)](#film-törlése-3-pont)
    - [Film helyreállítása (14 pont)](#film-helyreállítása-14-pont)
  - [Kezdőcsomag](#kezdőcsomag)
  - [Követelmények](#követelmények)
  - [Alkotói szabadság](#alkotói-szabadság)
  - [Segítségkérés, konzultációs alkalmak](#segítségkérés-konzultációs-alkalmak)
  - [Határidők, késés](#határidők-késés)
  - [A munka tisztasága](#a-munka-tisztasága)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)

## Feladat

A feladatod egy filmkatalógus elkészítése, ahol az admin kezeli a filmeket, a felhasználók pedig értékelhetik azokat. Az alkalmazást Laravel 8 keretrendszerben, SQLite adatbázis használatával kell megvalósítani.

### Adatmodellek

- Movie
  - id
  - title (string)
  - director (string)
  - description (text)
  - year (integer)
  - length (integer, másodpercekben mérjük)
  - image (string, nullable)
  - ratings_enabled (boolean, default: true)
  - timestamps (created_at, updated_at, később deleted_at)
- User _(ilyen van alapból a Laravelben, csak ki kell egészíteni egy is_admin-nel)_
  - id
  - name (string)
  - email (string, unique)
  - email_verified_at (timestamp, nullable)
  - password (string)
  - is_admin (boolean, default: false)
  - remember_token
  - timestamps (created_at, updated_at)
- Rating
  - user_id (integer, foreign)
  - movie_id (integer, foreign)
  - rating (integer, 1-5)
  - comment (string, max 255, nullable)
  - timestamps (created_at, updated_at)

### Relációk

- Movie 1 - N Rating
- User 1 - N Rating

## 1. felvonás (30 pont)

**Határidő: 2021. október 24(?). (vasárnap) 23:59**

### Seeder (3 pont)

- Az alkalmazás legyen feltölthető adatokkal egy seeder / seeder-ek segítségével. Ez a feltöltés lehetőleg minél több mindent fedjen le.
- A seeder ezzel az egy paranccsal működjön: `php artisan db:seed`
- A user fiókok az egyszerűség kedvéért **csak ezek lehetnek** (email - jelszó):
  - Admin: *admin@szerveroldali.hu - password*
    - Sima user-ek:
      - *user1@szerveroldali.hu - password*
    - *user2@szerveroldali.hu - password*
    - ....

### Főoldal (5 pont)

- Legyen egy főoldal, ahol a filmek listázva vannak valamilyen módon (card, lista, akármi)
- Az egyes filmeknél a főoldalon mindenképp jelenjen meg a film címe, a hozzá tartozó kép (ha van, egyébként jó valami default placeholder kép is), és az értékelés (ez lehet számként / csillagokkal)
- A főoldal lapozható legyen (pagination), egy oldalon max. 10 film jelenjen meg
- Az egyes filmekre kattintva jöjjön be az adott film adatlapja

### Toplista (2 pont)

- Legyen egy toplista nevű oldal, ami hasonló a főoldalhoz, azonban itt a legjobbra értékelt 6 film jelenik meg.

### Film adatlapja (10 pont)

- Itt szintén jelenítsük meg valamilyen módon a filmhez tartozó képet, értékelést és írjuk ki a film minden adatát.
- A film adatlapján jelenítsük meg az egyes értékeléseket, szintén pagination segítségével, vagyis egyszerre max 10 értékelés jelenjen meg. Az értékelések időrendi sorrendbe legyenek rendezve, úgy, hogy a legújabb legyen legelöl.

### Film értékelése (10 pont)

- Ha be vagyunk jelentkezve, akkor a film adatlapján legyen lehetőség a film értékelésére. Ez egy form, ami két részből áll:
  - egy értékelés (1-5), és
  - egy opcionális komment beviteléből.
- A form legyen állapottartó, a validációs hibákról adjon egyértelmű visszajelzést a felhasználónak.
- Az értékelés során két eset lehet:
  - Ha még nem értékeltük az adott userrel a filmet, akkor új értékelést adunk hozzá.
  - Ha az adott user már értékelte a filmet, akkor a meglévő értékelését tudja módosítani.
- Ha az admin is tud értékelni, az nem probléma.
- Ha az értékelés sikerült, akkor térjünk vissza a film adatlapjára, ahol jelenjen meg egy üzenet, hogy sikerült az értékelés.
- A filmet csak akkor lehessen értékelni, ha az értékelés engedélyezve van (`ratings_enabled` mező). Ha az értékelés le van tiltva, a form nem jelenhet meg, a végpontjára nem lehet értékelést küldeni, és a felhasználónak meg kell róla jeleníteni egy üzenetet. Ha az értékelés le van tiltva, az azt jelenti, hogy új értékelést nem lehet hozzáadni, de ha már vannak meglévő értékelések, azokat ugyanúgy jelenítsük meg.

## 2. felvonás (30 pont)

**Határidő: 2021. november 2(?). (kedd) 23:59**

A második felvonásban az admin funkciókat kell megcsinálni.

- A felhasználó akkor számít adminnak, ha az _is_admin_ logikai mezőjének értéke igaz.
- Az admin tudja kezelni az oldalon lévő filmeket, vagyis **hozzáadhat, módosíthat, törölhet és helyreállíthat** filmeket.

### Film hozzáadása (7 pont)

- A filmeket listázó oldalon legyen egy "Új film" nevű gomb, amire rákattintva jöjjön be egy űrlap, amelyen lehet új filmet hozzáadni a film adatainak megadásával.
- Validálási szabályok:
  - Cím kötelező, max 255 karakter
  - Rendező kötelező, max 128 karakter
  - Év kötelező, legalább 1870, legfeljebb a jelenlegi év
  - Leírás nem kötelező, de ha van, max 512 karakter
  - Film hossza
  - A feltöltött kép formátuma csak jpg és png lehet, maximum 2MB méretben.
- A filmhez tartozó képfeltöltést rendesen implementálni kell (vagyis egy link megadása, majd annak átadása egy img tag-nek nem számít megoldásnak)! Fel kell tudni tölteni a képfájlt, azt eltárolni a storage-ben, majd onnan kiolvasni megjelenítéshez a movie image mezője alapján.
- A form legyen állapottartó, a validációs hibákról adjon egyértelmű visszajelzést a felhasználónak.

### Film módosítása (3 pont)

- A film adatlapján az adminnak megjelenik egy "Módosítás" gomb, ami az adott filmre behoz egy formot, ami előre ki van töltve a film adataival, a validálási szabályok pedig megegyeznek a létrehozással.
- A kép helyes kezelése módosításnál:
  - A képet úgy tudod megoldani, hogy megjeleníted magát a képet, és ugyanúgy a fájlfeltöltő input mezőt is, és ha üresen hagyja a user, hagyod a régi képet, ha pedig feltölt egy másik képet, akkor kicseréled arra a képet, a régit pedig törlöd a disk-ről.
  - A kép alá rakj be egy checkbox-ot is, hogy "Kép eltávolítása". Ha ezt bejelöli a user, akkor csak simán törölni szeretné a meglévő képet, ahelyett, hogy újat töltene fel. Ha a "Kép eltávolítása" mezőt bejelöli, és úgy tölt fel új képet, akkor csak ugyanúgy cseréld le a képet az újra.
- A form legyen állapottartó, a validációs hibákról adjon egyértelmű visszajelzést a felhasználónak.
- A módosítás után meg kell jeleníteni a felhasználónak, hogy a módosítás sikeres volt.

### Értékelések törlése (3 pont)

- A film adatlapján az adminnak megjelenik egy "Értékelések törlése" gomb, amelyre kattintva a filmhez tartozó összes értékelés törlésre kerül.
- A törlés után meg kell jeleníteni a felhasználónak, hogy a törlés sikeres volt.

### Film törlése (3 pont)

- A film adatlapján az adminnak megjelenik egy "Törlés" gomb, amelyre kattintva a film törlésre kerül.
- A törlés után meg kell jeleníteni a felhasználónak, hogy a törlés sikeres volt.
- A helyreállítás miatt [soft delete](https://laravel.com/docs/8.x/eloquent#soft-deleting) kell történjen. Tulajdonképpen ez azt jelenti, hogy a film nem is lett ténylegesen törölve, csak egy _deleted_at_ mezővel látta el a Laravel.

### Film helyreállítása (14 pont)

- Az adminnak legyen lehetősége egy törölt filmet helyreállítani (restore).
- A törölt film értelemszerűen a usereknek nem jelenhet meg, de az adminnak ugyanúgy jelenjen meg a filmek között (viszont legyen megkülönböztetve a nem törölt filmektől).
- Az admin legyen képes megnyitni az adatlapját is, és az adatlapján állíthatja vissza egy "Visszaállítás" gombra kattintva. Innentől ismét rendes filmnek számít.
- A helyreállítás után meg kell jeleníteni a felhasználónak, hogy a helyreállítás sikeres volt.

## Kezdőcsomag

- A beadandóhoz kezdőcsomagot adunk. **A kompatibilitási problémák elkerülése érdekében kérünk mindenkit, hogy ezt a kezdőcsomagot használja, és ebbe dolgozzon!**
- A kezdőcsomag a következő GitHub repositoryból tölthető le (clone vagy [download zip](https://github.com/szerveroldali/laravel_kezdocsomag/archive/refs/heads/main.zip)): https://github.com/szerveroldali/laravel_kezdocsomag
  - Letöltés után telepíteni kell a Composer-es csomagokat: `composer install`
  - A beadandót becsomagolni a `php artisan zip` paranccsal, majd annak utasításait követve lehet! Ilyenkor a `zipfiles` mappában meg fog jelenni a beadható fájl.

## Követelmények

- Alapelvárás, hogy az alkalmazás a beadott zip-ből kicsomagolva ezekkel a parancsokkal probléma nélkül elinduljon:
  ```
  composer install
  npm install
  npm run prod
  php artisan migrate:fresh
  php artisan db:seed
  php artisan storage:link
  php artisan serve
  ```
- Kötelező mellékelni a munka tisztaságáról szóló _STATEMENT.md_ nevű nyilatkozatot, a részleteket [lásd lentebb](#dolgozz-fair-módon). Az elfelejtett nyilatkozat utólag pótolható Canvas-on kommentben is.
- Tilos mellékelni a vendor és a node_modules mappákat!
- Elvárás az igényesen kidolgozott felhasználói felület, azaz, hogy felhasználóként, a kódban való kutatgatás nélkül is teljes mértékben használható legyen az alkalmazás; ki legyen dolgozva a menürendszer, a műveletekhez rendelkezésre álljanak a gombok, megjelenjenek a hiba/tájékoztató üzenetek, stb. A stílushoz használt CSS framework nincs megkötve, használhatsz Tailwind-ot, Bootstrap-et, vagy ami szimpatikus.
- Az időzóna legyen magyarra állítva az alkalmazás konfigurációjában!
- Az űrlapokon keresztül küldött adatokat minden esetben validálni kell szerveroldalon! HTML szintű validáció (pl. required attribútum) ne is legyen a kódban! Nem a HTML tag-ek ismeretét szeretnénk számonkérni egy szerveroldali tárgyon, hanem a [Laravel validációjának](https://laravel.com/docs/8.x/validation) megfelelő alkalmazását!

## Alkotói szabadság

- Szeretnénk, ha nem egy kötött dologként gondolnátok erre a feladatra, hanem kellő alkotói szabadsággal állnátok neki.
- Tulajdonképpen alkalmazott tudást várunk el, hogy a tanultakat mélyebben megértsétek és akár tovább is tudjátok gondolni; vagyis nem kell mereven csak a tanult dolgokhoz ragaszkodni, kezdjétek el "élesben" használni a Laravelt, és ahogy foglalkoztok vele, úgy értitek majd meg egyre jobban és jobban a koncepcióját.
- Egy jó tanács: mérlegeljétek az előttetek álló feladatokat, ne essetek olyan hibába, hogy sokkal bonyolultabb megoldást csináltok, mint amire szükség van.

## Segítségkérés, konzultációs alkalmak

- Ha bárkinek bármilyen kérdése van a beadandóval kapcsolatban, pl. elakadt, támpontra van szüksége, kíváncsi, hogy jó-e egy ötlete, nem ért valamit a követelményekből, nem érti a feladat valamelyik pontját, akkor bátran keresse az oktatókat. Fontos, hogy NE tologassa maga előtt a beadandót, ha elakad, hogy "majd lesz valahogy", "majd később megoldom", mivel hamar elszáll az idő! Az elérhetőségek megtalálhatóak a Canvasben, az "Elérhetőség" oldalon.
- A beadandóhoz az alábbi konzultációs lehetőségeket is biztosítjuk:
  - 2021. október 16. (szombat) 14:00, helyszín: Teams, Általános csatorna
  - 2021. október 28. (csütörtök) 21:00, helyszín: Teams, Általános csatorna
- Ezek általános konzultációs alkalmak. A gyakorlatvezetők elmondanak általános dolgokat, tanácsokat, viszont az igazi az lenne, ha minél többen becsatlakoznátok, és hoznátok magatokkal kérdéseket, hogy a jelenlévő társaitok is tudjanak belőle tanulni, okulni, hogy mások miket kérdeznek, és azokra mi a válasz/lehetséges megközelítés.

## Határidők, késés

- A beadandót igyekeztünk úgy kialakítani és olyan beadási határidőkkel ellátni, hogy azt mindenkinek legyen elegendő ideje rendesen, nyugodt körülmények között kidolgozni.
- **Időben kezdj hozzá a beadandóhoz és oszd be az idődet! Sajnos gyakori tapasztalat, hogy sokan a határidő lejárta előtt pár nappal, vagy akár a határidő napján állnak neki a beadandónak, ezért NYOMATÉKOSAN kérünk mindenkit, hogy IDŐBEN kezdjen hozzá!**
- A határidő lejárta után lehetőség van késésre:
  - **Minden, határidő után megkezdett nap (0:00-tól) 1.5 (azaz másfél) pont levonását jelenti.**
  - A határidő mindig 23:59-re esik, így aki az utolsó pillanatra hagyja a beadást, és 0:00-kor adja be, az is késésnek számít, és ugyanúgy pontlevonás jár érte.
  - Mivel legalább 40%-ot, vagyis 12 pontot el kell érni egy-egy felvonásból, így ez matematikailag legfeljebb 12 nap késést tesz lehetővé (12\*(-1.5) = -18 pont) egy felvonásban, ha azt feltételezzük, hogy a beadott munka a beadáskor hibátlan, vagyis a 30 pontból jön le a 18, hogy abból aztán megmaradjon a min. 40%, vagyis 12 pont.
  - **Nem éri meg késni, főleg nem sokat. Gondolj bele:** _Sokkal_ egyszerűbb időben elkészíteni és beadni egy 12-18 pontos beadandót, mint az utolsó pillanatban megcsinálni közel 30 pontosra úgy, hogy az a rengeteg munka a levonások miatt kb. 12 pontot fog érni.
  - **A beadandókat nem lehet utólag javítani (csak a zh-t)**, ezért a késésre fokozottan ügyeljetek, mivel **könnyen elbukható a beadandón a tárgy, ha nem veszed komolyan!**
- Ha valaki _indokolt_ eset miatt nem tudja tartani a határidőt, akkor haladéktalanul keresse fel a gyakorlatvezetőjét, akivel ismertesse a problémáját, és _hitelt érdemlően igazolja_ is azt, hogy mi jött neki közbe! Ilyen egyedi esetekben lehetőség van a határidőtől a probléma súlyától függően eltérni az adott hallgatónál. **Ezzel a lehetőséggel ne éljetek vissza, az igazolatlan eseteket, mondvacsinált, kamu indokokat pedig azonnal elutasítjuk!**

## A munka tisztasága

- **Kérjük, hogy a saját érdekedben csak olyan munkát adj be, amit Te készítettél!**
- A "problémás" beadandók eredményes kiszűrése érdekében a beadott munkák szigorú, több lépcsőből álló plágiumellenőrzési folyamaton mennek keresztül, amely több automatizált gépi ciklusból és humán ellenőrzésből is áll. A csalásokat (konkrét példák: jelentős netről másolás, egyező beadandók, mások helyett leadott beadandók, stb) észre fogjuk venni.
- Nyilvánvaló esetekben ez kérdés nélkül azonnali következményekkel jár, gyanús esetekben pedig az érintett hallgatók felkérhetők szóbeli védésre, ahol teljesen véletlenszerűen belekérdezünk az alkalmazásba, annak logikájába és működésébe. Ezzel tökéletesen fel tudjuk mérni, hogy az illető tisztában van-e azzal, hogy mit adott le.
- Ha valaki becsületesen készíti el a beadandót, órai példákat használt, "rákeresett erre-arra a neten", megnézett pár stackoverflow, laracasts thread-et, akkor az itt leírtak miatt egyáltalán nem kell aggódnia.
- A beadott feladatnak tartalmaznia kell egy STATEMENT.md nevű fájlt, a következő tartalommal (értelemszerűen az adataidat írd bele):

  ```
  # Nyilatkozat

  Én, <NÉV> (Neptun kód: <NEPTUN KÓD>) kijelentem, hogy ezt a megoldást én küldtem be a Szerveroldali webprogramozás Laravel beadandó feladatához.
  A feladat beadásával elismerem, hogy tudomásul vettem a nyilatkozatban foglaltakat.

  - Kijelentem, hogy ez a megoldás a saját munkám.
  - Kijelentem, hogy nem másoltam vagy használtam harmadik féltől származó megoldásokat.
  - Kijelentem, hogy nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem azt közzé.
  - Tudomásul vettem, hogy az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be, az fegyelmi vétségnek számít.
  - Tudomásul vettem, hogy a fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
  ```

- Ha a nyilatkozat feltöltése elmarad, akkor pótolni kell egy újabb feltöltéssel, vagy a Canvasen komment formájában.
- **Amíg a hallgató nem nyilatkozott munkája tisztaságáról, a feladatára kapott értékelés (ha addig megtörtént az értékelés) nem érvényes, egészen addig, amíg a nyilatkozat pótlásra nem kerül! A nyilatkozat pótlásáról értesíteni kell az oktatót is, aki az értékelést végzi (a saját gyakorlatvezetőt).**

## Hasznos hivatkozások

Az alábbiakban adunk néhány hasznos hivatkozást, amiket érdemes szemügyre venni a beadandó elkészítésekor.

- [Idei órai alkalmazás](https://github.com/szerveroldali/2021-22-1/tree/main/esti_3_4_csut_19_30/laravel)
- [Tavalyi órai alkalmazás](https://github.com/totadavid95/szerveroldali-21-tavasz/tree/main/pentek/laravel/pentek)
- [Laravel nyelvi csomag - magyarosításhoz](https://github.com/Laravel-Lang/lang)
- Tantárgyi Laravel jegyzetek
  - [Kimenet generálása](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-01-kimenet)
  - [Bemeneti adatok, űrlapfeldolgozás](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-02-bemenet)
  - [Adattárolás, egyszerű modellek](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-03-adatt%C3%A1rol%C3%A1s)
  - [Relációk a modellek között](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-04-rel%C3%A1ci%C3%B3k)
  - [Hitelesítés és jogosultságkezelés](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-05-hiteles%C3%ADt%C3%A9s)
  - [GitHub-os Laravel jegyzet](https://github.com/totadavid95/szerveroldali-21-tavasz/blob/main/Laravel.md)
- Dokumentációk
  - [Laravel dokumentáció](https://laravel.com/docs)
    - [Blade direktívák](https://laravel.com/docs/8.x/blade)
    - [Resource Controllers](https://laravel.com/docs/8.x/controllers#resource-controllers)
    - [Validációs szabályok](https://laravel.com/docs/8.x/validation#available-validation-rules)
    - [Migrációknál elérhető mezőtípusok](https://laravel.com/docs/8.x/migrations#available-column-types)
  - [Laravel API dokumentáció](https://laravel.com/api/master/index.html)
  - [PHP dokumentáció](https://www.php.net/manual/en/)
  - [Bootstrap 4 dokumentáció](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- Programok, fejlesztői eszközök
  - [Automatikus PHP és Composer telepítő](https://github.com/totadavid95/PhpComposerInstaller)
  - [Visual Studio Code](https://code.visualstudio.com/)
    - [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
    - [Laravel Extension Pack](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-extension-pack)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
- További CSS framework tippek
  - [Fontawesome ikonkészlet](https://fontawesome.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Material Bootstrap](https://mdbootstrap.com/)
  - [Material UI, React-hez](https://material-ui.com/)
  - [Bulma](https://bulma.io/)
