import React, {Component} from 'react';
import axios from 'axios';

export default class AddNewStudent extends Component {

    constructor() {
        super();

        this.state = {
            campuses: [],
            students: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => this.setState({campuses}));
    }

    handleSubmit(event) {

        event.preventDefault();

        const [name, email, campus] = [event.target.name.value, event.target.email.value];

        axios.post('/api/students', {name, email})
            .then(res => res.data)
            .then(student => {
                this.props.history.push(`/students/${student.id}`);
            });

        alert('Student Successfully Added!!!');
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                Student Name: <input
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    required /> <br/>

                Student Email: <input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    required />  <br/> <br/>

                Select Campus:
                <select name="campus">
                    <option />
                    {
                        this.state.campuses.map(campus =>
                            <option key={campus.id}>{campus.name}</option>)
                    }
                </select><br />

                <button >Save</button>
            </form>
        );
    }

}



