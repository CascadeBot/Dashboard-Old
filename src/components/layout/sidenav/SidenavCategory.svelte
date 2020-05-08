<script>
  export let name = "";
</script>

<template>
  <div class="content">
    {#if name.length > 0}
      <p>{name}</p>
    {/if}
    <slot />
  </div>
</template>

<style lang="scss">
  @use 'vars';

  .content {
    margin-top: 1rem;
  }

  p {
    text-transform: uppercase;
    font-size: 14px;
    margin: 0;
    margin-bottom: .2rem;
    color: vars.$text_color;
  }
</style>
