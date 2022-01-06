import Filter from '../ui/Filter';
import Recorder from '../ui/Recorder';
import Source from '../ui/Source';


export class FileNotFoundError extends Error {}

let plateMinderUrl = null;

export default class API {
	static async getPlateMinderUrl() {
		if(!plateMinderUrl) {
			//attempt to load the Plate-Minder URL from disk
			try {
				const response = await fetch('/plate-minder-url');
				if(!response.ok)
					throw new Error(`${response.code}: ${response.status}`);
				plateMinderUrl = new URL(await response.text());
			}
			//fall back to statically defined URLs
			catch(err) {
				// eslint-disable-next-line no-undef
				plateMinderUrl = process.env.NODE_ENV === 'development' ?
					new URL('http://localhost:4000'):
					new URL('http://plate-minder:4000');
			}
		}
		return plateMinderUrl;
	}
	static async getConfig() {
		const response = await fetch(`${await API.getPlateMinderUrl()}config`);
		if(!response.ok)
			throw new Error(`${response.code}: ${response.status}`);
		return response.json();
	}
	static async addSource(source) {
		if(!(source instanceof Source))
			throw new TypeError('source must be an instance of Source.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(source)
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to add Source: ${data ?? response.statusText}`);
		return data;
		
	}
	static async deleteSource(index) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to remove Source: ${data ?? response.statusText}`);
		return data;
	}
	static async updateSourceName(index, name) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof name !== 'string')
			throw new TypeError('name must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/name`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Source Name: ${data ?? response.statusText}`);
		return data;
	}
	static async updateSourceCaptureInterval(index, captureInterval) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(isNaN(Number(captureInterval)))
			throw new TypeError('captureInterval must be a number.');

		captureInterval = Number(captureInterval);
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ captureInterval })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/captureInterval`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Source Capture Interval: ${data ?? response.statusText}`);
		return data;
	}
	static async updateSourceUrl(index, url) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof url !== 'string')
			throw new TypeError('url must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/url`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Source URL: ${data ?? response.statusText}`);
		return data;
	}
	static async updateSourceFile(index, file) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof file !== 'string')
			throw new TypeError('file must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ file })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/file`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Source File: ${data ?? response.statusText}`);
		return data;
	}
	static async getSourceStatus(index) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/status`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to get Source Status: ${data ?? response.statusText}`);
		return data;
	}
	static async updateSourceRun(index, run) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof run !== 'boolean')
			throw new TypeError('run must be a boolean.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ run })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}source/${index}/run`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Source Run: ${data ?? response.statusText}`);
		return data;
	}
	static async addFilter(filter) {
		if(!(filter instanceof Filter))
			throw new TypeError('filter must be an instance of Filter.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter)
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}filter`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to add Filter: ${data ?? response.statusText}`);
		return data;
		
	}
	static async deleteFilter(index) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}filter/${index}`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to remove Filter: ${data ?? response.statusText}`);
		return data;
	}
	static async updateFilterDebug(index, debug) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof debug !== 'boolean')
			throw new TypeError('debug must be a boolean.');

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ debug })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}filter/${index}/debug`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Filter Debug: ${data ?? response.statusText}`);
		return data;

	}
	static async updateFilterShapes(index, shapes) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(!Array.isArray(shapes))
			throw new TypeError('shapes must be an Array.');

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ shapes })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}filter/${index}/shapes`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Filter Shapes: ${data ?? response.statusText}`);
		return data;

	}
	static async getFilterDebugImage(index) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');

		const response = await fetch(`${await API.getPlateMinderUrl()}filter/${index}/debugImage`);
		if(response.ok)
			return URL.createObjectURL(await response.blob());
		
		switch(response.status) {
			case 404:
				throw new FileNotFoundError(`${response.status}: ${response.statusText}`);
			default:
				throw new Error(`${response.status}: ${response.statusText}`);	
		}
	}
	static async addRecorder(recorder) {
		if(!(recorder instanceof Recorder))
			throw new TypeError('recorder must be an instance of Recorder.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(recorder)
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to add Recorder: ${data ?? response.statusText}`);
		return data;
		
	}
	static async deleteRecorder(index) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to remove Recorder: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderPattern(index, pattern) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof pattern !== 'string')
			throw new TypeError('pattern must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pattern })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/pattern`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder Pattern: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderRetainDays(index, retainDays) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(!Number.isInteger(Number(retainDays)))
			throw new TypeError('retainDays must be an integer.');

		retainDays = Number(retainDays);
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ retainDays })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/retainDays`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder Retain Days: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderUrl(index, url) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof url !== 'string')
			throw new TypeError('url must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/url`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder URL: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderBaseTopic(index, baseTopic) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof baseTopic !== 'string')
			throw new TypeError('baseTopic must be a string.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ baseTopic })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/baseTopic`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder Base Topic: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderMqttOptions(index, mqttOptions) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof mqttOptions !== 'object')
			throw new TypeError('mqttOptions must be an Object.');
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mqttOptions })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/mqttOptions`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder MQTT Options: ${data ?? response.statusText}`);
		return data;
	}
	static async updateRecorderHassDiscovery(index, hassDiscovery) {
		if(!Number.isInteger(index))
			throw new TypeError('index must be an integer.');
		if(typeof hassDiscovery !== 'object')
			throw new TypeError('hassDiscovery must be an Object.');

		//coerce the string into a boolean
		hassDiscovery.enable = hassDiscovery.enable === 'true';
		
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hassDiscovery })
		};
		const response = await fetch(`${await API.getPlateMinderUrl()}recorder/${index}/hassDiscovery`, requestOptions);
		const data = await response.json();
		if(!response.ok)
			throw new Error(`Failed to update Recorder Hass Discovery: ${data ?? response.statusText}`);
		return data;
	}
}
