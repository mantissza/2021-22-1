# Szerveroldali webprogramozás - REST API pótzárthelyi

_2022. január 10. 16:00-19:15 (3 óra kidolgozás + 15 perc beadás)_

Tartalom:

- [Szerveroldali webprogramozás - REST API pótzárthelyi](#szerveroldali-webprogramozás---rest-api-pótzárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos linkek](#hasznos-linkek)
  - [Kezdőcsomag](#kezdőcsomag)
  - [Feladatok](#feladatok)
    - [`1. feladat: Modellek és relációk (2 pont)`](#1-feladat-modellek-és-relációk-2-pont)
    - [`2. feladat: Seeder (2 pont)`](#2-feladat-seeder-2-pont)
    - [`3. feladat: GET /posts (2 pont)`](#3-feladat-get-posts-2-pont)
    - [`4. feladat: GET /posts/:id (2 pont)`](#4-feladat-get-postsid-2-pont)
    - [`5. feladat: POST /auth/login (2 pont)`](#5-feladat-post-authlogin-2-pont)
    - [`6. feladat: POST /posts (2 pont)`](#6-feladat-post-posts-2-pont)
    - [`7. feladat: PUT /posts (2 pont)`](#7-feladat-put-posts-2-pont)
    - [`8. feladat: DELETE /posts (2 pont)`](#8-feladat-delete-posts-2-pont)
    - [`9. feladat: POST /posts/:id/comments (2 pont)`](#9-feladat-post-postsidcomments-2-pont)
    - [`10. feladat: PUT /comments/:id (2 pont)`](#10-feladat-put-commentsid-2-pont)
    - [`11. feladat: GET /comments/:id/history (2 pont)`](#11-feladat-get-commentsidhistory-2-pont)
    - [`12. feladat: GET /comments/:id/reactions (3 pont)`](#12-feladat-get-commentsidreactions-3-pont)
    - [`13. feladat: POST /comments/:id/reaction (3 pont)`](#13-feladat-post-commentsidreaction-3-pont)
    - [`14. feladat: DELETE /comments/:id/reaction (2 pont)`](#14-feladat-delete-commentsidreaction-2-pont)

## Tudnivalók

- Kommunikáció
  - **A Teams csoport Általános csatornáján a zárthelyi egész ideje alatt lesz egy meeting! Erősen ajánlott, hogy ehhez csatlakozzatok, hiszen elsősorban ebben a meetingben válaszolunk a felmerülő kérdésekre, valamint az esetleges időközben felmerülő információkat is itt osztjuk meg veletek!**
  - Ha a zárthelyi közben valamilyen problémád, kérdésed adódik, akkor keresd az oktatókat a meetingben vagy privát üzenetben (Teams chaten).
- Időkeret
  - **A zárthelyi megoldására 3 óra áll rendelkezésre: *16:00-19:00*.**
  - Oszd be az idődet! Ha egy feladat nem megy, akkor inkább ugord át (legfeljebb később visszatérsz rá), és foglalkozz a többivel, hogy ne veszíts pontot olyan feladatból, amit meg tudnál csinálni!
- Beadás
  - **A beadásra további *15* perc áll rendelkezésre: *19:00-19:15*. Ez a +15 perc *ténylegesen* a beadásra van! *19:15* után a Canvas lezár, és további beadásra nincs lehetőség!**
  - Ha előbb végzel, természetesen 19:15-ig bármikor beadhatod a feladatot.
  - A feladatokat `node_modules` mappa nélkül kell becsomagolni egy .zip fájlba, amit a Canvas rendszerbe kell feltölteni!
  - **A dolgozat megfelelő és hiánytalan beadása a hallgató felelőssége.** Mivel a dolgozat végén külön 15 perces időkeretet adunk a feladat megfelelő, nyugodt körülmények közötti beadására, ebből kifolyólag ilyen ügyekben nem tudunk utólagos reklamációknak helyt adni. Tehát ha valaki a zárthelyi után jelzi, hogy egy vagy több fájlt nem adott be, akkor azt sajnos nem tudjuk elfogadni.
- Értékelés
  - A legutoljára beadott megoldás lesz értékelve.
  - **A zárthelyin legalább a pontok 40%-át, vagyis legalább 12 pontot kell elérni**, ez alatt a zárthelyi sikertelen.
  - Vannak részpontok.
  - **A pótzárthelyin nem lehet rontani a zárthelyi eredményéhez képest, csak javítani.** Ez azt jelenti, ha valaki egy adott témakörből (pl. REST API) megírja mindkét zárthelyit (a normált és a pótot is), akkor a jegyébe a kettő közül a jobbik eredményt fogjuk beszámítani. Azonban fontos, hogy ez a "jobbik eredmény" **legalább** 40%, vagyis 12 pont legyen, különben az illető nem teljesítette a tárgyat!
  - **Érvényes nyilatkozat (megfelelően kitöltött statement.txt) hiányában a kapott értékelés érvénytelen, vagyis 0 pont.**
  - Az elrontott, elfelejtett nyilatkozat utólag pótolható: Canvasen kommentben kell odaírni a feladathoz.
- Egyéb
  - A feladatokat Node.js környezetben, JavaScript nyelven kell megoldani, a tantárgy keretein belül tanult technológiák használatával!
  - Ajánlott a Node.js LTS verziójának a használata. Ha a gépedre már telepítve van a Node.js és telepített példány legalább 2 főverzióval le van maradva az aktuálisan letölthető legfrissebbhez képest, akkor érdemes lehet frissíteni.

## Hasznos linkek

- Dokumentációk
  - Sequelize:
    - [Sequelize dokumentáció](https://sequelize.org/master/)
    - [Model querying basics](https://sequelize.org/master/manual/model-querying-basics.html)
    - [Sequelize asszociációk](https://github.com/szerveroldali/2021-22-1/blob/main/SequelizeAssociations.md) (tantárgyi leírás)
  - Express:
    - [ExpressJS dokumentáció](https://expressjs.com/en/4x/api.html)
- Eszközök:
  - [Postman](https://www.postman.com/)
  - [Firecamp Chrome kiegészítő](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
- Gyakorlati anyagok:
  - [Tavalyi ZH mintamegoldása](https://github.com/szerveroldali/2021-22-1/tree/main/restapi_minta)
  - [Gyakorlati anyag](https://github.com/szerveroldali/2021-22-1/tree/main/esti_3_4_csut_19_30/restapi)

## Kezdőcsomag

Segítségképpen biztosítunk egy kezdőcsomagot a zárthelyihez. Csak telepíteni kell a csomagokat, és kezdheted is a fejlesztést.

- A kezdőcsomag elérhető ebben a GitHub repository-ban:
  - https://github.com/szerveroldali/restapi_kezdocsomag
  - Vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/restapi_kezdocsomag/archive/refs/heads/main.zip) (zip fájl)
- Automatikus tesztelő: `npm run test <FELADATOK SZÁMAI>`
  - Pl. 1. és 2. feladat tesztelése: `npm run test 1 2`
  - Minden feladat tesztelése: `npm run test`
- Zippelő: `npm run zip`

## Feladatok
Készíts egy REST API-t Node.js-ben, Express, Sequelize és SQLite3 segítségével, amelyben az alább részletezett feladatokat valósítod meg! A szerver a 4000-es porton fusson!

### `1. feladat: Modellek és relációk (2 pont)`

> :warning: **A modelleket és a seedert odaadjuk obfuszkált formában (a Teams meeting-be feltöltött zip fájlban, amelyikben a tesztelő is van), így az első két feladat (modellek és relációk, ill. seeder) a dolgozat végére halasztható vagy akár ki is hagyható. Értelemszerűen a kihagyott feladatokra nem jár pont! Ha valamelyiket kihagyod, ott az obfuszkált verziókat add be!**

Sequelize CLI segítségével hozd létre a következő modelleket! Az `id`, `createdAt`, `updatedAt` a Sequelize ORM szempontjából alapértelmezett mezők, így ezeket a feladat nem specifikálja. Alapesetben egyik mező értéke sem lehet null, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migration minden mezőjére 
```js
allowNull: false
```
van érvényben, kivéve ott, ahol ezt a feladat másképp nem kéri!

A modellek az alábbiak:

`User`: felhasználó
- `id`
- `username`: string, unique (a felhasználónév egyedi)
- `createdAt`
- `updatedAt`

`Post`: bejegyzés
- `id`
- `text`: text
- `commentsEnabled`: boolean
- `UserId`: integer
- `createdAt`
- `updatedAt`

`Comment`: bejegyzéshez fűzött hozzászólás
- `id`
- `text`: text
- `PostId`: integer
- `UserId`: integer
- `createdAt`
- `updatedAt`

`History`: hozzászólás szerkesztési előzményei
- `id`
- `text`: text
- `CommentId`: integer
- `createdAt`
- `updatedAt`

`Reaction`: hozzászólásra adott reakció
- `id`
- `type`: enum, lehetséges értékei: LIKE,LOVE,HAHA,WOW,SAD,ANGRY
  - Vizuálisan:
   
    <img src="https://i.imgur.com/2g84kjg.jpg" alt="drawing" width="300"/>
- `CommentId`: integer
- `UserId`: integer
- `createdAt`
- `updatedAt`

A fenti modellek közötti relációk pedig a következőképpen alakulnak:

- `User` 1-N `Post`
- `User` 1-N `Comment`
- `User` 1-N `Reaction`
- `Post` 1-N `Comment`
- `Comment` 1-N `Reaction`
- `Comment` 1-N `History`

### `2. feladat: Seeder (2 pont)`

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal! A seeder minél több esetet fedjen le! A megoldás akkor számít teljes értékűnek, ha a seeder minden lehetséges esethez készít néhány adatot, és a relációkat is figyelembe veszi. A seedert az automata tesztelő nem értékeli, a gyakorlatvezető fogja kézzel javítani.

### `3. feladat: GET /posts (2 pont)`

Lekéri az összes bejegyzést a hozzájuk tartozó hozzászólásokkal együtt, továbbá a hozzászólásokhoz is megadja a rájuk adott reakciókat. A reakciókhoz csak a `UserId` és a `type` mezőket adjuk meg.

- Minta kérés: `GET http://localhost:4000/posts`
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  [
    {
      "id": 1,
      "text": "Bejegyzés szövege",
      "commentsEnabled": true,
      "UserId": 18,
      "createdAt": "2022-01-07T14:58:27.752Z",
      "updatedAt": "2022-01-07T14:58:27.752Z",
      "Comments": [
        {
          "id": 4,
          "text": "Komment szövege",
          "PostId": 1,
          "UserId": 9,
          "createdAt": "2022-01-07T14:58:27.953Z",
          "updatedAt": "2022-01-07T14:58:27.953Z",
          "Reactions": [
            {
              "UserId": 12,
              "type": "ANGRY"
            },
            {
              "UserId": 8,
              "type": "HAHA"
            }
          ]
        }
      ]
    }
  ]
  ```

### `4. feladat: GET /posts/:id (2 pont)`

Lekér egy adott bejegyzést a hozzá tartozó hozzászólásokkal együtt, továbbá a hozzászólásokhoz is megadja a rájuk adott reakciókat. A reakciókhoz csak a `UserId` és a `type` mezőket adjuk meg.

- Minta kérés: `GET http://localhost:4000/posts/1`
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "id": 1,
    "text": "Bejegyzés szövege",
    "commentsEnabled": true,
    "UserId": 18,
    "createdAt": "2022-01-07T14:58:27.752Z",
    "updatedAt": "2022-01-07T14:58:27.752Z",
    "Comments": [
      {
        "id": 4,
        "text": "Komment szövege",
        "PostId": 1,
        "UserId": 9,
        "createdAt": "2022-01-07T14:58:27.953Z",
        "updatedAt": "2022-01-07T14:58:27.953Z",
        "Reactions": [
          {
            "UserId": 12,
            "type": "ANGRY"
          },
          {
            "UserId": 8,
            "type": "HAHA"
          }
        ]
      }
    ]
  }
  ```

### `5. feladat: POST /auth/login (2 pont)`

Hitelesítés. Nincs semmilyen jelszókezelés, csak a felhasználónevet kell felküldeni a request body-ban. Ha a megadott felhasználónévvel létezik fiók az adatbázisban, azt sikeres loginnak vesszük és kiállítjuk a tokent. A user-t bele kell rakni a token payload-jába, továbbá a válaszban is vissza kell adni! A token aláírásához `HS256` algoritmust használj! A titkosító kulcs értéke `"secret"` legyen!

- Minta kérés: `POST http://localhost:4000/auth/login`
  ```json
  {
    "username": "user1"
  }
  ```

- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "token": "ey...",
    "user": {
      "id": 1,
      "username": "user1",
      "createdAt": "2022-01-10T...",
      "updatedAt": "2022-01-10T..."
    }
  }
  ```
- Válasz hiányos request body esetén: `400 Bad Request`
  ```json
  {
    "message": "Nem adtál meg felhasználónevet!"
  }
  ```
- Válasz nem létező felhasználó esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott felhasználónévvel nem létezik felhasználó!"
  }
  ```

Tipp: A token ellenőrizhető a https://jwt.io/ oldalon.

### `6. feladat: POST /posts (2 pont)`

Új bejegyzés létrehozása. **A végpont hitelesített**, hiszen a szerző a bejelentkezett felhasználó lesz.

- Minta kérés: `POST http://localhost:4000/posts`
  ```json
  {
    "text": "Bejegyzés szövege",
    "commentsEnabled": true
  }
  ```
  - Hitelesített végpontokra a következő fejléccel kell küldeni a kérést:
    ```
    Authorization: Bearer <token>
    ```
    Firecamp-ben ehhez az Auths fül alatt válaszd a "No Auth" felirattal induló menüből a Bearer-t. Ilyenkor elég csak a tokent megadni, és a fenti fejlécet fogja elküldeni:

    ![Bearer Firecamp](https://i.imgur.com/qduwew7.png)

- Válasz megfelelő kérés esetén: `201 OK`
  ```json
  {
    "id": 30,
    "text": "Bejegyzés szövege",
    "commentsEnabled": true,
    "updatedAt": "2022-01-08T10:09:55.509Z",
    "createdAt": "2022-01-08T10:09:55.509Z"
  }
  ```
- Válasz hibás kérés esetén (pl. validációs hiba): `400 Bad Request`
  ```json
  {
    "message": "<hibaüzenet>"
  }
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`


`Tipp #1`: A `server.js`-ben van egy végső hibakezelő, ami alapértelmezés szerint 500-as hibát ad vissza válaszként. A validációs hibák ezért általánosan kezelhetők úgy, hogy ezt a hibakezelőt kibővíted a következő módon:

```js
const { ValidationError } = require("sequelize");
// ...
app.use(async (err, req, res, next) => {
  // ...
  if (err instanceof ValidationError) {
    // Ha Sequelize-os validációs hiba történt, 
    // akkor milyen választ adjunk?
    return res.status(400).send({
      // message: ...
    });
  }
  // Ezen a ponton más típusú hibákat ugyanúgy 
  // 500-as válasszal fog kezelni
  // ...
});  
```

`Tipp #2`: Az auth middleware a token payload-ját berakja a `req.user`-be. A payload-ba pedig az előző feladatban beraktad a user adatait.

### `7. feladat: PUT /posts (2 pont)`

Bejegyzés módosítása. **A végpont hitelesített**, hiszen a bejegyzést csak a szerző módosíthatja. Nem muszáj minden mezőt felküldeni, elég csak azokat, amiket frissíteni szeretnénk, a többinek változatlan marad majd az értéke. Például az alábbi mintában csak a `text`-et küldjük fel, vagyis a `disabledComments` nem fog megváltozni.

- Minta kérés: `PUT http://localhost:4000/posts/2`
  ```json
  {
    "text": "Bejegyzés módosított szövege",
  }
  ```
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "id": 2,
    "text": "Bejegyzés módosított szövege",
    "commentsEnabled": false,
    "UserId": 1,
    "createdAt": "2022-01-08T10:14:03.012Z",
    "updatedAt": "2022-01-08T10:23:07.486Z"
  }
  ```
- Válasz illetéktelen módosítás esetén: `403 Forbidden`
  ```json
  {
    "message": "Csak a saját bejegyzésedet szerkesztheted!"
  }
  ```
- Válasz hibás kérés esetén (pl. validációs hiba): `400 Bad Request`
  ```json
  {
    "message": "<hibaüzenet>"
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`

### `8. feladat: DELETE /posts (2 pont)`

Bejegyzés törlése. **A végpont hitelesített**, hiszen a bejegyzést csak a szerző törölheti.

- Minta kérés: `DELETE http://localhost:4000/posts/2`

- Válasz megfelelő kérés esetén: `200 OK`
- Válasz illetéktelen módosítás esetén: `403 Forbidden`
  ```json
  {
    "message": "Csak a saját bejegyzésedet törölheted!"
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`

### `9. feladat: POST /posts/:id/comments (2 pont)`

Hozzászólás egy bejegyzéshez. **A végpont hitelesített**, hiszen a hozzászólást a felhasználóhoz rendeljük, mint szerzőhöz. Mivel a hozzászólások korábbi szövegeit megőrizzük a History-ban, ezért az itt megadott szöveg a hozzászólás létrehozását követően rögtön kerüljön be a History-ba is!

- Minta kérés: `POST http://localhost:4000/posts/2/comments`
  ```json
  {
    "text": "Hozzászólás szövege",
  }
  ```
- Válasz megfelelő kérés esetén: `201 Created`
  ```json
  {
    "id": 134,
    "text": "Hozzászólás szövege",
    "UserId": 1,
    "PostId": 3,
    "updatedAt": "2022-01-08T10:50:00.772Z",
    "createdAt": "2022-01-08T10:50:00.772Z"
  }
  ```
- Válasz illetéktelen művelet esetén: `403 Forbidden`
  ```json
  {
    "message": "Le van tiltva a hozzászólás lehetősége!"
  }
  ```
- Válasz hibás kérés esetén (pl. validációs hiba): `400 Bad Request`
  ```json
  {
    "message": "<hibaüzenet>"
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`

### `10. feladat: PUT /comments/:id (2 pont)`

Hozzászólás szerkesztése. **A végpont hitelesített**, hiszen a hozzászólást csak a szerző szerkesztheti. Mivel a hozzászólások korábbi szövegeit megőrizzük a History-ban, ezért az itt megadott szöveg a hozzászólás módosítását követően rögtön kerüljön be a History-ba is! A hozzászólás akkor is módosítható, ha a bejegyzéshez időközben letiltásra kerültek a hozzászólások.

- Minta kérés: `PUT http://localhost:4000/comments/134`
  ```json
  {
    "text": "Hozzászólás módosított szövege",
  }
  ```
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "id": 134,
    "text": "Hozzászólás módosított szövege",
    "PostId": 3,
    "UserId": 1,
    "createdAt": "2022-01-08T10:50:00.772Z",
    "updatedAt": "2022-01-08T10:56:12.399Z"
  }
  ```
- Válasz nem létező entitás esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott ID-vel nem létezik komment!"
  }
  ```
- Válasz illetéktelen művelet esetén: `403 Forbidden`
  ```json
  {
    "message": "Csak a saját hozzászólásodat szerkesztheted!"
  }
  ```
- Válasz hibás kérés esetén (pl. validációs hiba): `400 Bad Request`
  ```json
  {
    "message": "<hibaüzenet>"
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`

### `11. feladat: GET /comments/:id/history (2 pont)`

Megadja a hozzászólás szerkesztési előzményeit. Amikor a hozzászólás létrejön vagy módosul, a szövege (`text` mező) mindig eltárolásra kerül a history-ba is, ezáltal követhető, hogy egy kommentnek mik voltak a korábbi szövegei, és azt mikor rendelték hozzá.

- Minta kérés: GET http://localhost:4000/comments/134/history
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  [
    {
        "text": "Hozzászólás szövege",
        "date": "2022-01-08 10:50:00.792 +00:00"
    },
    {
        "text": "Hozzászólás módosított szövege",
        "date": "2022-01-08 10:56:12.417 +00:00"
    }
  ]
  ```
- Válasz nem létező entitás esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott ID-vel nem létezik komment!"
  }
  ```

### `12. feladat: GET /comments/:id/reactions (3 pont)`

A hozzászólásra adott reakciók statisztikája. Először az `all` property-ben megadja, hogy mennyi hozzászólásra adott összes reakciók száma. A `details` property-hez pedig egy olyan object-et rendel, amely kategóriák szerinti bontásban is megmutatja, melyik típusú reakcióból mennyi van az adott hozzászóláson.

- Minta kérés: `GET http://localhost:4000/comments/10/reactions`
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "all": 9,
    "details": {
        "like": 0,
        "love": 0,
        "haha": 5,
        "wow": 0,
        "sad": 1,
        "angry": 3
    }
  }
  ```
- Válasz nem létező entitás esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott ID-vel nem létezik komment!"
  }
  ```

### `13. feladat: POST /comments/:id/reaction (3 pont)`

Ezen a végponton keresztül lehet reagálni egy hozzászólásra, vagy a korábban adott reakciót módosítani. Reakció akkor is adható/módosítható, ha a bejegyzéshez időközben letiltásra kerültek a hozzászólások. **A végpont hitelesített**, hiszen a reakciók a felhasználókhoz vannak rendelve. Ha a request-ből kinyert felhasználó korábban már reagált a megadott hozzászólásra, akkor elég a reakcióját módosítani (update), egyébként pedig új reakciót kell létrehozni (create). Saját kommentre is lehet reagálni.

- Minta kérés: `POST http://localhost:4000/comments/10/reaction`
  ```json
  {
    "type": "LIKE"
  }
  ```
- Válasz megfelelő kérés esetén:
  - Ha új reakciót kellett létrehoni: `201 Created`
  - Ha meglévő reakciót kellett módosítani: `200 OK`
    ```json
    {
      "id": 50,
      "type": "LIKE",
      "CommentId": 10,
      "UserId": 1,
      "createdAt": "2022-01-08T10:14:05.608Z",
      "updatedAt": "2022-01-08T11:10:36.312Z"
    }
    ```
- Válasz nem létező entitás esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott ID-vel nem létezik komment!"
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 Unauthorized`

### `14. feladat: DELETE /comments/:id/reaction (2 pont)`

A megadott hozzászólásra adott reakció visszavonása (törlése). **A végpont hitelesített**, hiszen tudnunk kell, hogy melyik felhasználó reakciójáról van szó.

- Minta kérés: `DELETE http://localhost:4000/comments/10/reaction`
- Válasz megfelelő kérés esetén: `200 OK`
- Válasz nem létező entitás esetén: `404 Not Found`
  ```json
  {
    "message": "A megadott ID-vel nem létezik komment!"
  }
  ```
  ```json
  {
    "message": "Még nem reagáltál erre a kommentre!"
  }
  ```