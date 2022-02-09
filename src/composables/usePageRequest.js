import { reactive, computed } from 'vue';
const activeRequests = reactive([]);
export default function usePageRequests() {
	const isLoading = computed(() => !!activeRequests.length);

	const makeRequest = async (url) => {
		// push to active requests
		const index = activeRequests.length;
		activeRequests[index] = url;
		const response = await fetch(url).catch((error) => alert(error));
		const data = await response.json();
		// remove url
		activeRequests.splice(index, 1);

		return data;
	};

	return { isLoading, makeRequest };
}
