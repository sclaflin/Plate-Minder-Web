import Recorder from './Recorder';
import ConfigOption from './ConfigOption';
import { DEFAULT_RECORDER_BASE_TOPIC, DEFAULT_RECORDER_HASS_DISCOVERY, DEFAULT_RECORDER_MQTT_OPTIONS, DEFAULT_RECORDER_URL, MQTT_RECORDER_ITEM_INFO } from '../lib/constants';
import API from '../lib/API';
import ObjectConfigOption from './ObjectConfigOption';

export default class MQTTRecorder extends Recorder {
	static apiType = 'mqtt';
	
	constructor(
		index,
		url = DEFAULT_RECORDER_URL,
		baseTopic = DEFAULT_RECORDER_BASE_TOPIC,
		mqttOptions = DEFAULT_RECORDER_MQTT_OPTIONS,
		hassDiscovery = DEFAULT_RECORDER_HASS_DISCOVERY
	) {
		super(index);
		
		this.info = MQTT_RECORDER_ITEM_INFO;
		this.addOption(
			new ConfigOption(
				'URL',
				'url',
				url,
				API.updateRecorderUrl
			),
			new ConfigOption(
				'Base Topic',
				'baseTopic',
				baseTopic,
				API.updateRecorderBaseTopic
			),
			new ObjectConfigOption(
				'MQTT Options',
				'mqttOptions',
				mqttOptions,
				API.updateRecorderMqttOptions
			),
			new ObjectConfigOption(
				'HASS Discovery',
				'hassDiscovery',
				hassDiscovery,
				API.updateRecorderHassDiscovery
			)
		);
	}

	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index,
			config.url,
			config.baseTopic,
			config.mqttOptions,
			config.hassDiscovery
		);
	}
}
customElements.define('mqtt-recorder-element', MQTTRecorder);
