import { InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton, Tooltip, Upload, type UploadFile } from 'antd';
import { type UploadChangeParam } from 'antd/es/upload';
import { useMemo, useState, type FC } from 'react';
import * as Endpoint from '../../common/endpoints';
import { type IUser } from '../../common/types';
import { proxies } from '../../common/utils';
import { ScrollableContainer } from '../../components';
import { useAuth } from '../../hooks';
import { useFetch } from '../../hooks/useFetch';
import { type IPrescription } from './IPrescription';
import './Prescription.scss';
import { PrescriptionList } from './PrescriptionList';

const APIProxy = proxies.local;

export const Prescription: FC = () => {
	const PRESCRIPTION_FIELD_NAME = 'upload';
	const [isVisible, setIsVisible] = useState(false);
	const [uploaded, setUploaded] = useState<IPrescription[]>([]);
	const { user } = useAuth<IUser>();
	const { isLoading, data, error } = useFetch(() => {
		return APIProxy.prescriptions.getPrescriptions();
	}, []);

	const fetchPrescriptions = useMemo((): IPrescription[] => {
		return (
			data?.map((prescription) => ({
				id: prescription.name,
				name: prescription.name,
				createdOn: prescription.created_at,
				link: '',
			})) ?? []
		);
	}, [data]);

	const onUploadSuccess = (file: UploadFile): void => {
		setUploaded([...uploaded, { id: file.name, name: file.name, createdOn: new Date(), link: '' }]);
	};

	const onFileChange = (info: UploadChangeParam<UploadFile>): void => {
		console.log(info.file.status);
		if (info.file.status === 'done') {
			onUploadSuccess(info.file);
		}
	};

	const prescriptions = [...fetchPrescriptions, ...uploaded];

	const modal = {
		open() {
			setIsVisible(true);
		},
		close() {
			setIsVisible(false);
		},
	};

	if (error != null) {
		return <>Something went wrong</>;
	}

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
				<Skeleton active loading={isLoading} />
				<Skeleton active loading={isLoading} />
				{prescriptions.length === 0 ? (
					<>No file to show please upload</>
				) : (
					<PrescriptionList items={prescriptions} />
				)}
			</ScrollableContainer>

			<Modal centered width={800} open={isVisible} onOk={modal.close} onCancel={modal.close}>
				<div>
					<Upload.Dragger
						name={PRESCRIPTION_FIELD_NAME}
						action={Endpoint.PRESCRIPTION_UPLOAD}
						data={({ name }) => ({ email: user?.payload.id.email, filename: name })}
						onChange={onFileChange}
					>
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
