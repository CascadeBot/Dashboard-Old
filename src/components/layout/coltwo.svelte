<template>
  <div class="container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .container {
    display: flex;

    .left {
      flex: 1;
    }
  }
</style>
