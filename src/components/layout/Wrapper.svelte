<template>
  <div class="wrapper">
    <div class="nav">
      <slot name="sidenav" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .wrapper {
    display: flex;
    max-width: vars.$max_width;
    width: 100vw;
    box-sizing: border-box;
    margin: 0 auto;
    flex-direction: row;
    flex: 1;
  }

  .content {
    flex: 1;
  }
</style>
