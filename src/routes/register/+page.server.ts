import type { Actions } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	errors: string[];
}

export const actions: Actions = {
	default: async ({ request }) => {
		// going to do something with given event
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			errors: []
		};

		if (name.length < 3) {
			console.log('Name if too short');
			returnObject.errors.push('The name is too short. Must be at least 3 characters');
		}

		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (password.length < 6) {
			returnObject.errors.push('Password must be at least 6 characters');
		}

		if (password !== passwordConfirmation) {
			returnObject.errors.push('Passwords do not match');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		// Registration Flow
    
		return returnObject;
	}
};
