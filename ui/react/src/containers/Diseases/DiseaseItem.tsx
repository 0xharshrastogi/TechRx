import { Avatar } from 'antd';
import { type FC } from 'react';
import { type IDisease } from '../../common/types';
import './DiseaseItem.scss';

interface DiseaseItemProps {
	disease: IDisease;
}

export const DiseaseItem: FC<DiseaseItemProps> = (props) => {
	const {
		disease: { name, doctors },
	} = props;
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
				{doctors.map((doctor) => (
					<Avatar key={doctor.id} src={doctor.image} style={{ backgroundColor: '#f56a00' }}>
						{doctor.name[0]}
					</Avatar>
				))}
			</Avatar.Group>
		</div>
	);
};
