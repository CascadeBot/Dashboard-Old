<script>
  import { Link } from "svelte-routing";
</script>

<template>
  <h1>This is the selection screen</h1>
  <p>Quite fascinating isn't it?</p>
  <br>
  <br>
  <Link to="/server/1234">go to server 1234</Link>
  <Link to="/server/abcd">go to server abcd</Link>
</template>

<style lang="scss">
  h1 {
    color: lightblue;
  }
</style>
