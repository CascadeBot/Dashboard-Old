<script>
  import { Router, Link, Route } from "svelte-routing";

  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';

  console.log(WEB.API_URL)

  const client = new ApolloClient({ uri: `${WEB.API_URL}/graphql`,  credentials: 'include' });
  setClient(client);

  import Navbar from "./components/layout/nav/Navbar.svelte";
  import Brand from "./components/layout/nav/Brand.svelte";
  import NavItem from "./components/layout/nav/NavItem.svelte";

  import EnsureLogin from "./components/EnsureLogin.svelte";

  import Server from "./pages/server/Server.svelte";
  import Select from "./pages/Select.svelte";
  import ColoredText from "./components/ColoredText.svelte";

  export let url = "";
  import { userStore } from "./state/store"

  const discord = user
</script>


<template>
  <EnsureLogin />
  {#if $userStore.loggedIn}
	<Router url="{url}">
    <Navbar>
      <div slot="left">
        <Brand />
        <NavItem to="select">Select</NavItem>
      </div>
      <div slot="right">
        <NavItem to="select">{$userStore.discord.username}</NavItem>
      </div>
    </Navbar>
		<div>
			<Route path="server/:id/*" component="{Server}" />
			<Route path="select" component="{Select}" />
			<Route path="/">
        <ColoredText>I am (g)root</ColoredText>
      </Route>
		</div>
	</Router>
  {/if}
</template>
