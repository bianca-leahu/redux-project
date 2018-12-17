import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Users from '../components/Users';
import { connect } from "react-redux";
import { updateUser } from "../js/actions/index";

class UsersContainer extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
        projects: PropTypes.array.isRequired,
        roles: PropTypes.array.isRequired
    }

	state = {
		isFormOpen: false,
		userName: '',
		userId: 0,
		projects: '',
		roles: '',
		noRoles: false,
		noProjects: false,
		showErrorMessage: false,
        hasError: false
	}

    /**
     * Open the Form for each user clicked
     * @param {String} name - name of the selected user
     * @param {Number} id - id of the selected user
     */
    showForm = (id, name) => {
		this.setState({
			isFormOpen: true,
			userName: name,
			userId: id,
			noRoles: false,
			noProjects: false,
            showErrorMessage: false
		})
	}
	
    /**
     * Close the Form on clicking the close button
     */
    closeForm = () => {
		this.setState({
			isFormOpen: false,
		})
	}

    /**
     * Handle the user details form submission
     * @param {Number} projectsInput - the Project select value
     * @param {Number} rolesInput - the Role select value
     */
	handleSubmit = async (projectsInput, rolesInput) => {
		// check if select inputs are empty and show form validation
        if (!projectsInput || !rolesInput) {
			if (!rolesInput) {
				this.setState({
					noRoles: true,
                    showErrorMessage: false
				})
			}
			else {
				this.setState({
					noRoles: false
				})
			}

			if (!projectsInput) {
				this.setState({
					noProjects: true,
                    showErrorMessage: false
				})
			}
			else {
				this.setState({
					noProjects: false
				})
			}
			return;
		}

        try {
            const users = this.props.users,
              data = {
                id: this.state.userId,
                name: this.state.userName,
                projects: this.state.projects,
                roles: this.state.roles
            }

            // check if the role was assigned before for the same project
            if ((users.some((item) => item.projects === this.state.projects && item.roles === this.state.roles && item.id !== this.state.userId)) === true) {
                this.setState({
                    noRoles: false,
                    noProjects: false,
                    showErrorMessage: true
                })
                return;
            }
            else {
                // update selected User's data
                this.props.dispatch(updateUser(data));

                this.setState({
                    isFormOpen: false,
                    showErrorMessage: false
                })
            }
        }
        catch (err) {
            // show alert if there is an error
            this.setState({
                hasError: true
            })
        }
	}

	/**
     * Handle the change of Project and Role from the Form select
     * @param {Object} e - the "click" event object
     */
    handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.id === 'projects' && e.target.value ? this.props.projects[e.target.value - 1].name : e.target.id === 'roles' && e.target.value ? this.props.roles[e.target.value - 1].name : ''
		});
	}

    render() {
        return (
            <Users 
            	users={this.props.users}
            	showForm={this.showForm}
            	isFormOpen={this.state.isFormOpen}
            	projects={this.props.projects}
            	roles={this.props.roles}
            	handleSubmit={this.handleSubmit}
            	handleChange={this.handleChange}
            	closeForm={this.closeForm}
            	userName={this.state.userName}
            	noRoles={this.state.noRoles}
            	noProjects={this.state.noProjects}
                showErrorMessage={this.state.showErrorMessage}
                hasError={this.state.hasError} />
        );
    }
}

function mapStateToProps({ users, projects, roles }) {
    return {
        users: users,
        projects: projects,
        roles: roles
    };
}

export default connect(
       mapStateToProps
   	)(UsersContainer);