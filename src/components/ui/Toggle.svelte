<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let state = false;

  function click() {
    state = !state;
  }
</script>

<template>
  <div>
    <div class="toggle-container" on:click={click}>
      <div class="toggle" class:on={state}></div>
      <p class="text"><slot /></p>
    </div>
  </div>
</template>

<style lang="scss">
  @use "vars";

  $w: 2.2rem;
  $h: 1.05rem;
  $pad: .2rem;
  $side_pad: 0.02rem;

  .toggle-container {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.75rem;
    cursor: pointer;
    user-select: none;

    .text {
      margin: 0;
      color: vars.$text_highlight;
      padding-left: .75rem;
    }

    .toggle {
      width: $w;
      position: relative;
      height: $h;
      border-radius: #{$h / 2};
      background-color: vars.$ui_bg;

      &:hover {
        background-color: vars.$ui_bg_hover;
      }

      &::before {
        content: "";
        transition: left 100ms ease-in-out;
        position: absolute;
        left: $side_pad;
        margin: $pad;
        height: #{$h - ($pad * 2)};
        width: #{$h - ($pad * 2)};
        background-color: white;
        border-radius: 50%;
      }

      &.on {
        background-color: vars.$ui_primary;

        &:hover {
          background-color: vars.$ui_primary_hover;
        }

        &::before {
          left: #{$w - ($side_pad * 2) - ($h)}
        }
      }
    }
  }
</style>
