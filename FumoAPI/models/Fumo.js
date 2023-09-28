const db = require('../databases/db')
const Spell = require('./Spell')

class Fumo {
    constructor(data) {
        this.id = data.id || null
        this.name = data.name || null
        this.url = data.url || null
        this.attack = data.attack || null
        this.power = data.power || null
        this.spell_id = data.spell_id || null
        this.spell_effect = ''
    }

    async get_spell() {
        let spell = await Spell.find(this.spell_id)
        this.spell_effect = spell.effect
    }

    static all() {
        return new Promise((resolve, reject) => {
            const fumos = []
            db.each('SELECT * FROM fumos', (err, row) => {
                if (err)
                    reject(err)

                fumos.push(new Fumo(row))
            }, async (err) => {
                for (const fumo of fumos) {
                    await fumo.get_spell();
                }

                resolve(fumos)
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            attack: this.attack,
            power: this.power,
            spell: this.spell_effect,
        }
    }
}

module.exports = Fumo