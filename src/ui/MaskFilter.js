import Filter from './Filter';
import ArrayConfigOption from './ArrayConfigOption';
import { DEFAULT_FILTER_MASK, MASK_FILTER_ITEM_INFO } from '../lib/constants';
import API from '../lib/API';

export default class MaskFilter extends Filter {
	static name = 'MaskFilter';
	static apiType = 'mask';
	
	constructor(index, debug, shapes = DEFAULT_FILTER_MASK) {
		super(index, debug);
		
		this.info = MASK_FILTER_ITEM_INFO;
		this.addOption(
			new ArrayConfigOption(
				'Shapes',
				'shapes',
				shapes,
				API.updateFilterShapes
			)
		);
	}

	static fromObject(config) {
		if(config === null || typeof config !== 'object')
			throw new TypeError('config must be an Object.');
		return new this(
			config.index,
			config.debug,
			config.shapes
		);
	}
}
customElements.define('mask-filter-element', MaskFilter);
