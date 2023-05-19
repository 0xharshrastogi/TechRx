import classNames from 'classnames';
import { type DetailedHTMLProps, type FC, type ReactNode } from 'react';
import './ScrollableContainer.scss';

type ElementProps<T> = DetailedHTMLProps<React.HTMLAttributes<T>, T>;

interface ScrollableContainerProps {
	heading?: JSX.Element;

	children: ReactNode;
}

export const ScrollableContainer: FC<ScrollableContainerProps & ElementProps<HTMLDivElement>> = (
	props
) => {
	const { heading: title, className, children, ...rest } = props;

	return (
		<div className={classNames('scrollable-container-wrapper', className)} {...rest}>
			<header className="header">
				<span className="title">{title}</span>
			</header>

			<div className="scrollable-container">{children}</div>
		</div>
	);
};
