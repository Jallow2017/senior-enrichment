'use strict'
const api = require('express').Router()
const db = require('../db')
const Campus = require('../db/models/campus')


/*
GET ALL CAMPUSES
==========================================================================
*/
api.get('/', (req, res, next) => {

    Campus.findAll()
        .then(campuses => {
            res.json(campuses)
        })
        .catch(next)
});


/*
GET ONE CAMPUS
===========================================================================
*/
api.get('/:campusId', (req, res, next) => {

    const campusId = +(req.params.campusId)

    Campus.findById(campusId)
        .then(campus => {
            res.json(campus)
        })
        .catch(next)
});

/*
CREATE A NEW CAMPUS
===========================================================================
*/
api.post('/', (req, res, next) => {

    Campus.create(req.body)
        .then(createdCampus => {
            alert(createdCampus, ' successfully created')
            res.redirect('/');
        })
        .catch(next)
});

/*
UPDATE A CAMPUS
===========================================================================
*/
api.put('/:campusId', (req, res, next) => {

    const campusId = req.params.campusId

    Campus.findById(campusId)
        .then(campus => {
            return campus.update(req.body)
        })
        .then(updatedCampus => {
            alert('update successful')
            res.redirect('/');
        })
        .catch(next)
});


/*
DELETE A CAMPUS
===========================================================================
*/
api.delete('/:campusId', (req, res, next) => {

    const campusId = +(req.params.campusId)

    Campus.findById(campusId)
        .then(campus => {
            return campus.destroy()
        })
        .then(()=> {
            alert('campus removed')
            res.redirect('/');
        })
        .catch(next)
});


module.exports = api;
