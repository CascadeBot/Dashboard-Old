<template>
  <h1><slot /></h1>
</template>

<style lang="scss">
  @use "vars";

  h1 {
    margin: .5rem 0 1rem 0;
    color: vars.$text_highlight;
    font-size: 1.75rem;
  }
</style>
