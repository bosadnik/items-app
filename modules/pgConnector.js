const pgp = require('pg-promise');
const leet = {
    a: '@',
    b: '8',
    c: '(',
    d: '|)',
    e: '3',
    f: '|=',
    g: '6',
    h: '#',
    i: '!',
    j: ']',
    k: '|{',
    l: '1',
    m: 'em',
    n: '[\]',
    o: '0',
    p: '|*',
    q: '0,',
    r: '|2',
    s: '$',
    t: '7',
    u: '(_)',
    v: '\/',
    w: 'vv',
    x: '%',
    y: '`/',
    z: '2'
}



module.exports = class {

    constructor(config) {
        this.db = pgp()(config);
    }

    async asignItemToCutomer(itemid, customerid) {
        await this.db.tx(async t => {
            await t.none(`
            update items set customer_id = $<customerid>
            where item_id = $<itemid>
            `, {
                itemid,
                customerid
            });

        })
    }

    async leet(itemid) {

        await this.db.tx(async t => {

            //await t.none(`LOCK TABLE items  IN ROW EXCLUSIVE MODE`);

            let desc = await t.one(`
            select description 
            from items 
            where item_id = $<itemid>
            and customer_id is null
            for update
            `, {
                itemid
            });

            desc = desc.description.split("").map(c => leet[c] || c).join("");


            await t.any(`
            update items set description = $<desc>
            where item_id = $<itemid>
            and customer_id is null
        `, {
                itemid,
                desc
            });

        })

        // let desc = await this.db.one(`
        //     select description 
        //     from items 
        //     where item_id = $<itemid>
        //     and customer_id is null
        // `, {
        //     itemid
        // });




    }

}