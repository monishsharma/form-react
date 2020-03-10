import React, { Component } from 'react';
import './Form.css';
class Form extends Component {
    state = {
        email: '',
        password: '',
        formErrors: { email: '', password: '' }, // error messages content
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    handleUserInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm); // + set the validation state for the whole form
    }
    validateForm = () => {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass = (error) => {
        return (error.length === 0 ? '' : 'has-danger');
    }

    submitForm = (e) => {
        e.preventDefault();
        alert('form validated')
    }
    render() {
        const FormErrors = ({ formErrors }) =>
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        return (
            <div>
                <form className="demoForm">
                    <h2>Sign up</h2>

                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email">Email address</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleUserInput}>
                        </input>
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleUserInput}>
                        </input>
                    </div>

                    <button type="submit" className="btn btn-primary"
                        disabled={!this.state.formValid} onClick = {!this.state.formValid ? '' : this.submitForm}>Sign up</button>

                </form>
            </div>
        )
    }
}

export default Form;