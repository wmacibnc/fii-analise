const express = require('express');
const router = express.Router();

const db = require("./db");

router.get('/', async function (req, res, next) {
    const filtro = req.query;
    let titulo = null;
    if (isNotEmpty(filtro)) {
        titulo = 'Relatório do dia: ' + filtro.data;

        let query = db.collection('dado').doc(filtro.data);

        await query.get().then(querySnapshot => {
            let docs = querySnapshot.data();
            let data = docs != null ? docs['dados'] : [];
        res
            .set({ 'Content-Type': 'text/plain' })
            .status(200).send(data);
    });

    } else {
        res.status(200).send({
            mensagem: "Período não informado!"
        });
    }
});

isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
};

isNotEmpty = function (obj) {
    return !this.isEmpty(obj);
};

module.exports = router;