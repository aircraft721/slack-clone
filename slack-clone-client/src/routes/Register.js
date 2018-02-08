import React from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };

    onSubmit = async () => {
        await this.props.mutate({
            variables: this.state,
        });
    };

    render(){

        const { username, email, password } = this.state;

        return (
            <Container text>
                <Header as='h2'>Register</Header>
                <Input name="username" onChange={this.onChange} value={username} fluid placeholder='Username' />
                <Input name="email" onChange={this.onChange} value={email} fluid placeholder='Email' />
                <Input name="password" onChange={this.onChange} value={password} type='password' fluid placeholder='Password' />
                <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        );
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!){
        register(username: $username, email: $email, password: $password)
    }
`;

export default graphql(registerMutation)(Register);