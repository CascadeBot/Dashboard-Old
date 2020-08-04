<script>
  import Button from "../Button.svelte";

  export let linked = false;
  export let tier = "default";

  const tierMap = {
    default: "Default tier",
    small: "Small tier",
    medium: "Medium tier",
    hardcode: "Hardcode tier"
  }

</script>

<template>
  <div class="container">
    {#if !linked}
      <p>No Patreon account linked</p>
      <Button type="primary">Link account</Button>
    {:else}
      <div class="tier">
        <!-- TODO actual icon-->
        <div class="tier-icon"></div>
        <p>{tierMap[tier]}</p>
      </div>
      <Button type="tertiary">Unlink account</Button>
    {/if}
  </div>
</template>

<style lang="scss">
  @use "vars";

  .container {
    background-color: #21242D;
    border-radius: 4px;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tier {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-weight: bold;
        color: vars.$text_highlight;
      }
    }

    .tier-icon {
      height: 2rem;
      width: 2rem;
      background-color: vars.$bg_500;
      border-radius: 2px;
      margin: 1rem 1rem 1rem 0;
    }
  }
</style>
