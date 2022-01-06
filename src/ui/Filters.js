import { FILTER_GROUP_INFO } from '../lib/constants';
import ConfigGroup from './ConfigGroup';
import MaskFilter from './MaskFilter';
import MotionFilter from './MotionFilter';

export default class Filters extends ConfigGroup {
	static name = 'Filters';
	constructor() {
		super();

		this.info = FILTER_GROUP_INFO;
		
		this.addType(
			MaskFilter,
			MotionFilter
		);
	}
}

customElements.define('filters-element', Filters);
