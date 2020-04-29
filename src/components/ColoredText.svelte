<template>
  <h1><slot></slot></h1>
</template>

<style lang="scss">
  @use "vars";

  h1 {
    color: vars.$primary_color;
  }
</style>
