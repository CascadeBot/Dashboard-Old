<script>
  export let color = "blue";
</script>

<template>
  <div class={"label " + color}>
    <slot/>
  </div>
</template>

<style lang="scss">
  .label {
    display: inline;
    padding: .2rem .5rem;
    font-weight: bold;
    letter-spacing: 1.1;
    border-radius: 3px;
    font-size: .7rem;
    text-transform: uppercase;

    &.blue {
      background-color: #285ba7;
      color: white;
    }
  }
</style>
