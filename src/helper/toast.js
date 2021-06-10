const { toast: reactToast } = require('react-toastify');

export const toast = ({ type, message }) => {
	const toastProperties = {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	};

	switch (type) {
		case 'success':
			reactToast.success(message, { ...toastProperties });
			break;

		case 'error':
			reactToast.error(message, { ...toastProperties });
			break;

		default:
			reactToast(message, { ...toastProperties });
			break;
	}
};
