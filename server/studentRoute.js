'use strict'
const api = require('express').Router()
const db = require('../db')
const Student = require('../db/models/student')

/*
GET ALL STUDENTS
===========================================================================
*/
api.get('/', (req, res, next) => {

    Student.findAll({where: req.body})
        .then(students => {
            res.json(students)
        })
        .catch(next)
});

/*
GET ONE STUDENTS
===========================================================================
*/
api.get('/:studentId', (req, res, next) => {

    const studentId = req.params.StudentId

    Student.findById(studentId)
        .then(student => {
            res.json(student)
        })
        .catch(next)
});

/*
CREATE A NEW STUDENT
===========================================================================
*/
api.post('/', (req, res, next) => {

    Student.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(next)
});

/*
UPDATE A STUDENT
===========================================================================
*/
api.put('/:studentId', (req, res, next) => {

    const studentId = req.params.StudentId

    Student.findById(studentId)
        .then(student => {
            return student.update(req.body)
        })
        .then(updatedStudent => {
            alert('update successful')
            res.redirect('/');
        })
        .catch(next)
});


/*
DELETE A STUDENT
===========================================================================
*/
api.delete('/:studentId', (req, res, next) => {

    const studentId = req.params.studentId;

    Student.findById(studentId)
        .then(student => {
            return student.destroy()
        })
        .then(()=> {
            alert('student removed')
            res.redirect('/');
        })
        .catch(next)
});

module.exports = api;

