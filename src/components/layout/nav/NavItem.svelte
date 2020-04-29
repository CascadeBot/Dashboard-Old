<script>
  import { Link } from "svelte-routing";
  export let to = undefined;
  export let href = undefined;
</script>

<template>
  <span>
    {#if to}
      <Link to={to}><slot /></Link>
    {:else}
      <a href={href}><slot /></a>
    {/if}
  </span>
</template>

<style lang="scss">
  @use 'vars';

  span {
    :global(a), :global(a):focus, :global(a):visited {
      text-decoration: none;
      color: vars.$text_color;
      padding: .2rem .5rem;
      margin-left: .5rem;

      &:hover {
        color: vars.$text_muted;
      }
    }
  }
</style>
