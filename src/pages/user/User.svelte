<script>
  import { Router, Link, Route } from "svelte-routing";
  import Wrapper from "../../components/layout/Wrapper.svelte";
  import Sidenav from "../../components/layout/sidenav/Sidenav.svelte";
  import SidenavCategory from "../../components/layout/sidenav/SidenavCategory.svelte";
  import SidenavItem from "../../components/layout/sidenav/SidenavItem.svelte";

  import Account from "./Account.svelte";
  import NotFound from "../server/404.svelte";

  export let url = "/profile";
</script>

<template>
	<Router url="{url}">
    <Wrapper>
      <div slot="sidenav">
        <Sidenav>
          <SidenavCategory>
            <SidenavItem to="./">Your account</SidenavItem>
            <SidenavItem to="patreon">Patreon status</SidenavItem>
            <SidenavItem to="privacy">Account privacy</SidenavItem>
          </SidenavCategory>
        </Sidenav>
      </div>
			<Route path="/" component="{Account}" />
			<Route component="{NotFound}" />
    </Wrapper>
	</Router>
</template>
