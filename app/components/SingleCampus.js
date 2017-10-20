import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class SingleCampus extends Component {

    constructor() {
        super();

        this.state = {
            campus: {},
            students: []
        };

        this.deleteCampusHandler = this.deleteCampusHandler.bind(this);
    }

    componentDidMount() {

        const campusId = this.props.match.params.campusId;

        axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(studentsAtThisCampus => {
                const campus = studentsAtThisCampus[0];
                const students = studentsAtThisCampus[1];

                this.setState({campus, students});
            });
    }

    deleteCampusHandler() {

        const campusId = this.props.match.params.campusId;
        axios.delete(`/api/campuses/${campusId}`);

        alert('Campus Removed!!!');
    }

    deleteStudentHandler(studentIndex, studentId) {
        
        axios.put(`/api/students/removeCampus/${studentId}`,
            {name: '', email: '', campus: ''})
            .then(() => {
               const newStudentArr = this.state.students.filter((student, index) => {
                   return (index !== studentIndex);
               })
                this.setState({
                    students: newStudentArr
                });
            });

        alert('student removed!!!');
    }

    render() {

        const students = this.state.students;
        const campusId = this.state.campus.id;
        const campusName = this.state.campus.name;
        const  campusImage = this.state.campus.image;

        return (
            <div>

                <h3>{campusName}</h3>

                <div>
                    <Link to={`/campuses/edit/${campusId}`} style={{ textDecoration: 'none' }}>
                        <button>Edit Campus</button>
                    </Link>

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button onClick={this.deleteCampusHandler}>Delete Campus</button>
                    </Link>
                </div>

                <img src={campusImage} />

                <h3> Students At This Campus <hr/></h3>

                {
                    students.length ?
                    <ol>
                        {students.map((student, studentIndex) => {
                            return (
                                <div key={student.id}>

                                    <Link to='/' style={{ textDecoration: 'none' }}>
                                        <li key={studentIndex}>{student.name}</li>
                                    </Link>

                                    <button
                                        onClick={this.deleteStudentHandler.bind(this, studentIndex, student.id)}> Delete
                                    </button>
                                </div>
                            );
                        })}
                    </ol>
                           : <h3> No students assigned!!! </h3>
                }
            </div>
        );
    }
}




