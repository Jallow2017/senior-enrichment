'use strict';
const api = require('express').Router();
const Campus = require('../db/models').Campus;
const Student = require('../db/models').Student;


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

    const selectedCampus = Campus.findById(Number(req.params.campusId));
    const campusStudents = selectedCampus.then(campus => {

        return Student.findAll({
            where: {
                campusId: campus.id
            }
        });
    });

    Promise.all([selectedCampus, campusStudents])
        .then((arrOfResults) =>
            res.json(arrOfResults))
        .catch(next);
});

/*
CREATE A NEW CAMPUS
===========================================================================
*/
api.post('/', (req, res, next) => {

    Campus.create(req.body)
        .then(newCampus => {
            res.json(newCampus);
        })
        .catch(next);
});

/*
UPDATE A CAMPUS
===========================================================================
*/
api.put('/:campusId', (req, res, next) => {

    //const campusId = Number(req.params.campusId)

    const {name, image, campusId, students} = req.body;

    Campus.findById(Number(campusId))
        .then(campus => {
            return campus.update({
                name: name || campus.name,
                image: image || campus.image
            });
        })
        .then(() => {
            return students.map(student => {
                Student.update({campusId}, {
                    where: {
                        name: student
                    }
                });
            });
        })
        .then(() => res.sendStatus(200))
        .catch(next);
});


/*
DELETE A CAMPUS
===========================================================================
*/
api.delete('/:campusId', (req, res, next) => {

    const campusId = Number(req.params.campusId)

    Campus.destroy({
        where: {
            id: campusId
        }
    })
        .then(() => res.sendStatus(200))
        .catch(next);

});


module.exports = api;



