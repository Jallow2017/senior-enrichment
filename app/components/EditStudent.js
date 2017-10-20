import React, {Component} from 'react';
import axios from 'axios';

export default class EditStudent extends Component {

    constructor() {
        super();

        this.state = {
            campuses: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => this.setState({campuses}));
    }

    handleSubmit(event) {

        event.preventDefault();

        const studentId = this.props.match.params.studentId;
        const {name, email, campus} = event.target;

        const body = {
            name: name.value,
            email: email.value,
            campus: campus.value
        };

        axios.put(`/api/students/${studentId}`, body)
            .then(res => res.data)
            .then(() => {
                this.props.history.push(`/students/${studentId}`);
            });

         alert('Update Successful!!!');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        New Name:
                        <input name="name" type="text" placeholder="Student Name" />  <br/>

                        New Email:
                        <input name="email" type="email" placeholder="Student Email" />  <br/>
                    </div>  <br/>

                    Select Campus
                    <select name="campus">
                        <option />
                        {
                            this.state.campuses.map(campus =>
                                <option key={campus.id}>{campus.name}</option>)
                        }
                    </select><br />

                    <button >Save</button>
                </form>
            </div>
        );
    }
}


