import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/user';
import { redirectToHomePage } from '../../helper';
import { fetchApi } from '../../helper/fetchApi';
import { toast } from '../../helper/toast';
import './index.css';

const Login = () => {
	const history = useHistory();
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const { setIsUserLoggedIn } = useUserContext();
	const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);

	const handleLogin = async (event) => {
		try {
			event.preventDefault();
			setIsLoginButtonLoading(true);

			const { message, user } = await fetchApi({
				method: 'post',
				url: '/users/login',
				data: { ...formData }
			});

			toast({ type: 'success', message });
			window.localStorage.setItem('userId', user._id);
			setIsUserLoggedIn(true);
			redirectToHomePage(history);
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsLoginButtonLoading(false);
		}
	};

	const handleInputChange = (event) => {
		setFormData((formData) => ({
			...formData,
			[event.target.name]: event.target.value
		}));
	};

	return (
		<div className="login-outer-container">
			<div className="login-inner-container">
				<p className="heading-3 bold login-heading">LOGIN</p>

				<form onSubmit={handleLogin}>
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
						className={`btn primary-btn login-btn ${
							isLoginButtonLoading ? 'disabled' : ''
						}`}
						type="submit"
					>
						Login
					</button>
				</form>

				<p className="new-user-text">
					New User?
					<Link to="/signup" className="reset-link-styles">
						Signup
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
