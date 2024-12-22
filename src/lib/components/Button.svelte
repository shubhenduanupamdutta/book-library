<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BasicProps {
		children: Snippet;
		isSecondary?: boolean;
		isDanger?: boolean;
		isMenu?: boolean;
	}

	interface ButtonProps extends BasicProps {
		onclick?: (e: MouseEvent) => void;
		href?: never;
		type?: 'submit' | 'button';
	}

	interface LinkProps extends BasicProps {
		href: string;
		onclick?: never;
	}

	type ComponentProps = ButtonProps | LinkProps;

	let { children, href, onclick, isSecondary, isDanger, isMenu, ...props }: ComponentProps =
		$props();
</script>

{#if href}
	<a
		{href}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-danger={isDanger}
		class:btn-menu={isMenu}
	>
		{@render children()}
	</a>
{:else}
	<button
		{...props}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-danger={isDanger}
		class:btn-menu={isMenu}
	>
		{@render children()}
	</button>
{/if}

<style>
	a {
		display: block;
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}
	.btn {
		padding: 0.7rem 1.4rem;
		min-width: 13rem;
		text-align: center;
		background-color: black;
		border-radius: 0.7rem;
		color: white;
		border: 1px solid white;
		font-weight: normal;
		font-size: 1.28rem;
	}

	.btn-secondary {
		background-color: white;
		color: black;
		border: 1px solid black;
	}

	.btn-danger {
		background-color: rgb(136, 4, 4);
	}

	.btn-menu {
		min-width: 8.75rem;
		padding: 0.47rem 1.17rem;
	}
</style>
