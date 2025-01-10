import { render } from 'preact';
import { LocationProvider } from 'preact-iso';

import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

import './style.css';

export function App() {

	const url = useSignal('');

	useEffect(() => {
		(async () => {
			try {
				const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
				url.value = encodeURIComponent(tabs[0]?.url);
				
				chrome.tabs.onActivated.addListener(async (activeInfo) => {
					const tab = await chrome.tabs.get(activeInfo.tabId);
					url.value = encodeURIComponent(tab.url);
				});
	
				chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
					if (changeInfo.status === 'complete' && tab.active) {
						url.value = encodeURIComponent(tab.url);
					}
				});
			} catch (e) {
				console.error(e)
			}

		})();
	}, [window.url])

	return (
		<LocationProvider>
			<iframe src={`https://two6-12-2024-web.onrender.com/?url=${url}`} width='100%' height='100%'></iframe>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
