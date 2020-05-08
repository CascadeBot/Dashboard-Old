<script>
  import Button from "../../Button.svelte";

  export let isBigList;

  const addToServer = (event) => {
    alert("Didn't implement this yet");
  }
</script>

<template>
  <div class="addserver-card" class:big-list={isBigList}>
    <p>Can't find your server?</p>
    <Button on:click={addToServer}>Add server</Button>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .addserver-card {
    display: flex;
    background-color: vars.$bg_200;
    border-radius: 5px;
    padding: 1rem;
    margin: .75rem 0;
    align-items: center;

    &.big-list {
      margin: .25rem 0;
      width: 53.5rem;
      box-sizing: border-box;
    }

    p {
      flex: 1;
      color: white;
      margin: 0;
      width: 15rem;
    }
  }
</style>
