import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/user';
import { redirectToHomePage } from '../../helper';
import { fetchApi } from '../../helper/fetchApi';
import { toast } from '../../helper/toast';
import './index.scss';

const SignUp = () => {
	const history = useHistory();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});
	const { setIsUserLoggedIn } = useUserContext();
	const [isSignUpButtonLoading, setIsSignUpButtonLoading] = useState(false);

	const handleSignUp = async (event) => {
		try {
			event.preventDefault();
			setIsSignUpButtonLoading(true);

			const { message, user } = await fetchApi({
				method: 'post',
				url: '/users',
				data: { ...formData }
			});

			toast({ type: 'success', message });

			window.localStorage.setItem('userId', user._id);
			setIsUserLoggedIn(true);
			redirectToHomePage(history);
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsSignUpButtonLoading(false);
		}
	};

	const handleInputChange = (event) => {
		setFormData((formData) => ({
			...formData,
			[event.target.name]: event.target.value
		}));
	};

	return (
		<div className="signup-outer-container">
			<div className="signup-inner-container">
				<p className="heading-3 bold signup-heading">Sign Up</p>

				<form onSubmit={handleSignUp}>
					<div className="input-container">
						<input
							className="input-container__input-field"
							required={true}
							value={formData.name}
							name="name"
							onChange={handleInputChange}
							type="text"
						/>
						<label
							className={`input-container__heading ${
								formData.name ? ' input-container__heading-filled' : ''
							}`}
						>
							Name
						</label>

						<span className="input-container__icon material-icons">
							perm_identity
						</span>
					</div>

					<div className="input-container">
						<input
							className="input-container__input-field"
							required={true}
							value={formData.email}
							name="email"
							onChange={handleInputChange}
							type="email"
						/>
						<label
							className={`input-container__heading ${
								formData.email ? ' input-container__heading-filled' : ''
							}`}
						>
							E-Mail
						</label>

						<span className="input-container__icon material-icons">
							perm_identity
						</span>
					</div>

					<div className="input-container">
						<input
							className="input-container__input-field"
							required={true}
							value={formData.password}
							name="password"
							onChange={handleInputChange}
							type="password"
						/>
						<label
							className={`input-container__heading ${
								formData.password
									? ' input-container__heading-filled'
									: ''
							}`}
						>
							Password
						</label>

						<span className="input-container__icon material-icons">lock</span>
					</div>

					<button
						className={`btn primary-btn signup-btn ${
							isSignUpButtonLoading ? 'disabled' : ''
						}`}
						type="submit"
					>
						Sign Up
					</button>
				</form>

				<p className="existing-user-text">
					Existing User?
					<Link to="/login" className="reset-link-styles">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
