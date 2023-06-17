import { type FC } from 'react';
import { DateTimeUtils, proxies } from '../../common/utils';
import { type IPrescription } from './IPrescription';
import './PrescriptionItem.scss';

interface TPrescriptionItemProps {
	value: IPrescription;
}

const APIProxy = proxies.local;

export const PrescriptionItem: FC<TPrescriptionItemProps> = (props) => {
	const { name, createdOn } = props.value;

	const onClickHandler = async (): Promise<void> => {
		await APIProxy.prescriptions.downloadPrescription(name);
	};

	return (
		<div
			className="prescription-item"
			onClick={(): void => {
				void onClickHandler();
			}}
		>
			<span className="prescription-item-name">{name}</span>
			<span className="date">{DateTimeUtils.toHumanDate(createdOn)}</span>
		</div>
	);
};
