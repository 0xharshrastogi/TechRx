import { type FC } from 'react';
import { DateTimeUtils } from '../../common/utils';
import { type IPrescription } from './IPrescription';
import './PrescriptionItem.scss';

interface TPrescriptionItemProps {
	value: IPrescription;
}

export const PrescriptionItem: FC<TPrescriptionItemProps> = (props) => {
	const { name, createdOn } = props.value;

	return (
		<div className="prescription-item">
			<span className="prescription-item-name">{name}</span>
			<span className="date">Prescribed on {DateTimeUtils.toHumanDate(createdOn)}</span>
		</div>
	);
};
