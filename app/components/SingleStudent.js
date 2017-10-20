import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const chalk = require('chalk');

export default class SingleStudent extends Component {

    constructor() {
        super();

        this.state = {
            student: {
                name: '',
                email: '',
                image: '',
                campus: {}
            }
        };

        this.deleteStudentHandler = this.deleteStudentHandler.bind(this);
    }

    componentDidMount() {

        const studentId = this.props.match.params.studentId;

        axios.get(`api/students/${studentId}`)
            .then(res => res.data)
            .then(studentObj => {
                const {id, name, email, image, campus} = studentObj;
                this.setState({
                    student: {id, name, email, image, campus}
                });
            });
    }

    deleteStudentHandler() {

        const studentId = this.props.match.params.studentId;
        axios.delete(`/api/students/${studentId}`);

        alert('Student Removed!!!');
    }

    render() {

        const student = this.state.student;

        return (
            <div>
                <div className="student">

                    <strong>Student's Name:</strong> {student.name}  <br/>

                    <strong>Student's Email:</strong> {student.email}  <br/>

                </div>
                {
                    student.campus ?
                        <Link to={`/campuses/${student.campus.id}`}  style={{ textDecoration: 'none' }}>
                            <div>
                                <h3> Campus: {student.campus.name} </h3>
                                <img src={student.campus.image} />
                            </div>
                        </Link>
                               :
                        <h3>No campus assigned!!!</h3>
                }

                <Link to={`/students/edit/${student.id}`} style={{ textDecoration: 'none' }}>
                    <button>Edit Student</button>
                </Link>

                <Link to="/students" style={{ textDecoration: 'none' }}>
                    <button onClick={this.deleteStudentHandler}>Delete Student</button>
                </Link>

            </div>
        );
    }

}


