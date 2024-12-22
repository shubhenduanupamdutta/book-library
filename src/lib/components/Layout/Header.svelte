<script lang="ts">
	import bookNestLogo from '$assets/app-logo.svg';
	import { Button } from '$components';
	import { getUserState } from '$components/state/user-state.svelte';

	let userContext = getUserState();
	let { user } = $derived(userContext);
</script>

<header>
	<a href="/">
		<img class="logo" src={bookNestLogo} alt="Got to home" />
	</a>
	<nav>
		<ul>
			{#if !user}
				<li>
					<Button isMenu={true} href="/register">Create Account</Button>
				</li>
				<li>
					<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
				</li>
			{:else}
				<li>{user.email}</li>
				<li>
					<Button isMenu={true} onclick={() => userContext.logout()}>Logout</Button>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
	}

	.logo {
		height: 72px;
	}

	ul {
		display: flex;
		column-gap: 24px;
    align-items: center;
	}
</style>
