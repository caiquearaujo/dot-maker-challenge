import React from 'react';
import { DotHistory } from '../types';
import DotIcon from './DotIcon';

const ContainerPlayable: React.FunctionComponent = () => {
	const [history, setHistory] = React.useState<DotHistory>([]);
	const [cache, setCache] = React.useState<DotHistory>([]);

	const onUndoHandler = React.useCallback(() => {
		if (history.length === 0) {
			return;
		}

		const last = history[history.length - 1];

		setHistory(prevHistory => prevHistory.slice(0, -1));
		setCache(prevHistory => [...prevHistory, last]);
	}, [history]);

	const onRedoHandler = React.useCallback(() => {
		if (cache.length === 0) {
			return;
		}

		const last = cache[cache.length - 1];

		setHistory(prevHistory => [...prevHistory, last]);
		setCache(prevHistory => prevHistory.slice(0, -1));
	}, [cache]);

	const onClickHandler = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const { clientX, clientY } = e;

			if (cache.length > 0) {
				setCache([]);
			}

			setHistory(prevHistory => [...prevHistory, { x: clientX, y: clientY }]);
		},
		[cache],
	);

	return (
		<>
			<button
				onClick={onUndoHandler}
				className="bg-gray-200 text-xs p-3 uppercase font-bold rounded-sm bottom-0 fixed z-50">
				Undo
			</button>
			<button
				onClick={onRedoHandler}
				className="bg-gray-200 text-xs p-3 uppercase font-bold rounded-sm bottom-0 right-0 fixed z-50">
				Redo
			</button>
			<div className="w-screen h-screen" onClick={onClickHandler}>
				{history.map((dot, index) => (
					<DotIcon key={index} index={index} {...dot} />
				))}
			</div>
		</>
	);
};

export default ContainerPlayable;
