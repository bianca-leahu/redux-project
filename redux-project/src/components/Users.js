import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Alert } from 'reactstrap';

export default class Users extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
        projects: PropTypes.array.isRequired,
        roles: PropTypes.array.isRequired,
        showForm: PropTypes.func.isRequired,
        isFormOpen: PropTypes.bool.isRequired,
        handleChange: PropTypes.func.isRequired,
        closeForm: PropTypes.func.isRequired,
        userName: PropTypes.string.isRequired,
        noProjects: PropTypes.bool.isRequired,
        noRoles: PropTypes.bool.isRequired,
        showErrorMessage: PropTypes.bool.isRequired,
        hasError: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    /**
     * Handle the user details form submission
     * @param {Object} e - the "click" event object
     */
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.handleSubmit(this.projectsInput.value, this.rolesInput.value)
    }

    render() {
    	const { users, projects, roles, showForm, isFormOpen, handleChange, closeForm, userName, noProjects, noRoles, showErrorMessage, hasError } = this.props;

        return (
            <div className="users-page">
    			{!hasError 
                    ? <div className="users-page__list">
        				<h1 className='my-4 text-center'>Users</h1>
          				<div>
        					{users.map(item => (
          						<p className={`mt-2 mb-4 users-page__list-item ${item.name === userName && isFormOpen ? 'is-active' : ''}`} key={item.id} onClick={() => showForm(item.id, item.name, item.roles, item.projects)}>
            						{item.name} <br />
                                    <small>{item.roles ? `is assigned ${item.roles.toUpperCase()} role` : ''}</small>
                                    {item.roles ? <br /> : null}
                                    <small>{item.projects ? `in the ${item.projects.toUpperCase()} project` : ''}</small>
          						</p>
        					))}
      					</div>
        			</div>
                    :  <Alert color="danger">
                        This is a danger alert — check it out!
                    </Alert>}

    			{isFormOpen ? <Form onSubmit={this.handleSubmit} className='border users-page__form'>
    				<FormGroup>
                        <h2>{userName}</h2>
                        <p className='users-page__close' onClick={closeForm}>X</p>
          				<Label for="projects">Projects</Label>
          				<Input type="select" name="select" id="projects" invalid={noProjects} innerRef={(node) => this.projectsInput = node} onChange={(e) => handleChange(e)}>
            				<option value=''>Choose a project</option>
				            {projects.map(item => (
	      						<option key={item.id} value={item.id}>{item.name}</option>
    						))}
          				</Input>
          				<FormFeedback>You need to choose a project</FormFeedback>
        			</FormGroup>

        			<FormGroup>
          				<Label for="roles">Roles</Label>
          				<Input type="select" name="select" id="roles" invalid={noRoles} innerRef={(node) => this.rolesInput = node} onChange={(e) => handleChange(e)}>
            				<option value=''>Choose a role</option>
				            {roles.map(item => (
	      						<option key={item.id} value={item.id}>{item.name}</option>
    						))}
          				</Input>
          				<FormFeedback>You need to choose a role</FormFeedback>
        			</FormGroup>

                    {showErrorMessage === true ? <span className='d-flex mb-4 text-danger'><small>This role for this project has already been taken. Please choose a different role or a diferent project</small></span> : null}

        			<Button>Submit</Button>
    			</Form> : null}
  			</div>
        );
    }
}