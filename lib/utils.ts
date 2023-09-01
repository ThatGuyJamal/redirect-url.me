"use client"

export function extractCodeFromPath(path: string) {
  return path.split("/").pop();
}

export function isValidUrl(url: string): boolean {
	// Regular expression for a simple URL validation
	const urlPattern =
		/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
	return urlPattern.test(url);
}

export function isValidMaxLength(input: string, maxLength: number = 35): boolean {
	return input.length <= maxLength;
}

export function isValidEmail(email: string): boolean {
	// Regular expression for a basic email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}

export function isNumeric(input: string): boolean {
	// Regular expression for validating numeric values
	const numericPattern = /^[0-9]+$/;
	return numericPattern.test(input);
}

export function isStrongPassword(password: string): boolean {
	// Define your password strength rules here
	// Example: Password should be at least 8 characters and contain a mix of letters, numbers, and special characters
	const passwordPattern =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordPattern.test(password);
}

export function isValidDateFormat(dateString: string): boolean {
	// Regular expression for validating date formats (YYYY-MM-DD)
	const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
	return dateFormatPattern.test(dateString);
}
