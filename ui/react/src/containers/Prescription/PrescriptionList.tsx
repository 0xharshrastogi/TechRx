import { type FC } from 'react';
import { type IPrescription } from './IPrescription';
import { PrescriptionItem } from './PrescriptionItem';
import './PrescriptionList.scss';

interface PrescriptionListProps {
	items: IPrescription[];
}

export const PrescriptionList: FC<PrescriptionListProps> = (props) => {
	const { items } = props;
	return (
		<section className="prescription-list">
			{items.map((item, i) => (
				<PrescriptionItem key={i} value={item} />
			))}
		</section>
	);
};
