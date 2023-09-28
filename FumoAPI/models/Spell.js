const db = require('../databases/db');

class Spell {

    constructor(data) {
        this.id = data.id || null
        this.effect = data.effect || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const spells = []
            db.each('SELECT * FROM spells', (err, row) => {
                if (err)
                    reject(err)

                spells.push(new Spell(row))
            }, (err) => {
                resolve(spells)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM spells WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const spell = (row) ? new Spell(row) : null
                resolve(spell)
            })
        })
    }

    /**
     * Cette fonction est appelé par défaut l'orsque le model est convertit en 
     * objet JSON, il nous permet de définir le schema de la Resource que nous renvoyons
     * @returns Une ressource
     */
    toJSON() {
        return {
            id: this.id,
            effect: this.effect
        }
    }
}

module.exports = Spell