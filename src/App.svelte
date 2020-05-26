<script>
  import { Router, Link, Route } from "svelte-routing";
  import { setContext, getContext, onDestroy } from "svelte";
  import { guilds } from "./state/guilds";
  import { getClient } from 'svelte-apollo';

  import Navbar from "./components/layout/nav/Navbar.svelte";
  import Brand from "./components/layout/nav/Brand.svelte";
  import NavItem from "./components/layout/nav/NavItem.svelte";

  import Server from "./pages/server/Server.svelte";
  import User from "./pages/user/User.svelte";
  import Select from "./pages/Select.svelte";
  import NotFound from "./pages/404.svelte";

  guilds.fetch(getClient());
  setContext("guilds", guilds);

  const user = getContext("user");
</script>

<template>
	<Router>
    <Navbar>
      <div slot="left">
        <Brand />
      </div>
      <div slot="right">
        <NavItem to="profile">{$user.data.Discord.username}</NavItem>
      </div>
    </Navbar>
		<div class="app-wrapper">
			<Route path="server/:id/*path/*other" component="{Server}" />
			<Route path="profile/*" component="{User}" />
			<Route path="/" component="{Select}" />
			<Route component="{NotFound}" />
		</div>
	</Router>
</template>

<style lang="scss">
.app-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
</style>
