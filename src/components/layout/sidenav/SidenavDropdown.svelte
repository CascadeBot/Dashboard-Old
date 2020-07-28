<script>
  import { fade, fly } from 'svelte/transition';
  import { Link } from "svelte-routing";

  export let servers = [];
  export let skeleton = false;
  export let id;

  /* dropdown */
  let open = false;
  let zindexShow = false;

  /* server selection */
  let selected = {};
  let styleStr = "";

  $: if (servers && servers.length > 0) {
    selected = servers.find((val) => val.id == id);

    if (selected && selected.Meta.iconURL)
      styleStr = `background-image: url('${selected.Meta.iconURL}');`
  }

</script>

<template>
  {#if skeleton}
    <div class="current skeleton-animation">
      <div class="img"></div>
    </div>
  {:else}
    {#if open}
      <div class="overlay"
        on:click={()=>{open = false}}
        on:outroend={()=>{zindexShow = false}}
        on:introstart={()=>{zindexShow = true}}
        transition:fade={{ duration: 100 }}></div>
    {/if}
    <div class="nav-dropdown" class:higher={zindexShow}>
      <div class="current" on:click={()=>{open = !open}}>
        <div class="img" style={styleStr}></div>
        <div class="content">
          <p class="name">{selected.Meta.name}</p>
          <p class="count">{selected.Meta.memberCount} member{#if selected.Meta.memberCount > 1}s{/if}</p>
        </div>
        <div class="triangle" class:open={open}></div>
      </div>
      <div class="server-container">
        {#if open}
          <div class="servers" transition:fly={{ y: -10, duration: 100 }}>
            {#each servers as server}
              <Link to="/server/{server.id}" on:click={()=>{open = false}}>
                <div class="server" style={server.id == id ? "display: none;" : ""}>
                  <div class="img" style={server.Meta.iconURL ? `background-image: url('${server.Meta.iconURL}');` : ""}></div>
                  <div class="content">
                    <p class="name">{server.Meta.name}</p>
                    <p class="count">{server.Meta.memberCount} member{#if server.Meta.memberCount > 1}s{/if}</p>
                  </div>
                </div>
              </Link>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</template>

<style lang="scss">
  @use "vars";

  .nav-dropdown {
    &.higher {
      position: relative;
      z-index: 51;
    }

    user-select: none;

    .current {
      position: relative;
      z-index: 55;
    }
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-top: 4px solid white;
    transition: transform 100ms ease-in-out;
    opacity: .8;

    &.open {
      transform: rotate(180deg);
    }
  }

  .server-container {
    display: block;
    position: relative;
  }

  .servers {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    margin-top: .3rem;
    background-color: vars.$bg_300;
    border-radius: 3px;
    overflow: hidden;

    > :global(a) {
      text-decoration: none;
      &:hover, &:active, &:focus, &:visited {
        text-decoration: none;
      }
    }
  }

  .current, .server {
    background-color: vars.$bg_300;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5rem .75rem;
    cursor: pointer;

    .img {
      height: 2.5rem;
      width: 2.5rem;
      margin-right: .75rem;
      border-radius: 5px;

      background-color: vars.$bg_500;
      background-size: cover;
      background-position: center;
    }

    .content {
      flex: 1;

      p {
        margin: 0;
      }

      .name {
        color: vars.$text_highlight;
        height: 1.3rem;
        overflow: hidden;
        width: 12rem;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count {
        font-size: 14px;
        color: vars.$text_color;
      }
    }

    &:hover {
      background-color: vars.$bg_400;

      .img {
        background-color: vars.$bg_600;
      }
    }
  }

  .server {
    border-radius: 0;
  }

  .overlay {
    background-color: black;
    opacity: .75;

    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
