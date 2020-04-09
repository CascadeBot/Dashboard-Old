<template>
	<main>
		<h1>Hello oof {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</main>
</template>

<script>
	export let name;
</script>

<style lang="scss">
	$color: blue;

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			color: $color;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>