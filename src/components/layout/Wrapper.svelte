<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss">
  @use "vars";

  div {
    display: block;
    max-width: vars.$max_width;
    margin: 0 auto;
  }
</style>
