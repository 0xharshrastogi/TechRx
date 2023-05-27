import { type CSSProperties, type FC } from 'react';
import './Logo.scss';

interface LogoProps {
	color?: string;

	size?: keyof typeof fontSize;
}

const fontSize = {
	default: '1rem',
	small: '0.75rem',
};

export const Logo: FC<LogoProps> = (props) => {
	const { color, size } = props;
	const styles: CSSProperties = { color, fontSize: fontSize[size ?? 'default'] };

	return (
		<span className="app-logo" style={styles}>
			Pharma Connect
		</span>
	);
};
