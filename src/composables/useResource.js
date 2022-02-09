import { ref } from 'vue';
import usePageRequest from './usePageRequest.js';

export default function useResource(resource) {
	const { makeRequest } = usePageRequest();
	const items = ref([]);
	const item = ref(null);
	const url = `https://jsonplaceholder.typicode.com/${resource}`;

	const fetchAll = async () => (items.value = await makeRequest(url));
	const fetchOne = async (id) => (item.value = await makeRequest(`${url}/${id}`));

	return { items, fetchAll, fetchOne, item };
}
