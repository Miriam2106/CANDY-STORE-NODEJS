const express = require('express');
const router = express.Router();

const pool = require('../database.js');
router.get('/',async(req,res)=>{
    let listCandies = await pool.query('SELECT * FROM candies');
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        listCandies: listCandies
    });
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    let candy = await pool.query('SELECT * FROM candies WHERE id=?',[id]);
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        candy: candy
    });
});
router.post('/create',async(req,res)=>{
    const {name,price,expiration,isSalad,date_registered,date_created} = req.body;
    const candy={
        name,price,expiration,isSalad,date_registered,date_created,status:1
    };
    await pool.query('INSERT INTO candies set ?', [candies])
    res.json({
        status:"200",
        message:"Se ha registrado correctamente",
        candy: candy
    });
});
router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {name,price,expiration,isSalad,date_registered,date_created} = req.body;
    const candy= {name,price,expiration,isSalad,date_registered,date_created};
    await pool.query('UPDATE candies SET ? WHERE id = ?',[candies,id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente",
        candy: candy
    });
});

router.post('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query('UPDATE candies SET status=0 WHERE id = ?',[id]);
    res.json({
        status:"200",
        message:"Se ha eliminado correctamente"
    });
});
module.exports = router;