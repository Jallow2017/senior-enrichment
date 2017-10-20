import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campuses: []
        }
    }

    componentDidMount() {

        axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses =>
                this.setState({campuses}))
    }

    render() {

        const campuses = this.state.campuses;

        return (

            <div>

                <div>
                    <h1>LIST OF CAMPUSES:</h1>
                </div>
                {
                   campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                                <Link to={`/campuses/${campus.id}`}>

                                    <h3> {campus.name} </h3>
                                    <img src={campus.image} />

                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}










