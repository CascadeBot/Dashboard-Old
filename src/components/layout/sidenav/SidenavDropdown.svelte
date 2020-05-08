<template>
  <div class="current">
    <div class="img"></div>
    <div class="content">
      <p class="name">Zach heyde Zach heyde Zach heyde Zach heyde Zach heyde</p>
      <p class="count">152 members</p>
    </div>
  </div>
</template>

<style lang="scss">
  @use "vars";

  .current {
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
</style>
