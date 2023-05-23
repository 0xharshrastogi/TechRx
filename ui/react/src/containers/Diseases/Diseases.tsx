import { useEffect, useState, type FC } from 'react';
import { type IDisease } from '../../common/types/diseases';
import { ScrollableContainer } from '../../components';
import { DiseaseItem } from './DiseaseItem';
import './Diseases.scss';

const diseasesList: IDisease[] = [
	{
		name: 'Influenza (Flu)',
		id: '1',
		doctors: [
			{ name: 'Omid Arming', id: '1', image: 'https://unsplash.com/photos/xOjzehJ49Hk' },
			{
				id: '2',
				name: 'Taylor Lawrence',
				image:
					'https://images.unsplash.com/photo-1581710862156-04096e758c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
			},
		],
	},
	{ name: 'Tuberculosis', id: '2', doctors: [{ name: 'Harsh', id: '1' }] },
	{ name: 'Malaria', id: '3', doctors: [{ name: 'Harsh', id: '1' }] },
	{ name: 'Diabetes', id: '4', doctors: [{ name: 'Harsh', id: '1' }] },
	{
		name: "Parkinson's disease",
		id: '6',
		doctors: [
			{
				name: 'Erik Stark',
				id: '1',
				image:
					'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1066&q=80',
			},
			{ name: 'Omid Arming', id: '1', image: 'https://unsplash.com/photos/xOjzehJ49Hk' },
		],
	},
	{
		name: 'Influenza (Flu)',
		id: '1',
		doctors: [{ name: 'Omid Arming', id: '1', image: 'https://unsplash.com/photos/xOjzehJ49Hk' }],
	},
	{ name: 'Tuberculosis', id: '2', doctors: [{ name: 'Harsh', id: '1' }] },
	{ name: 'Malaria', id: '3', doctors: [{ name: 'Harsh', id: '1' }] },
	{ name: 'Diabetes', id: '4', doctors: [{ name: 'Harsh', id: '1' }] },
	// {
	// 	name: "Parkinson's disease",
	// 	id: '6',
	// 	doctors: [
	// 		{
	// 			name: 'Erik Stark',
	// 			id: '1',
	// 			image:
	// 				'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1066&q=80',
	// 		},
	// 		{ name: 'Omid Arming', id: '1', image: 'https://unsplash.com/photos/xOjzehJ49Hk' },
	// 	],
	// },
];

export const Diseases: FC = () => {
	const [diseases, setDiseases] = useState<IDisease[]>([]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDiseases(diseasesList);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<ScrollableContainer
			className="disease-container"
			heading={<>Diseases</>}
			style={{
				flexGrow: 1,
			}}
		>
			<div className="disease-list-wrapper">
				{diseases.map((disease) => (
					<DiseaseItem key={disease.id} disease={disease} />
				))}
			</div>
		</ScrollableContainer>
	);
};
