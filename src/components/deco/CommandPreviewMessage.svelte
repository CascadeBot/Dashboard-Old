<script>
  export let deleted = false;
  export let botMessage = false;
  export let embed = true;
  export let prefix = ";";
  export let time = "12 minutes";

  export let userName = "";
  export let iconUrl = null;

  $: iconStyles = iconUrl ? `background-image: url('${iconUrl}')` : "";
</script>

<template>
  <div class="message" class:disabled={deleted}>
    <div class="icon" style={iconStyles}></div>
    <div class="right">
      <div class="user">
        <span class="name bot" class:bot={botMessage}>{userName}</span>
        {#if deleted}
          <span class="time">*deleted*</span>
        {:else}
          <span class="time">{time} ago</span>
        {/if}
      </div>
      <div class="content">
        {#if botMessage}
        <div class="embed green" class:noembed={!embed}>
          <div class="content">
            <h2 class="title">Now playing hacknest OST</h2>
            <p>loaded <span class="code">12</span> tracks, <span class="code">2:52:01</span> in length</p>
          </div>
        </div>
        {:else}
          {prefix}play hacknet ost
        {/if}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .message {
    display: flex;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    &.disabled {
      opacity: .5;
    }

    .icon {
      background-color: vars.$bg_400;
      width: 2.7rem;
      height: 2.7rem;
      border-radius: 4rem;
      margin-right: 1rem;
      background-size: cover;
      background-position: center;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .user {
        color: vars.$text_muted;

        .name {
          color: vars.$text_highlight;
          margin-right: .5rem;

          &.bot::after {
            content: "bot";
            display: inline;
            background-color: vars.$blue_tag;
            color: white;
            text-transform: uppercase;
            border-radius: 3px;
            margin-left: .4rem;
            font-size: .7rem;
            padding: .1rem .3rem;
          }
        }
      }

      > .content {
        color: vars.$text_color;
        margin-top: .2rem;
        word-break: break-all;
      }
    }
  }

  .embed {
    background-color: vars.$bg_400;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    margin-top: .5rem;

    &.green::before {
      content: "";
      background-color: vars.$embed_green;
      width: .2rem;
    }

    > .content {
      flex: 1;
      padding: 1rem;

      .title {
        font-size: 1rem;
        color: vars.$text_highlight;
        margin: 0 0 .7rem 0;
      }

      p {
        color: vars.$text_color;
        margin: 0;

        .code {
          display: inline;
          background-color: vars.$embed_code;
          padding: .1rem .4rem;
          color: vars.$text_highlight;
          border-radius: 3px;
          margin: 0 .2rem;
        }
      }
    }
  }

  .embed.noembed {
    &::before {
      display: none;
    }

    background-color: transparent;
    display: block;

    > .content {
      padding: 0;
    }
  }
</style>
