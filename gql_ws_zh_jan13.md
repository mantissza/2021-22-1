# Szerveroldali webprogramozás - GraphQL, Websocket pótzárthelyi

_2022. január 13. 16:00-19:15 (3 óra kidolgozás + 15 perc beadás)_

Tartalom:
- [Szerveroldali webprogramozás - GraphQL, Websocket pótzárthelyi](#szerveroldali-webprogramozás---graphql-websocket-pótzárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos linkek](#hasznos-linkek)
  - [Kezdőcsomag](#kezdőcsomag)
  - [GraphQL (15 pont)](#graphql-15-pont)
    - [Modellek és relációk](#modellek-és-relációk)
    - [Típusdefiníció](#típusdefiníció)
    - [1. feladat: ```info``` (1 pont)](#1-feladat-info-1-pont)
    - [2. feladat ```availableBooks``` (4 pont)](#2-feladat-availablebooks-4-pont)
    - [3. feladat ```userLoans``` (3 pont)](#3-feladat-userloans-3-pont)
    - [4. feladat ```bookLend``` (4 pont)](#4-feladat-booklend-4-pont)
    - [5. feladat ```bookReturn``` (3 pont)](#5-feladat-bookreturn-3-pont)
  - [Websocket/Socket.io (15 pont)](#websocketsocketio-15-pont)
    - [1. feladat: `list-rooms` (1 pont)](#1-feladat-list-rooms-1-pont)
    - [2. feladat: `create-room` (2 pont)](#2-feladat-create-room-2-pont)
    - [3. feladat: `join-room` (1 pont)](#3-feladat-join-room-1-pont)
    - [4. feladat: `mute-client` (5 pont)](#4-feladat-mute-client-5-pont)
    - [5. feladat: `send-message` (6 pont)](#5-feladat-send-message-6-pont)

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
  - A GraphQL-re vagy Websocket-re **nincs** külön-külön minimumpont, összesen kell elérni legalább a 12 pontot, ami akár úgy is összetevődhet, hogy a GraphQL feladat 12 pontos, a Websocket pedig 0 pontos.
  - Vannak részpontok.
  - **A pótzárthelyin nem lehet rontani a zárthelyi eredményéhez képest, csak javítani.** Ez azt jelenti, ha valaki egy adott témakörből (pl. REST API) megírja mindkét zárthelyit (a normált és a pótot is), akkor a jegyébe a kettő közül a jobbik eredményt fogjuk beszámítani. Azonban fontos, hogy ez a "jobbik eredmény" legalább 40% (vagyis legalább 12 pont) legyen, különben az illető nem teljesítette a tárgyat, hiszen az adott témakörből nem érte el a minimális 40%-ot, még a jobb eredménnyel sem!
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
  - GraphQL:
    - [GraphQL dokumentáció](https://graphql.org/learn/)
    - [GraphQL scalars](https://www.graphql-scalars.dev/docs) (a kezdőcsomag tartalmazza)
  - Socket.IO:
    - [Socket.IO dokumentáció](https://socket.io/docs)
    - [Socket.IO szobák működése](https://socket.io/docs/v4/rooms/)
    - [Socket.IO emit cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/)
- Eszközök:
  - [Postman](https://www.postman.com/)
  - [Firecamp Chrome kiegészítő](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
- Gyakorlati anyagok:
  - [Tavalyi ZH mintamegoldása](https://github.com/szerveroldali/2021-22-1/tree/main/graphql_websocket_minta)
  - [GraphQL gyakorlati anyag](https://github.com/szerveroldali/2021-22-1/tree/main/esti_3_4_csut_19_30/restapi/graphql)
  - [Socket.IO gyakorlati anyag](https://github.com/szerveroldali/2021-22-1/tree/main/esti_3_4_csut_19_30/websocket)

## Kezdőcsomag
Segítségképpen biztosítunk egy kezdőcsomagot a zárthelyihez. Csak telepíteni kell a csomagokat, és kezdheted is a fejlesztést.

- A kezdőcsomag elérhető itt:
  - https://github.com/szerveroldali/graphql_websocket_kezdocsomag
- Automatikus tesztelő (`gql:` és `ws:` prefix): `npm run gql:test <FELADATOK SZÁMAI>`
  - Pl. 1. és 2. feladat tesztelése: `npm run gql:test 1 2`
  - Minden feladat tesztelése: `npm run gql:test`
- Zippelő: `npm run zip`

## GraphQL (15 pont)

A feladatot a kezdőcsomagon belül a `graphql/graphql/typedefs.gql`, `graphql/graphql/resolvers.js` fájlokba kell kidolgozni.

A kezdőcsomag két grafikus felületet is biztosít a GraphQL-hez, ezek az alábbi linkeken érhetők el:
  - [localhost:4000/graphql](http://localhost:4000/graphql): GraphiQL
  - [localhost:4000/playground](http://localhost:4000/playground): GraphQL Playground (ajánlott)

### Modellek és relációk

Az alábbi modelleket készen kapod, ami tartalmazza a következőket: migration, model, seeder. **Tehát nem neked kell őket megírni, neked csak annyi a feladatod, hogy a készen kapott fájlokat bemásolod és inicializálod az adatbázist (`npm run gql:db`), hogy használni tudd!** Az adatokat lokális SQLite adatbázisban kell tárolni.

Az `id`, `createdAt`, `updatedAt` a Sequelize ORM szempontjából alapértelmezett mezők, így ezeket a feladat nem specifikálja. Alapesetben egyik mező értéke sem lehet null, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migration minden mezőjére
```js
allowNull: false
```
van érvényben, kivéve ott, ahol ezt a feladat másképp nem kéri!

A modellek az alábbiak:

- User: felhasználó
  - `id`: integer, autoIncrement, primaryKey
  - `name`: string
  - `email`: string, unique
  - `password`: string
  - `MembershipId`: integer, nullable
  - `createdAt`: date
  - `updatedAt`: date
- `Book`: könyv
  - `id`: integer, autoIncrement, primaryKey
  - `author`: string, nullable
  - `title`: string, nullable
  - `description`: string, nullable
  - `numberOfCopies`: integer, nullable
  - `createdAt`: date
  - `updatedAt`: date
- `Loan`: kölcsönzés
  - `id`: integer, autoIncrement, primaryKey
  - `UserId`: integer
  - `BookId`: integer
  - `expire`: date
  - `createdAt`: date
  - `updatedAt`: date
- `Membership`: tagság
  - `id`: integer, autoIncrement, primaryKey
  - `name`: string
  - `maxLoans`: integer
  - `fine`: integer
  - `createdAt`: date
  - `updatedAt`: date

A fenti modellek közötti relációk pedig a következőképpen alakulnak:

- `User` 1-N `Loan`
- `Membership` 1-N `User`
- `Book` 1-N `Loan`

### Típusdefiníció

Adott az alábbi GraphQL típusdefiníció. Másold be a kezdőcsomagba, ezt követően pedig implementálod a szükséges műveleteket. A műveletek implementálása során a típusdefiníciót értelemszerűen ki kell egészíteni, hiszen az alábbi csak egy kezdeti állapot.

```graphql
type Query {
    info: InfoResult!
    availableBooks: [availableBookResult]
    userLoans(userId: Int!): [userLoanResult]
}

type Mutation {
    bookLend(userId: Int!, bookId: Int!): Date!
    bookReturn(userId: Int!, bookId: Int!): Int!
}

type availableBookResult {
    book: Book!
    numberOfAvailableCopies: Int!
}

type userLoanResult {
    book: Book
    expire: Date
    fine: Int
}

type InfoResult {
    name: String!
    neptun: String!
    email: String!
}

# Tagsági szint
type Membership {
    id: ID!
    name: String!    # A tagsági szint neve
    maxLoans: Int!   # Maximálisan kölcsönözhető könyvek száma
    fine: Int!       # Késedelmes visszaadás esetén a napi birság összege
    createdAt: Date!
    updatedAt: Date!
}

# Felhasználó
type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!

    # Asszociációk
    membership: Membership!
}

# Könyv
type Book {
    id: ID!
    author: String!      # A könyv szerzője
    title: String!       # A könyv címe
    description: String! # A könyv fülszövege (leírása)
    numberOfCopies: Int! # Példányszám, a könyvtár ennyi példánnyal rendelkezik ebből a könyvből
    createdAt: Date!
    updatedAt: Date!
}

# Kölcsönzések
type Loan {
    id: ID!
    expire: Date!    # A kölcsönzés lejárati dátuma, ezt követően napi bírságot kell fizetni a késedelmes visszaadásért
    createdAt: Date!
    updatedAt: Date!

    # Asszociációk
    user: User!
    book: Book!
}
```

### 1. feladat: ```info``` (1 pont)

**Query:** Írasd ki a nevedet, neptun kódodat és az egyetemi email címedet!

**Kérés:**
```graphql
query {
  info {
    name
    neptun
    email
  }
}
```
**Minta válasz:** (a saját adataiddal)
```json
{
  "data": {
    "info": {
      "name": "Németh Tamás",
      "neptun": "LX12AG",
      "email": "tamasnemeth@student.elte.hu"
    }
  }
}
```

### 2. feladat ```availableBooks``` (4 pont)

**Query:** Összes könyv lekérése, az elérhető (tehát ki nem vett) példányok számával.

**Kérés:**
```graphql
query {
  availableBooks {
    book {
      title
      numberOfCopies
    }
    numberOfAvailableCopies
  }
}
```
**Minta válasz:**
```json
{
  "data": {
    "availableBooks": [
      {
        "book": {
          "title": "qui",
          "numberOfCopies": 16
        },
        "numberOfAvailableCopies": 5
      },
      {
        "book": {
          "title": "ut dignissimos",
          "numberOfCopies": 0
        },
        "numberOfAvailableCopies": 0
      },
      {
        "book": {
          "title": "recusandae harum distinctio",
          "numberOfCopies": 7
        },
        "numberOfAvailableCopies": 0
      },
      {...}
    ]
  }
}
```

### 3. feladat ```userLoans``` (3 pont)

**Query:** Egy adott felhasználó által kikölcsönzött könyvek megjelenítése, a kölcsönzés lejáratának idejével és a mai napig fizetendő bírság összegével (ha még nem járt le a kölcsönzés, akkor a ```fine``` legyen 0).

Ha a ```userId``` nem létezik, dobj hibát!

A napi birság összegét a felhasználóhoz tartozó Membership-ből tudod kinyerni (```Membership.fine```)!

Tipp: Két dátum között eltelt nap meghatározásához az alábbi segédfüggvény használható:

```js
/**
 * Kiszámítja a két dátum között eltelt időt.
 *
 * @param {String | Date} firstDate A kölcsönzés lejárati dátuma.
 * @param {String | Date} secondDate Alapértelmezetten az aktuális időpont.
 * @returns {Integer} A két dátum között eltelt napok száma. Értéke negatív is lehet!
 */
function daysBetweenDates(firstDate, secondDate = new Date()) {
    return Math.round((new Date(firstDate).setHours(12,0,0,0) - new Date(secondDate).setHours(12,0,0,0)) / (1000*3600*24));
}
```

**Kérés:**
```graphql
query {
  userLoans(userId: 2) {
    expire
    fine
    book {
      author
      title
    }
  }
}
```
**Minta válasz:** *Tfh.:* aktuális dátum: **2021-12-11**, felhasználó tagsága alapján a napi bírság: **50**
``` json
{
  "data": {
    "userLoans": [
      {
        "book": {
          "author": "Miss Cora Wilkinson",
          "title": "magni nam esse"
        },
        "expire": "2021-12-09",
        "fine": 100
      },
      {
        "book": {
          "author": "Eileen Rippin",
          "title": "quas nostrum rerum"
        },
        "expire": "2021-12-08",
        "fine": 150
      },
      {
        "book": {
          "author": "Kurt Nitzsche",
          "title": "quia porro"
        },
        "expire": "2021-12-15",
        "fine": 0
      }
    ]
  }
}
```

### 4. feladat ```bookLend``` (4 pont)

**Mutation:** Egy könyv kikölcsönzése. A felhasználó és a könyv id-ját paraméteresen adjuk át, sikeres kölcsönzés esetén a visszavétel határidejét kapjuk meg. A határidő mindig az aktuális napot követő **14 nap**.

Tipp: Egy adott időponthoz a következő segédfüggvénnyel lehet hozzáadni tetszőleges napot.
```js
/**
 * Egy dátumhoz a paraméterben megadott napok számát adja hozzá.
 *
 * @param {Integer} days A hozzáadandó napok száma.
 * @param {String | Date} date A kiindulási dátum, melyhez a napokat hozzá akarjuk adni. Alapértelmezetten az aktuális időpont.
 * @returns {Date} A megadott napszámmal későbbi dátum.
 */
function addDays(days, date = new Date()) {
    return new Date(new Date(date).setHours(12,0,0,0) + (1000*3600*24*days));
}
```

Validáció:
- Ellenőrizd, hogy a megadott ```userId``` és ```bookId``` helyesek-e, ha valamelyik rekord nem létezik, dobj értelmes hibát!
- Ellenőrizd, hogy a felhasználó elérte-e már a tagsági szintje alapján (```Membership.maxLoans```) maximális egyidejű kölcsönzések számát. Ha igen, akkor dobj értelmes hibát!
- Ellenőrizd, hogy van-e szabad példány a kikölcsönözni kívánt könyvből (```Book.numberOfCopies``` – ```[*már kikölcsönzött példányok száma*]```)! Ha nincs, dobj értelmes hibát!

Ha nem került dobásra hiba, akkor vegyél fel egy új rekordot a ```Loans``` táblába a megfelelő adatokkal és add vissza a visszahozási határidőt!

**Kérés:**
```graphql
mutation {
  bookLend(userId: 1, bookId: 2)
}
```
**Minta válasz:** *Tfh.:* az aktuális dátum: **2021-12-11**
``` json
{
  "data": {
    "bookLend": "2021-12-25"
  }
}
```

### 5. feladat ```bookReturn``` (3 pont)

**Mutation:** Egy könyv visszavétele. A felhasználó és a könyv id-ja paraméteresen kerül átadásra, sikeres visszavétel esetén a késedelmi birság összegét add meg! Ha időben lett visszaadva, térj vissza 0-ával!

Validáció:
- Ellenőrizd, hogy a megadott ```userId``` és ```bookId``` helyesek-e, ha valamelyik rekord nem létezik, dobj értelmes hibát!
- Ellenőrizd, hogy a megadott felhasználó kikölcsönözte-e a megadott könyvet (tartozik-e rekord a ```Loans``` táblában a megadott ```userId``` és ```bookId``` pároshoz)! Ha nem, dobj értelmes hibát!

Ha nem került dobásra hiba, akkor töröld a megfelelő rekordot a ```Loans``` táblából és add vissza a késedelmes visszavétel birságának összegét (napi birság díja a felhasználóhoz tartozó: ```Membership.fine```). Ha a visszavétel  nem volt késedelmes, térj vissza 0-ával!

**Kérés:**
```graphql
mutation {
  bookReturn(userId: 10, bookId: 13)
}
```
**Minta válasz:**
``` json
{
  "data": {
    "bookReturn": 200
  }
}
```

## Websocket/Socket.io (15 pont)

A feladatod egy chat elkészítése. A klienseknek legyen lehetősége belépni chatszobákba, ahol üzenetet tudnak küldeni a többi tagnak. Egy kliens saját szobát is csinálhat, ahová más kliensek csatlakozhatnak. Ha valaki létrehoz egy szobát, automatikusan a saját szobája adminjává válik, és jogában áll lenémítani tagokat, így ők onnantól kezdve nem írhatnak a többieknek abban a szobában.

Az adatokat a szerver memóriájában kell tárolni, az alábbi minta szerint:
```js
let db = {
    rooms: {
        room1: {
            admin: "socket1",
            members: ["socket1", "socket2", "socket3"],
            muted: ["socket2"],
            messages: [
                { timestamp: 123456789, client: "socket1", message: "sziasztok" },
                { timestamp: 123456789, client: "socket3", message: "hali" },
            ],
        },
        "Másik szoba": {
            admin: "socket2",
            members: ["socket2"],
            muted: [],
            messages: [{ timestamp: 123456789, client: "socket2", message: "foreveralone" }],
        },
    },
};
```

**Ezekre figyelj, hogy a tesztelő működjön:**
- *Az adatokat a `db`-be tárold és onnan is olvasd ki.*
- *A fenti példa elnevezéseit és felépítését kövesd. Pl: a `muted` maradjon `muted`, NE legyen pl. `mutedMembers`!*
- *A végpontoknak két paramétere legyen, ahogy gyakorlatokon tanultuk: `data` és `ack`, ahol a `data` egy objektum, ami tartalmazza az összes bemenő adatot.*
- *Pontosan kövesd a feladatokban megadott hibaüzeneteket.*

A feladatot a kezdőcsomagon belül a `websocket/events.js` fájlba kell kidolgozni.

### 1. feladat: `list-rooms` (1 pont)
  - Elérhető chat szobák listázása
  - Paraméterek: -
  - Válasz (acknowledgement):
    - Jó esetben: `{ status: 'ok', rooms: ['room1', 'room2', ...] }`
    - Hiba esetén: `{ status: 'error', message: '<hibaüzenet>'}`

### 2. feladat: `create-room` (2 pont)
  - Szoba létrehozása. Ilyenkor aki létrehozza a szobát, automatikusan csatlakozik hozzá, illetve az adminjává is válik. A kliens csatlakozását és admin jogát az adatbázisban le kell tárolni, továbbá SocketIO szinten is hozzá kell őt adni a szobához.
  - Paraméterek
    - `room`: a létrehozandó szoba neve
  - Válasz (acknowledgement):
    - Jó esetben: `{ status: 'ok' }`
    - Hiba esetén:
      - Hiányzó, rossz paraméter: `{ status: 'error', message: '<hibaüzenet>'}`
      - A megadott névvel már létezik szoba: `{ status: 'error', message: 'This name is already taken!'}`

### 3. feladat: `join-room` (1 pont)
  - Csatlakozás egy chatszobához. A kliens csatlakozását az adatbázisban is le kell tárolni, továbbá SocketIO szinten is hozzá kell őt adni a szobához.
  - Paraméterek
    - `room`: a szoba neve, amihez csatlakozni szeretnénk
  - Válasz (acknowledgement):
    - Jó esetben: `{ status: 'ok' }`
    - Hiba esetén:
      - Hiányzó, rossz paraméter: `{ status: 'error', message: '<hibaüzenet>'}`
      - Nem létező szoba: `{ status: 'error', message: 'No such room in our system!'}`
      - A kliens már a szoba tagja: `{ status: 'error', message: 'You are already subscribed to this room!'}`

### 4. feladat: `mute-client` (5 pont)
  - Az adminnak legyen lehetősége lenémítani egy klienst, aki az ő szobájában van.
  - Paraméterek
    - `room`: a szoba neve, amelyben némítani szeretnénk
    - `clientId`: a némítandó kliens SocketIO azonosítója
    - `reason`: a némítás oka (opcionális)
  - Válasz (acknowledgement):
    - Jó esetben:
      - `{ status: 'ok' }`
      - Továbbá a lenémított kliensnek el kell küldeni a `muted` üzenetet, a következő adatokkal (minta):
        - `{ room: 'room1', admin: 'socket1', reason: 'káromkodtál' }`
        - Ha nem volt `reason` megadva, az értéke legyen `"Nincs indok"`
    - Hiba esetén:
      - Hiányzó, rossz paraméter: `{ status: 'error', message: '<hibaüzenet>'}`
      - Nem létező szoba: `{ status: 'error', message: 'No such room in our system!'}`
      - A kliens nem a szoba tagja: `{ status: 'error', message: 'You are not subscribed to this room!'}`
      - A kliens nem admin a szobában: `{ status: 'error', message: 'You have no power here, Gandalf the Grey!'}`
      - A kliens saját magát akarja némítani: `{ status: 'error', message: 'You can't mute yourself!'}`
      - A célpont nem tagja a szobának: `{ status: 'error', message: 'The target is not a member of the room!'}`
      - A célpont már némítva van: `{ status: 'error', message: 'The target is already muted!'}`

### 5. feladat: `send-message` (6 pont)
  - Üzenet küldése a chat szoba tagjainak, ha nem vagyunk némítva.
  - Paraméterek
    - `room`: a szoba neve, amelyben üzenni szeretnénk
    - `message`: üzenet tartalma
  - Válasz (acknowledgement):
    - Jó esetben:
      - `{ status: 'ok' }`
      - Továbbá a szobában lévő összes kliensnél (de csak náluk) `message-received` eseményt kell kiváltani, a következő adatokkal (minta):
        - `{ room: 'room1', timestamp: 123456789, client: 'socket1', message: 'sziasztok' }`
    - Hiba esetén:
      - Hiányzó, rossz paraméter: `{ status: 'error', message: '<hibaüzenet>'}`
      - Nem létező szoba: `{ status: 'error', message: 'No such room in our system!'}`
      - A kliens nem a szoba tagja: `{ status: 'error', message: 'You are not subscribed to this room!'}`
      - A kliens némítva van: `{ status: 'error', message: 'You are muted!'}`

