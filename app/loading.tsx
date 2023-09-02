import { SpinningLoader } from "@/components/icons";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
	return (
		<>
			<SpinningLoader />
		</>
	);
};

export default loading;
