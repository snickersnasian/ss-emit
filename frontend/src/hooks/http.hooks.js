import { useState, useCallback } from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
		setLoading(true);
		try {
			if (body) {
				body = JSON.stringify(body);
				headers["Content-Type"] = "application/json";
			}

			// console.log(body);

			const res = await fetch(url, {
				method: method,
				body: body,
				headers: headers,
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Something went wrong");
			}

			setLoading(false);

			return data;
		} catch (e) {
			setLoading(false);
			setError(e.message);
			// throw e
		}
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return { loading, request, error, clearError };
};
