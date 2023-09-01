"use client";

import { FC } from "react";
import { Analytics } from "@vercel/analytics/react";

interface AnalyticsProviderProps {}

const AnalyticsProvider: FC<AnalyticsProviderProps> = ({}) => {
	return (
		<Analytics
			beforeSend={(event) => {
                // Ignore redirect pathnames, we will track this data ourselves
				if (event.url.includes("r/")) {
					return null;
				}
				return event;
			}}
		/>
	);
};

export default AnalyticsProvider;
