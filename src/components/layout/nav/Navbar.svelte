<template>
  <nav class="nav">
    <div class="left">
      <slot name="left"></slot>
      <slot />
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </nav>
</template>

<style lang="scss">
  @use "vars";

  .nav {
    display: flex;
    align-items: center;
    max-width: vars.$max_width;
    margin: 2rem auto .5rem auto;

    .left {
      display: flex;
      align-items: center;
      flex: 1;
    }
    :global(.left > *) {
      display: flex;
      align-items: center;
      margin-right: .5rem;
    }
    :global(.right > *) {
      display: flex;
      align-items: center;
      margin-left: .5rem;
    }
  }
</style>
