const { readFile } = require('fs')

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const query = req.query;
    let titulo = null;
    if (isNotEmpty(query)) {
        titulo = 'Relatório do dia: ' + query.data;

        readFile(__dirname + '/arquivos/relatorio-' + query.data + ".json", (err, data) => {
            if (err){
                res.status(200).send({
                    mensagem: "Período não localizado!"
                });
                return;     
            };

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