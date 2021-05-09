import faker from 'faker';

faker.seed(123);

const listOfYoutubeUrls = ['https://youtu.be/0bmE9XY3sOc'];

const videosList = [...Array(50)].map((item) => ({
	_id: faker.datatype.uuid(),
	channelName: faker.company.companyName(),
	createdAt: faker.date.past(),
	title: faker.lorem.sentence(),
	description: faker.lorem.paragraphs(),
	url: faker.random.arrayElement([...listOfYoutubeUrls])

	// "https://youtu.be/0bmE9XY3sOc",
}));

export default videosList;
