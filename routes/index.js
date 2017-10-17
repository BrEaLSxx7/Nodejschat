var express = require('express');
var router = express.Router();
var db = require('../model/');

/* GET home page. */
router.get('/:email/:pass', function (req, res, next) {
  db.query("SELECT email, password, apodo  FROM public.user where email=$1 AND password=$2", [req.params.email, req.params.pass])
    .then(response => {
      res.json({ rows: response.rows });
    })
    .catch(e => {
      console.log(e.stack);
    });
});

router.post('/', function (req, res, next) {
  db.query("SELECT email, apodo FROM public.user")
    .then(response => {
      var x = 0;
      var n = 0;
      for (var i = 0; i < response.rows.length; i++) {
        if ((response.rows[i].email === req.body.email)) {
          x++;
        }
        if ((response.rows[i].apodo === req.body.apodo)) {
          n++;
        }

      }if (x !== 0 && n !== 0) {
        res.json({ mensaje: messages = 'El correo y el nickname ya se encuentran registrados', next: false });
      }else if (x !== 0) {
        res.json({ mensaje: messages = 'El correo ya se encuentra registrado', next: false});
      } else if (n !== 0) {
        res.json({ mensaje: messages = 'El nickname ya se encuentra registrado', next: false});
      }
      if (x === 0 && n === 0) {
        db.query("INSERT INTO public.user (email, password, apodo, nombre) VALUES ($1, $2, $3, $4)", [req.body.email, req.body.pass, req.body.apodo, req.body.name])
          .then(re => {
            res.json({ next: true });
        });
      }
    })
    .catch(e => {
      console.log(e.stack);
    });
});
module.exports = router;
