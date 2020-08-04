<script>
  import Icon from "../Icon.svelte";

  export let href;
</script>

<template>
  <a {href}><slot/><Icon name="arrow"/></a>
</template>

<style lang="scss">
  @use "vars";

  a {
    color: vars.$blue_text;
    font-weight: bold;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;

    &.active, &:hover, &:visited, &:focus {
      color: vars.$blue_text;
      font-weight: bold;
      text-decoration: none;
    }

    :global(.icon) {
      margin-left: .3rem;
      transition: transform 50ms ease-in-out;
      transform: translateX(0);
    }

    &:hover {
      text-decoration: underline;
    }

    &:hover :global(.icon) {
      transform: translateX(.3rem);
    }
  }
</style>
