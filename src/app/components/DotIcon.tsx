import React from 'react';

export type DotIconProps = {
	index: number;
	x: number;
	y: number;
};

const DotIcon: React.FC<DotIconProps> = ({ index, x, y }) => (
	<div
		className="bg-red-600 w-3 h-3 rounded-full fixed text-white flex items-center justify-center font-bold"
		style={{ top: y, left: x, fontSize: '8px' }}>
		{index + 1}
	</div>
);

export default DotIcon;
