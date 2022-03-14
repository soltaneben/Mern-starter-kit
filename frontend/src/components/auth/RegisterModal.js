import React, { Component } from 'react';
import { Button, Modal, ModalHeader, Form, FormGroup, Label, Alert, Input, ModalBody, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null
	};
	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired
	};
	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (error.id === 'REGISTER_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password } = this.state;

		// Create user object
		const newUser = {
			name,
			email,
			password
		};
		this.props.register(newUser);
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="name"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Label for="name">Email</Label>
								<Input
									type="email"
									name="email"
									id="Email"
									placeholder="Email"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Label for="name">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="password"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Button color="dark" style={{ marginTop: '2rem' }} block>
									Register
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
	// ERROR => index.js
});

export default connect(mapStateToProps, { register })(RegisterModal);
// {register} will become a prop we can access it using this.props
