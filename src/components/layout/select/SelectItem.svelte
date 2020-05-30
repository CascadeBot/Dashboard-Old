<script>
  import { Link } from "svelte-routing";

  export let iconUrl = "";
  export let id = "";
  export let name = "";
  export let memberCount = 0;
  export let isBigList = false;
  export let skeleton = false;

  let iconStyles;
  $: iconStyles = iconUrl ? `background-image: url('${iconUrl}');` : "";

  // TODO add chevron on big-list
</script>

<template>
  {#if skeleton}
    <div class="select-item skeleton">
      <div class="select-item-container">
        <div class="img"></div>
        <div class="text-wrap">
          <p class="name"></p>
          <p class="count"></p>
        </div>
      </div>
    </div>
  {:else}
    <div class="select-item" class:big-list={isBigList}>
      <Link to="/server/{id}">
        <div class="select-item-container">
          <div class="img" style={iconStyles}></div>
          <div class="text-wrap">
            <p class="name">{name}</p>
            <p class="count">{memberCount} members</p>
          </div>
        </div>
      </Link>
    </div>
  {/if}
</template>

<style lang="scss">
  @use 'vars';

  .select-item {
    display: inline-block;
    margin: .75rem;
    cursor: pointer;

    &.skeleton {
      cursor: initial;
    }

    &:hover :global(a .select-item-container) {
      transform: scale(1.05);
      background-color: vars.$bg_300;
    }

    &:hover :global(a .select-item-container .img) {
      background-color: vars.$bg_500;
    }
  }

  .select-item :global(a) {
    text-decoration: none;
    color: vars.$text_highlight;

    &:focused, &:visited {
      color: vars.$text_highlight;
      text-decoration: none;
    }
  }

  .select-item :global(a .select-item-container),
  .select-item .select-item-container {
    transition: transform 50ms ease-in-out;
    background-color: vars.$bg_200;
    border-radius: 5px;
    padding: 2rem 1rem;
    width: 9rem;
    height: 12rem;
    text-align: center;
  }

  .select-item :global(a .select-item-container .img),
  .select-item .select-item-container .img {
    height: 7rem;
    width: 7rem;
    margin: 0 1rem;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
    background-color: vars.$bg_400;
  }

  .select-item :global(a .select-item-container .name),
  .select-item .select-item-container .name {
    color: vars.$text_highlight;
    margin-bottom: .2rem;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    line-height: 1.5em;
    height: 3em;
    width: 9rem;
  }

  .select-item :global(a .select-item-container .count),
  .select-item .select-item-container .count {
    color: vars.$text_color;
    margin: 0;
  }

  /* big list */
  .select-item.big-list {
    margin: .25rem;

    &:hover :global(a .select-item-container) {
      transform: initial;
      background-color: vars.$bg_300;
    }

    :global(a .select-item-container) {
      background-color: vars.$bg_200;
      width: 25rem;
      height: auto;
      display: flex;
      flex-direction: row;
      text-align: left;
      padding: .75rem;
    }

    :global(a .select-item-container .text-wrap) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }

    :global(a .select-item-container .img) {
      height: 3.5rem;
      width: 3.5rem;
      margin: 0 .75rem;
    }

    :global(a .select-item-container .name) {
      color: vars.$text_highlight;
      margin: 0 0 .15rem 0;

      -webkit-line-clamp: 1;
      line-height: 1.5rem;
      height: 1.3rem;
    }

    :global(a .select-item-container .count) {
      font-size: 14px;
    }
  }
</style>
