<script>
  import { fade, fly } from 'svelte/transition';

  export let open = false;
  export let size = "";
</script>

<template>
  {#if open}
    <div class="container">
      <div class="overlay"
        on:click={()=>{open = false}}
        transition:fade={{ duration: 100 }}
      ></div>
      <div class={"modal " + size} transition:fly={{ y: -20, duration: 100 }}>
        <slot/>
      </div>
    </div>
  {/if}
</template>


<style lang="scss">
  @use "vars";

  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
      background-color: black;
      opacity: .75;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .modal {
      background-color: vars.$bg_200;
      border-radius: 7px;
      padding: 1.5rem 2rem;
      width: 22rem;
      position: relative;
      z-index: 100;

      &.medium {
        width: 24rem;
      }
    }
  }
</style>
