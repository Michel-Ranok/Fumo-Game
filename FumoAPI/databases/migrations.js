const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS fumos');
    db.run("CREATE TABLE IF NOT EXISTS fumos(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        name VARCAHR(50) NOT NULL,              \
        url VARCHAR(100) NOT NULL,              \
        attack INTEGER NOT NULL,                \
        power INTEGER NOT NULL,                 \
        spell_id varchar(100) NOT NULL         \
    )")
    console.log('Table fumos créée')
    
    db.run('DROP TABLE IF EXISTS spells');
    db.run("CREATE TABLE IF NOT EXISTS spells(  \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        effect VARCHAR(100) NOT NULL            \
    )")
    console.log('Table spells créée')

    db.run(
        "INSERT INTO spells(effect) VALUES  \
            ('x2 Fumo coins per click'),\
            ('+1 Fumo soul when winning a fight'),\
            ('chance to skip encounters'),\
            ('+1 soul on sacrifices'),\
            ('-1 to enemy attack'), \
            ('chance to get two fumos at once') \
        ");

    db.run(
        "INSERT INTO fumos(name, url, attack, power, spell_id) VALUES  \
            ('Hakurei Reimu','https://fumo.website/img/001.jpg','2','2','2'),\
            ('Kirisame Marisa','https://fumo.website/img/002.jpg','3','1','2'),\
            ('Cirno','https://fumo.website/img/014.jpg','1','4','1'),\
            ('Izayoi Sakuya','https://fumo.website/img/004.jpg','3','2','5'),\
            ('Remilia Scarlet','https://fumo.website/img/005.jpg','4','2','4') \
            ('Flandre Scarlet','https://fumo.website/img/008.jpg','4','1','4') \
            ('Komeiji Koishi','https://fumo.website/img/197.jpg','2','3','5') \
            ('Saigyouji Yuyuko','https://fumo.website/img/040.jpg','3','2','3') \
            ('Patchouli Knowledge','https://fumo.website/img/006.jpg','3','3','6') \
        ");
})


db.close()