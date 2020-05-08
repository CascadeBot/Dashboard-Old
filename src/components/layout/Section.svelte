<template>
  <div class="section">
    <slot />
  </div>
</template>

<style lang="scss">
  @use "vars";

  .section {
    padding: 2rem;
    background-color: vars.$bg_200;
    border-radius: 5px;
  }
</style>
