import React, {Component} from 'react';
import axios from 'axios';

export default class EditCampus extends Component {

    constructor() {
        super();

        this.state = {
            students: [],
            studentNames: [],
            selectedStudent: '',
            studentsList: []
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.selectStudentHandler = this.selectStudentHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        axios.get('/api/students')
            .then(res => res.data)
            .then(students =>
                this.setState({
                    students, studentNames: students.map(student => student.name)
            }));
    }

    handleSubmit(event) {
        event.preventDefault();

        const campusId = this.props.match.params.campusId;
        const {name, image} = event.target;
        const body = {
            name: name.value,
            image: image.value,
            campusId: campusId,
            students: this.state.studentsList
        };

        axios.put(`/api/campuses/${campusId}`, body)
            .then(res => res.data)
            .then(() => {
                this.props.history.push(`/campuses/${campusId}`);
            });

        alert('Campus Successfully Updated!!!');

    }

    handleSelect(event) {
        this.setState({selectedStudent: event.target.value});
    }

    selectStudentHandler(event) {
        event.preventDefault();

        const {selectedStudent, studentNames} = this.state;
        const deleteStudentInd = studentNames.indexOf(selectedStudent);
        studentNames.splice(deleteStudentInd, 1);

        this.setState({studentsList: [...this.state.studentsList, selectedStudent]});
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>

                    <div>
                    New Name: <input name="name" type="text" placeholder="Campus Name" /> <br />
                    New Image Url:<input name="image" type="text" placeholder="Campus Image URL" />  <br/>
                    </div>

                    Add Students to Campus:
                    <div>
                        <select name="students" onChange={this.handleSelect}>
                            {
                                this.state.studentNames.map((student, studentIndex) =>
                            <option key={studentIndex}>{student}</option>)
                            }
                        </select>  <br/>

                        <button  onClick={this.selectStudentHandler}>Add</button>

                        <div>

                            <ul>
                                {this.state.studentsList.map((student, selectedIndex) =>
                                <li key={selectedIndex}> {student} </li>) }
                            </ul>
                        </div>
                    </div>

                    <br />
                        <button>Save</button>
                </form>
            </div>
        );
    }

}
