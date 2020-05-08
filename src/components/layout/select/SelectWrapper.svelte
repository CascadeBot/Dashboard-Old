<script>
  export let isBigList
</script>

<template>
  <div class="select-wrapper" class:big-list={isBigList}>
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .select-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rem;
    max-width: 100%;
    flex-wrap: wrap;

    &.big-list {
      justify-content: flex-start;
      width: 54rem;
    }
  }
</style>
