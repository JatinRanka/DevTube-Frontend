import { fetchApi } from '../../helper/fetchApi';
import * as axios from 'axios';

jest.mock('axios');

describe('Fetch API helper functions', () => {
	it('Check if fetch api returns response data', async () => {
		axios.mockResolvedValue({ data: { name: 'test', age: 10 } });

		const responseData = await fetchApi({ url: '', isProtected: false });

		expect(responseData).toEqual({ name: 'test', age: 10 });
	});
});
