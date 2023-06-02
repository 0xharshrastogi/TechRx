import { Avatar } from 'antd';
import { type Disease } from 'proxy-api/src/shared/types';
import { type FC } from 'react';
import './DiseaseItem.scss';

interface DiseaseItemProps {
	disease: Disease;
}

export const DiseaseItem: FC<DiseaseItemProps> = (props) => {
	const {
		disease: { name, doctors },
	} = props;
	const initial = name[0];
	return (
		<div className="disease-item">
			<div className="disease-item-title">
				<span>{name}</span>
			</div>
			<Avatar.Group
				className="doctor-list"
				maxCount={3}
				maxPopoverTrigger="click"
				size="small"
				maxStyle={{ color: 'white', backgroundColor: '#007AFE', cursor: 'pointer' }}
			>
				{doctors.map((name) => (
					<Avatar key={name} style={{ backgroundColor: '#f56a00' }}>
						{initial}
					</Avatar>
				))}
			</Avatar.Group>
		</div>
	);
};
