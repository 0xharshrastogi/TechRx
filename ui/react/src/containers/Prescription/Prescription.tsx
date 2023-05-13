import { Skeleton } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { type IPrescription } from './IPrescription';
import './Prescription.scss';
import { PrescriptionList } from './PrescriptionList';

function getRandomDate(): Date {
	const start = new Date(2022, 0, 1).getTime();
	const end = new Date().getTime();
	const randomTimestamp = start + Math.random() * (end - start);
	return new Date(randomTimestamp);
}

const prescriptionList = [
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
	{ id: 1, name: 'Acetaminophen', link: '', createdOn: getRandomDate() },
	{ id: 2, name: 'Ibuprofen', link: '', createdOn: getRandomDate() },
	{ id: 3, name: 'Aspirin', link: '', createdOn: getRandomDate() },
];

export const Prescription: FC = () => {
	const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setPrescriptions(prescriptionList);
			setLoading(false);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [prescriptions]);

	return (
		<section className="prescription">
			<Skeleton active loading={loading} />
			<Skeleton active loading={loading} />
			<PrescriptionList items={prescriptions} />
		</section>
	);
};
