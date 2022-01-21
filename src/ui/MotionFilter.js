import { MOTION_FILTER_ITEM_INFO } from '../lib/constants';
import Filter from './Filter';

export default class MotionFilter extends Filter {
	static apiType = 'motion';

	constructor(index) {
		super(index);

		this.info = MOTION_FILTER_ITEM_INFO;
	}
}
customElements.define('motion-filter-element', MotionFilter);
