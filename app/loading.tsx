import { SpinningLoader } from "@/components/icons";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
	return (
		<div>
			<SpinningLoader />
		</div>
	);
};

export default loading;
