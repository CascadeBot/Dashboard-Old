<script>
  import { getContext } from "svelte";
  import { fade, fly } from 'svelte/transition';

  let user = getContext("user");

  let open = false;
  let zindexShow = false;
</script>

<template>
  {#if open}
      <div class="overlay"
        on:click={()=>{open = false}}
        on:outroend={()=>{zindexShow = false}}
        on:introstart={()=>{zindexShow = true}}
        transition:fade={{ duration: 100 }}></div>
    {/if}
  <div class="user-dropdown" class:higher={zindexShow}>
    <div class="user" class:open={zindexShow} on:click={()=>{open = !open}}>
      <div class="user-icon" style={$user.data.Discord.avatarURL?`background-image:url('${$user.data.Discord.avatarURL}');`:""}></div>
      <p>{$user.data.Discord.username}<span>#{$user.data.Discord.discriminator}</span></p>
      <div class="triangle" class:open={open}></div>
    </div>
    <div class="dropdown-positioner">
      {#if open}
        <div class="dropdown" transition:fly={{ y: -10, duration: 100 }}>
          <p class="link">Account & premium</p>
          <p class="link">Privacy settings</p>
          <p class="link red">Log out</p>
        </div>
      {/if}
    </div>
  </div>
</template>

<style lang="scss">
@use "vars";

.user-dropdown {
  position: relative;
  &.higher {
    z-index: 51;
  }
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0,0,0,0);
  transition: background-color 50ms ease-in-out;

  &:hover, &.open {
    background-color: vars.$bg_200;
  }

  &.open:hover {
    background-color: vars.$bg_300;
  }

  .user-icon {
    background-color: vars.$bg_400;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    margin-right: .5rem;
    background-size: cover;
    background-position: center;
  }

  p {
    margin-right: .5rem;
    color: vars.$text_highlight;

    span {
      color: vars.$text_muted;
    }
  }
}

.dropdown-positioner {
  position: relative;
  height: 0;
}

.dropdown {
  background-color: vars.$bg_200;
  position: absolute;
  top: .5rem;
  right: 0;
  width: 15rem;
  border-radius: 5px;
  padding: .5rem 0;

  .link {
    margin: 0;
    padding: .7rem 1rem;
    background-color: rgba(0,0,0,0);
    transition: background-color 50ms ease-in-out;
    cursor: pointer;
    color: vars.$text_color;

    &.red {
      color: vars.$text_red;
    }

    &:hover {
      background-color: vars.$bg_300;
    }
  }
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
