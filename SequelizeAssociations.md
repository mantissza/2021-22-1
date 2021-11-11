# Sequelize asszociációk

Ez a leírás bemutatja, hogy néznek ki Sequelize-ban az adatmodellek közötti kapcsolatok (a Sequelize ezeket nem relációknak, hanem asszociációknak hívja), és milyen metódusokkal tudjuk ezeket létrehozni, elérni, kezelni.

## Lehetséges relációk
- 1-1 (One to One, vagyis Egy-Egy kapcsolat)
  - Egyértelmű kapcsolatot teremt két entitás között.
  - Példa: ha egyik oldalt személyeket tartunk nyilván (Person), másik táblában pedig jogosítványokat (DrivingLicense), akkor egy adott személynek csak egy jogosítványa lehet és egy adott jogosítványhoz is csak egy személy tartozhat.
  - Részletes dokumentáció: https://sequelize.org/master/manual/assocs.html#one-to-one-relationships
  - Ha A és B között 1-1 kapcsolat van, akkor az alábbi metódusokat kapják:
    - A: [hasOne](https://sequelize.org/master/class/lib/associations/has-one.js~HasOne.html) (neki van egy B-je)
    - B: [belongsTo](https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html) (ő pedig A-hoz tartozik)
- 1-N (One to Many, vagyis Egy-Sok kapcsolat)
  - Egy entitáshoz akár több másik eintitás is tartozhat.
  - Példa: ha van egy személy (Person), akinek a nyilvántartás szerint lehetnek a nevén autók. Ez lehet egy autó is, lehet kettő, három, de igazából technikailag akárhány, tehát N db autó lehet a nevén. Innen jön az elnevezés, 1 személyhez N db autó kapcsolódhat, tehát 1-N.
  - Részletes dokumentáció: https://sequelize.org/master/manual/assocs.html#one-to-many-relationships
  - Ha A és B között 1-N kapcsolat van, akkor az alábbi metódusokat kapják:
    - A: [hasMany](https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html) (neki van valamennyi B-je)
    - B: [belongsTo](https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html) (ő pedig A-hoz tartozik)
- N-N / N-M (Many to Many, vagyis Sok-Sok kapcsolat)
  - Egy entitáshoz akár több másik entitás is tartozhat, akárcsak az előző 1-N-es példában, azonban míg az egy oldalú volt, itt ez visszafelé is igaz.
  - Hívják N-M kapcsolatnak is, hiszen nem feltétlen kell, hogy ugyannyi kötődés legyen a két oldalon, csak technikailag lehet több, mint egy bármelyik oldalról.
  - Példa: Egy személy (Person), ha autót akar venni, akkor azt több szalonból (Shop) is megteheti, de egy szalon is többféle személynek adhat el autót.
  - Részletes dokumentáció: https://sequelize.org/master/manual/assocs.html#many-to-many-relationships
  - Ha A és B között N-N kapcsolat van, akkor az alábbi metódusokat kapják:
    - A: [belongsToMany](https://sequelize.org/master/class/lib/associations/belongs-to-many.js~BelongsToMany.html) (többszörösen kötődhet B-hez)
    - B: [belongsToMany](https://sequelize.org/master/class/lib/associations/belongs-to-many.js~BelongsToMany.html) (többszörösen kötődhet A-hoz)

## Relációk megadása
A relációkat a Sequelize modellek `associate` nevű statikus metódusán keresztül adjuk meg a fent említett metódusok segítségével.

Ehhez generáljunk ki mondjuk egy Shop és egy Item modelt:
```shell
npx sequelize model:generate --name Shop --attributes name:string,address:string
npx sequelize model:generate --name Item --attributes name:string,price:integer
```

Majd a `models` mappában adjuk meg a relációkat:

```js
class Shop extends Model {
    // A models objektumot megkapja paraméterben, ebből elérhető az összes többi model
    static associate(models) {
        // A this a jelenlegi model, vagyis a "Shop"
        // Ha itt adunk mondjuk egy hasMany-t a Items-re, azzal azt mondjuk, hogy a Shop-hoz tartozik valamennyi Item (1-N)
        this.hasMany(models.Item);
    }
}
```

Ilyenkor az Item modell a következőképpen néz ki:

```js
class Item extends Model {
    static associate(models) {
        // A this a jelenlegi model, vagyis a "Item"
        // Mivel ez a "Item" a "Shop"-hoz tartozik, ide belongsTo()-t adunk, amiben megjelöljük a "Shop" modelt
        this.belongsTo(models.Shop);
    }
}
```

Mivel itt 1-N kapcsolatot mutattunk be, vagyis, hogy a bolthoz tartozik egy árukészlet, nyilvánvalóan valahogy az adatbázisban ábrázolni is kell ezt a függést. Az "Item" nevű modelben szokott lenni egy plusz mező, ami a "Shop"-ra hivatkozik, jellemzően a "Shop"-nak az ID mezőjére. Tehát az "Item" migration-jébe kell, hogy rakjuk még valami ilyesmit:

```js
// ...
ShopId: {
    type: Sequelize.INTEGER,
},
// ...
```

Felmerül a kérdés, hogy fogja a Sequelize megtalálni egy a `ShopId` nevű külső kulcsot? Úgy, hogy megnézi, az Item-nél a belongsTo-nak milyen modelt adtunk paraméterül, annak lekéri a nevét és az elsődleges kulcsát (primary key) és CamelCase szerűen egymás után írja őket: ModelNeveElsodlegesKulcsNeve, vagyis ha a model neve Shop, az elsődleges kulcsé pedig id, akkor ShopId fog előállni. Lásd például [itt](https://github.com/sequelize/sequelize/blob/main/lib/associations/belongs-to.js#L34-L48).

Ettől természetesen el lehet térni, tehát nem muszáj, hogy ez `ShopId` néven szerepeljen, akkor viszont meg kell mondani a hasMany-nek és a belongsTo-nak is az érintett modellekben, hogy mit állítottunk be egyedileg külső kulcsnak, mivel eltértünk az elnevezési konvencióktól. 

Tehát ha például a `ShopId`-t átírjuk a migration-ben `CustomShopId`-ra, akkor ki kell egészíteni a metódusokat a modelfájlokban is, hogy tudja az ORM, milyen külső kulcsot keressen:

Ez a Shop esetében:
```js
this.hasMany(models.Item, {
    foreignKey: "CustomShopId",
});
```

Mivel a dolog oda-vissza működik, ne felejtsük el a másik oldalt sem, az Items-t:
```js
this.belongsTo(models.Shop, {
    foreignKey: "CustomShopId",
});
```

Mint az látszik, itt is fontosak az elnevezési konvenciók, akárcsak Laravelben. A Sequelize ugyanis egy [Inflection](https://github.com/dreamerslab/node.inflection) nevű library-t használ az elnevezések nyelvtani kezeléséhez, hasonlóan, ahogy ezt a Laravel is teszi, csak PHP-s környezetben. Ennek a működését valahogy így kell elképzelni:

```js
const inflection = require('inflection');

// A pluralize többes számba rakja az item-et, vagyis items lesz
// A capitalize pedig nagybetűsíti, tehát az items Items lesz
console.log(inflection.capitalize(inflection.pluralize('item'))); // Items

// Ez egy picit bonyolultabb eset, mivel a category többes száma categories lesz,
// ez a fv. valóban ezt is fogja visszaadni
console.log(inflection.pluralize('category')); // categories

// Ez is azt adja vissza, hogy categories, ha már többes számban van,
// akkor egyszerűen abban is fogja hagyni.
console.log(inflection.pluralize('categories')); // categories

// Ez a többes számot alakítja egyes számmá, vagyis category lesz
console.log(inflection.singularize('categories')); // category

// Továbbá tudja kezelni az úgynevezett snake_case és CamelCase módokat is.
// A snake_case neve onnan ered, hogy a _ karakter olyan, mint egy kígyó (snake).
// A CamelCase pedig onnan, hogy a nagybetű olyan, mint a teve (camel) púpja.
console.log(inflection.camelize('first_second')); // FirstSecond
console.log(inflection.underscore('FirstSecond')); // first_second
```

Tehát a Sequelize fogja a model nevét, bedobja ebbe az Inflection-be, ami kiadja mondjuk a többesszámát, de igény szerint bármi mást is tehet vele, mint láttuk.

## Elérhető metódusok
Ha megteremtettük a relációkat a fenti módon, akkor különböző metódusok válnak elérhetővé, mint például ilyenek:

```js
const db = require("./models");
const { Shop } = db;
const faker = require("faker");

;(async () => {
    // Shop létrehozása
    const shop = await Shop.create({
        name: faker.lorem.word(),
        address: faker.address.secondaryAddress(),
    });

    // Item-ek létrehozása a Shop-hoz
    await shop.createItem({
        name: faker.lorem.word(),
        price: faker.datatype.number({ min: 500, max: 20000 }),
    });
    const secondItem = await shop.createItem({
        name: faker.lorem.word(),
        price: faker.datatype.number({ min: 500, max: 20000 }),
    });

    // Shop-hoz tartozó Item-ek lekérése és kiírása a konzolra
    console.log(await shop.getItems({ raw: true }));
    // Shop-hoz tartozó Item-ek számának lekérése és kiírása a konzolra
    console.log(await shop.countItems());

    // A 2. Item eltávolítása a Shop-ból
    await shop.removeItem(secondItem);
    console.log("Item eltávolítva");

    // Shop-hoz tartozó Item-ek számának lekérése és kiírása a konzolra
    // Ez már csak egy Item-et fog jelezni, hiszen a másodikkal megszüntettük
    // a kapcsolatot (nem az Item-et töröltük, csak a shopId mezőjét állítottuk át)
    console.log(await shop.countItems());
})();
```

Itt el is érkeztünk egy további érdekes pontra, hogy hogyan kerülnek kigenerálásra ezek a metódusok, amiket a reláció valamelyik oldaláról elérünk. 

Látszik, hogy az elnevezésük függ a modelljeinktől és az általunk megadott nevektől, mégis honnan jön a nevük? 

Nos, alapvetően itt is a model nevét veszi alapul a rendszer, hacsak a fenti hasMany, belongsTo metódusoknál nem adunk meg valamilyen "aliast" ("as" property). [Lásd itt.](https://github.com/sequelize/sequelize/blob/main/lib/associations/belongs-to.js#L24-L32) A model neve egyes- és többesszámban így kérhető le (fontos, hogy magát a models mappából jövő model-t kell megadni, és nem annak egy példányát):

```js
console.log(Shop.options.name);
```

Ez a következőt fogja kiírni:
```js
{ plural: 'Shops', singular: 'Shop' }
```

Az elnevezések a következő módon néznek ki:

- belongsTo oldalról:
  - Dokumentáció: https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html
  - Forráskód: https://github.com/sequelize/sequelize/blob/main/lib/associations/belongs-to.js#L73
  - Metódusok:			
    - get: `get${egyes szám}`,
    - set: `set${egyes szám}`,
    - create: `create${egyes szám}`
- belongsToMany oldalról:
  - Dokumentáció: http://docs.sequelizejs.com/class/lib/associations/belongs-to-many.js~BelongsToMany.html
  - Forráskód: https://github.com/sequelize/sequelize/blob/main/lib/associations/belongs-to-many.js#L209
  - Metódusok:
    - get: `get${többes szám}`,
    - set: `set${többes szám}`,
    - addMultiple: `add${többes szám}`,
    - add: `add${egyes szám}`,
    - create: `create${egyes szám}`,
    - remove: `remove${egyes szám}`,
    - removeMultiple: `remove${többes szám}`,
    - hasSingle: `has${egyes szám}`,
    - hasAll: `has${többes szám}`,
    - count: `count${többes szám}`
- hasMany oldalról:
  - Dokumentáció: http://docs.sequelizejs.com/class/lib/associations/has-many.js~HasMany.html
  - Forráskód: https://github.com/sequelize/sequelize/blob/main/lib/associations/has-many.js#L98
  - Metódusok:
    - get: `get${többes szám}`,
    - set: `set${többes szám}`,
    - addMultiple: `add${többes szám}`,
    - add: `add${egyes szám}`,
    - create: `create${egyes szám}`,
    - remove: `remove${egyes szám}`,
    - removeMultiple: `remove${többes szám}`,
    - hasSingle: `has${egyes szám}`,
    - hasAll: `has${többes szám}`,
    - count: `count${többes szám}`

Az alábbi segédfüggvénnyel ki is lehet listázni egy adott modellhez tartozó metódusokat:

```js
const db = require("./models");
const { Shop, Item } = db;

const getModelAccessorMethods = (model) => {
    console.log(`${model.name}:`);
    Object.entries(model.associations).forEach(([_, associatedModel]) => {
        Object.entries(associatedModel.accessors).forEach(([action, accessor]) => {
            console.log(`  ${action}: ${model.name}.${accessor}(...)`);
        });
    });
};

;(async () => {
    getModelAccessorMethods(Shop);
    getModelAccessorMethods(Item);
})();
```

Ez valami ilyesmit fog kiírni:
```
Shop:
  get: Shop.getItems(...)
  set: Shop.setItems(...)
  addMultiple: Shop.addItems(...)
  add: Shop.addItem(...)
  create: Shop.createItem(...)
  remove: Shop.removeItem(...)
  removeMultiple: Shop.removeItems(...)
  hasSingle: Shop.hasItem(...)
  hasAll: Shop.hasItems(...)
  count: Shop.countItems(...)
Item:
  get: Item.getShop(...)
  set: Item.setShop(...)
  create: Item.createShop(...)
```

## Metódusok használata
A fenti metódusok gyakorlati működését az alábbi kommentekkel ellátott példa mutatja.

```js
const models = require("./models");
const { Shop } = models;
const faker = require("faker");

;(async () => {
    const shop = await Shop.findByPk(1);
    // A Shop a hasMany oldalon van, tehát...
    // 1.) Item-ek lekérése: get${többes szám}, tehát getItems
    console.log(await shop.getItems());
    // 2.) Item-ek beállítása (ezentúl csak ezek az Item-ek lesznek hozzárendelve): set${többes szám}, tehát setItems([Item-ek tömbje, lehet id-k tömbje, vagy konkrét modelleké])
    console.log(await shop.setItems([1,2]));
    // 3.) Egy Item hozzáadása (a meglévő Item-ek mellé): add${egyes szám}, tehát addItem(Item id / Item modell)
    console.log(await shop.addItem(3));
    // 4.) Több Item hozzáadása (a meglévő Item-ek mellé): add${többes szám}, tehát addItems([Item-ek tömbje, lehet id-k tömbje, vagy konkrét modelleké])
    console.log(await shop.addItems([4,5]));
    // 5.) Új Item létrehozása, majd a modellhez rendelése (a meglévő Item-ek mellé): create${egyes szám}, tehát createItem({ Item mezői })
    console.log(await shop.createItem({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
    }));
    // 6.) Egy Item eltávolítása (a többi megmarad): remove${egyes szám}, tehát removeItem(Item id / item modell)
    console.log(await shop.removeItem(3));
    // 7.) Több Item eltávolítása (a többi megmarad): remove${többes szám}, tehát removeItems([Item-ek tömbje, lehet id-k tömbje, vagy konkrét modelleké])
    console.log(await shop.removeItems([4,5]));
    // 8.) Egy adott Item hozzá van-e rendelve a Shop-hoz: has${egyes szám}, tehát hasItem(Item id / Item modell)
    console.log(await shop.hasItem(1)); // true
    console.log(await shop.hasItem(4)); // false, hiszen a 4 az előbb el lett távolítva a kapcsolatból
    // 9.) Az összes megadott Item hozzá van-e rendelve a Shop-hoz: has${többes szám}, tehát hasItems([Item-ek tömbje, lehet id-k tömbje, vagy konkrét modelleké])
    console.log(await shop.hasItems([1,2])); // true
    console.log(await shop.hasItems([1,2,4])); // false, hiszen a 4 az előbb el lett távolítva a kapcsolatból, tehát nincs mind hozzárendelve
    // 10.) A Shop-hoz kapcsolt Item-ek számának lekérése: count${többes szám}, tehát countItems()
    console.log(await shop.countItems());
})();
```


