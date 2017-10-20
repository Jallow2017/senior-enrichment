'use strict'
const api = require('express').Router();
const Student = require('../db/models').Student;
const Campus = require('../db/models').Campus;

/*
GET ALL Student
===========================================================================
*/
api.get('/', (req, res, next) => {

    Student.findAll()
        .then(Students => {
            res.json(Students)
        })
        .catch(next)
});

/*
GET ONE Student
===========================================================================
*/
api.get('/:studentId', (req, res, next) => {

    const studentId = Number(req.params.studentId);

    Student.findById(studentId)
        .then(student =>
            res.json(student)
        )
        .catch(next)
});

// /*
// CREATE A NEW STUDENT
// ===========================================================================
// */
api.post('/', (req, res, next) => {

    Student.create(req.body)
        .then(newStudent => {
            res.json(newStudent);
        })
        .catch(next)
});

/*
UPDATE A STUDENT
===========================================================================
*/
api.put('/:studentId', (req, res, next) => {

    const {campus} = req.body;

    let campusId = null;

    Campus.findOne({
        where: {
            name: campus
        }
    })
        .then(foundCampus => {
            return foundCampus ? foundCampus.id : 0;
        })
        .then(_campusId => {
            campusId = _campusId;
            return Student.findById(Number(req.params.studentId));
        })
        .then(student => {
            student.update({
                name: req.body.name || student.name,
                email: req.body.email || student.email,
                campusId: campusId || student.campusId
            });
        })
        .then(() => res.sendStatus(200))
        .catch(next);
});

api.put('/removeCampus/:studentId', (req, res, next) => {

    const id = Number(req.params.studentId);

    Student.findById(id)
        .then(student =>
            student.update({campusId: null}))
        .then(() => res.sendStatus(200))
        .catch(next);

});


/*
DELETE A STUDENT
===========================================================================
*/
api.delete('/:studentId', (req, res, next) => {

        const studentId = Number(req.params.studentId);

        Student.destroy({
            where: {
                id: studentId
            }
        })
            .then(() => res.sendStatus(200))
            .catch(next);

});

module.exports = api;

