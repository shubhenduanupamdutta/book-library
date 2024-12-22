<script lang="ts">
	import { Button } from '$components';
	import type { ActionData as LoginActionData } from '../../routes/login/$types';
	import type { ActionData as RegisterActionData } from '../../routes/register/$types';
	type ActionData = RegisterActionData | LoginActionData;

	interface ComponentProps {
		isRegistration: boolean;
		form: ActionData;
	}
	let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
	<h1 class="mb-l">{isRegistration ? 'Register' : 'Login'}</h1>
	<div class="form-and-social-login">
		<form
			class="auth-form"
			method="POST"
			action={isRegistration ? '' : '/login/?/signInWithPassword'}
		>
			{#if form && form.errors?.length}
				{#each form.errors as error}
					<div class="auth-error"><p>{error}</p></div>
				{/each}
			{/if}
			{#if isRegistration}
				<input placeholder="Name" type="text" name="name" value={form?.password || ''} />
			{/if}
			<input placeholder="Email" type="text" name="email" value={form?.password || ''} />
			<input placeholder="Password" type="password" name="password" value={form?.password || ''} />
			{#if isRegistration}
				<input placeholder="Confirm Password" type="password" name="passwordConfirmation" />
			{/if}
			<Button type="submit">{isRegistration ? 'Register' : 'Login'}</Button>
			<p class="auth-hint mt-s">
				{#if isRegistration}
					Already have an account? <a href="/login">Log In</a>
				{:else}
					Do not have and account yet? <a href="/register">Register</a>
				{/if}
			</p>
		</form>
		<div class="social-login">
			<form method="POST" action={isRegistration ? '/login/?/googleLogin' : '?/googleLogin'}>
				<Button type="submit">Login with Google</Button>
			</form>
		</div>
	</div>
</div>

<style>
	.auth-container {
		margin-top: 40px;
	}

	.form-and-social-login {
		display: flex;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		align-items: start;
		border-right: 1px solid grey;
		padding-right: 80px;
		width: 40%;
	}

	.auth-form input {
		width: 100%;
		margin-bottom: 12px;
	}

	.auth-form input:last-of-type {
		margin-bottom: 30px;
	}

	.social-login {
		padding-left: 80px;
		width: 40%;
	}

	.auth-hint {
		font-size: 1rem;
		color: grey;
	}

	.auth-error {
		background-color: rgb(122, 35, 35);
		color: white;
		font-size: 1rem;
		border-radius: 0.7rem;
		padding: 12px;
		width: 100%;
		margin-bottom: 0.5rem;
	}

	.auth-error:last-of-type {
		margin-bottom: 1rem;
	}
</style>
