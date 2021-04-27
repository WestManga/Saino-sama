const router = require('express').Router();

router.get( '/' , ( req, res ) => {
    res.send(200);
});

module.exports = router;