import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Users from '../Users';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

const users = [
	{
		id: 1,
        name: 'John Doe',
    }
];

const projects = [
	{
		id: 1,
		name: 'Project',
	}
];

const roles = [
	{
		id: 1,
		name: 'Role',
	}
]

const usersProps = {
    users,
    projects,
    roles,
    showForm: jest.fn,
    isFormOpen: false,
    handleChange: jest.fn,
    closeForm: jest.fn,
    userName: '',
    noProjects: false,
    noRoles: false,
    showErrorMessage: false,
    hasError: false,
    handleSubmit: jest.fn
};

describe('<Users />', () => {
	it('should render Users', () => {
		const wrapper = renderer.create(<Users  {...usersProps}/>)
	})
	it('matches the snapshot', () => {
		const tree = shallow(<Users  {...usersProps}/>)
		expect(tree).toMatchSnapshot()
	})
});