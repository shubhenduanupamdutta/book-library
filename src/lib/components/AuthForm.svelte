<script lang="ts">
	import { Button } from '$components';

	interface ComponentProps {
		isRegistration: boolean;
	}
	let { isRegistration }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
	<h1 class="mb-l">{isRegistration ? 'Register' : 'Login'}</h1>
	<div class="form-and-social-login">
		<form class="auth-form">
			{#if isRegistration}
				<input placeholder="Name" type="text" name="name" />
			{/if}
			<input placeholder="Email" type="text" name="email" />
			<input placeholder="Password" type="password" name="password" />
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
		<div class="social-login"></div>
	</div>
</div>
