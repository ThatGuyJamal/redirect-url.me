import "../../styles/wave-animation.css";

import React, { FC } from "react";

interface WaveAnimationProps {
	children: React.ReactNode;
}

const WaveAnimation: FC<WaveAnimationProps> = ({ children }) => {
	return (
		<div className="wave-animation">
			{children}
		</div>
	);
};

export default WaveAnimation;
