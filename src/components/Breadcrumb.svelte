<script>
  export let parts = [];

  let prefix = "";
  let suffix = "";
  $: suffix = parts.pop();
  $: prefix = parts.join(" / ") + " / ";
</script>

<template>
  {#if parts.length > 0}
    <p><span class="clr">{ prefix }</span>{ suffix }</p>
  {/if}
</template>

<style lang="scss">
  @use "vars";

  p {
    color: vars.$text_highlight;
    font-size: 14px;
    margin: 0;

    .clr {
      color: vars.$text_color;
    }
  }
</style>
