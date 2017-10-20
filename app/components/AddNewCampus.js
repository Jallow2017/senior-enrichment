import React, {Component} from 'react';
import axios from 'axios';

export default class AddNewCampus extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [],
            studentNames: [],
            selectedStudent: '',
            selectedStudents: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        const [name, image] = [event.target.name.value, event.target.image.value];
        const body = image && {name, image} || {name};

        axios.post('/api/campuses', body)
            .then(res => res.data)
            .then(campus => {
                this.props.history.push(`/campuses/${campus.id}`);
            });

        alert('Campus Successfully Created!!!');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Enter Campus Name: <input
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    required />  <br/>

               Enter Campus Url:  <input
                    name="image"
                    type="text"
                    placeholder="Enter Image Url" /> <br/>

                <button>Save</button>
            </form>
        );
    }
}





