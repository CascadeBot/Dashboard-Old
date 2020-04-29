<script>
  import { Router, Link, Route } from "svelte-routing";
  import General from "./General.svelte";
  import Wrapper from "../../components/layout/Wrapper.svelte";

  export let url = "/server/:id";
  export let id;
</script>

<template>
	<Router url="{url}">
		<nav>
			<Link to="../../select">server select</Link>
			<Link to="/">home</Link>
			<Link to="general">General</Link>
		</nav>
    <Wrapper>
			<Route path="general" component="{General}" />
			<Route path="/">
        <h1>Server dashboard. this is server {id}</h1>
      </Route>
    </Wrapper>
	</Router>
</template>
