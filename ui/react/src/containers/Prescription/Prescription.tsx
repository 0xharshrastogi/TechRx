import { InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton, Tooltip, Upload } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { ScrollableContainer } from '../../components';
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
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const modal = {
		open() {
			setIsVisible(true);
		},
		close() {
			setIsVisible(false);
		},
	};

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
		<>
			<ScrollableContainer
				heading={
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span>Prescription</span>
						<div>
							<Tooltip title="Add Prescription">
								<Button
									shape="circle"
									type="ghost"
									icon={<PlusCircleOutlined color="inherit" />}
									onClick={modal.open}
								/>
							</Tooltip>
						</div>
					</div>
				}
				className="prescription"
				style={{
					flexGrow: '1',
				}}
			>
				<Skeleton active loading={loading} />
				<Skeleton active loading={loading} />
				<PrescriptionList items={prescriptions} />
			</ScrollableContainer>

			<Modal centered width={800} open={isVisible} onOk={modal.close} onCancel={modal.close}>
				<div>
					<Upload.Dragger name="prescription">
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly prohibited from uploading company data
							or other banned files.
						</p>
					</Upload.Dragger>
				</div>
			</Modal>
		</>
	);
};
