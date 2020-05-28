<script>
  export let checked = false;

  function click() {
    checked = !checked;
  }
</script>

<template>
  <div class="checkbox-container" on:click={click}>
    <div class="checkbox" class:on={checked}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <rect class="bg" width="18" height="18" rx="3"/>
        <g transform="translate(3.759 4.302)">
          <line class="line" x2="4.047" y2="4.245" transform="translate(0 4.852)" stroke-linecap="round" stroke-width="2"/>
          <path class="line" d="M7,0,3.5,4.549,0,9.1" transform="translate(4.5)" stroke-linecap="round" stroke-width="2"/>
        </g>
      </svg>
    </div>
    <p class="text"><slot /></p>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .checkbox-container {
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

    .checkbox {
      height: 1rem;
      width: 1rem;

      svg {
        .bg {
          transition: fill 25ms ease-in-out;
          fill: vars.$ui_bg;
        }
        .line {
          transition: stroke 25ms ease-in-out;
          stroke: vars.$ui_bg;
        }
      }

      &:hover {
        svg .bg {
          fill: vars.$ui_bg_hover;
        }
        svg .line {
          stroke: vars.$ui_bg_hover;
        }
      }

      &.on {
        svg {
          .bg {
            fill: vars.$ui_primary;
          }
          .line {
            stroke: vars.$text_highlight;
          }
        }

        &:hover {
         svg .bg {
          fill: vars.$ui_primary_hover;
        }
      }
      }
    }
  }
</style>
