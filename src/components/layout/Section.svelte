<script>
  export let skeleton = false;
</script>

<template>
  <div class="section" class:skeleton={skeleton} class:skeleton-animation={skeleton}>
    <slot />
  </div>
</template>

<style lang="scss">
  @use "vars";

  .section {
    padding: 2rem;
    background-color: vars.$bg_200;
    border-radius: 5px;

    &.skeleton {
      height: 50vh;
    }
  }
</style>
