import { Skeleton } from 'antd';
import { type FC } from 'react';
import { proxies } from '../../common/utils';
import { ScrollableContainer } from '../../components';
import { useFetch } from '../../hooks/useFetch';
import { DiseaseItem } from './DiseaseItem';
import './Diseases.scss';

// const diseasesList: IDisease[] = [];

const APIProxy = proxies.local;

export const Diseases: FC = () => {
	const diseases = useFetch(async (controller) => {
		return await APIProxy.diseases.getAllDisease(controller);
	}, []);

	console.log(diseases);

	return (
		<ScrollableContainer
			className="disease-container"
			heading={<>Diseases</>}
			style={{
				flexGrow: 1,
			}}
		>
			<Skeleton loading={diseases.isLoading} />

			<div className="disease-list-wrapper">
				{diseases.data?.map((disease) => (
					<DiseaseItem key={disease.name} disease={disease} />
				))}
			</div>
		</ScrollableContainer>
	);
};
