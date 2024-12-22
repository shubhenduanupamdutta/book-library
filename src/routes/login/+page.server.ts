import { PUBLIC_FRONTEND_URL } from '$env/static/public';
import { fail, redirect, type Actions } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	email: string;
	password: string;
	passwordConfirmation?: never;
	name?: never;
	errors: string[];
}

export const actions: Actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		// going to do something with given event
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const returnObject: ReturnObject = {
			success: true,
			email,
			password,
			errors: []
		};

		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (password.length < 6) {
			returnObject.errors.push('Password must be at least 6 characters');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		// Registration Flow

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !data.user) {
			returnObject.success = false;
			console.log('There has been an error', error);
			return fail(400);
		}

		redirect(303, '/private/dashboard');
	},
	googleLogin: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${PUBLIC_FRONTEND_URL}/auth/callback`
			}
		});

        if (error) {
            return fail(400, {
                message: "Something went wrong with Google login",
            })
        }

        throw redirect(303, data.url);
	}
};
