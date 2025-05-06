<script lang="ts">
  import { onMount } from "svelte";
  import { createScene } from "$lib/components/dashboard/3Dscene";
  import { connectWebSocket } from "$lib/components/controls/ws";
  import Navbar from "$lib/components/Navbar.svelte";
  import CameraFilter from "$lib/components/dashboard/CameraFilter.svelte";
  import Status from "$lib/components/dashboard/Status.svelte";
  import Controls from "$lib/components/dashboard/Controls.svelte";
  import Charts from "$lib/components/dashboard/Charts.svelte";
  import Typewriter from 'svelte-typewriter'
  
  // Test - webcam IP stream server
  const cameraStream = "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJtIjoiY2JzIiwidiI6ImM1MDgiLCJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsInNoYXJlTGluayI6Imh0dHBzOi8vdzMubXAubHVyYS5saXZlL3BsYXllci9wcm9kL3YzL2FudmxvYWQuaHRtbD9rZXk9ZXlKaGJuWmhZMnNpT2lJMVZrUTJSWGxrTm1ScVpYZGlRMjFPZDBKR2JuTkthakUzV1VGMlIxSjNiQ0lzSW1WNGNHVmpkRkJ5WlhKdmJHd2lPblJ5ZFdVc0ltVjRjR1ZqZEZCeVpYSnZiR3hVYVcxbGIzVjBJam8xTENKb2RHMXNOU0k2ZEhKMVpTd2liU0k2SW1OaWN5SXNJbkJzZFdkcGJuTWlPbnNpWTI5dGMyTnZjbVVpT25zaVl6TWlPaUp6WVc1bWNtRnVZMmx6WTI4dVkySnpiRzlqWVd3dVkyOXRJaXdpWTJ4cFpXNTBTV1FpT2lJek1EQXdNREl6SW4wc0ltUm1jQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbUZrVkdGblZYSnNJam9pYUhSMGNEb3ZMM0IxWW1Ga2N5NW5MbVJ2ZFdKc1pXTnNhV05yTG01bGRDOW5ZVzF3WVdRdllXUnpQM042UFRKNE1seDFNREF5Tm1sMVBTODBNVEk0TDJOaWN5NXpabHgxTURBeU5tTnBkVjl6ZW5OY2RUQXdNalpwYlhCc1BYTmNkVEF3TWpablpHWndYM0psY1QweFhIVXdNREkyWlc1MlBYWndYSFV3TURJMmIzVjBjSFYwUFhodGJGOTJZWE4wTWx4MU1EQXlOblZ1ZG1sbGQyVmtYM0J2YzJsMGFXOXVYM04wWVhKMFBURmNkVEF3TWpaMWNtdzlXM0psWm1WeWNtVnlYM1Z5YkYxY2RUQXdNalprWlhOamNtbHdkR2x2Ymw5MWNtdzlXMlJsYzJOeWFYQjBhVzl1WDNWeWJGMWNkVEF3TWpaamIzSnlaV3hoZEc5eVBWdDBhVzFsYzNSaGJYQmRJaXdpYTJWNVZtRnNkV1Z6SWpwN0ltTmhkR1ZuYjNKcFpYTWlPaUpiVzBOQlZFVkhUMUpKUlZOZFhTSXNJbkJ5YjJkeVlXMGlPaUpiVzFCU1QwZFNRVTFmVGtGTlJWMWRJaXdpYzJsMFpWTmxZM1JwYjI0aU9pSjJhV1JsYnkxbGVIQmxjbWxsYm1ObEluMTlmU3dpYUdWaGNuUmlaV0YwUW1WMFlTSTZleUpoWTJOdmRXNTBJam9pWTJKemJHOWpZV3d0WjJ4dlltRnNMWFZ1YVdacFpXUWlMQ0pqYUdGd2RHVnlWSEpoWTJ0cGJtY2lPbVpoYkhObExDSmpkWE4wYjIxTlpYUmhaR0YwWVNJNmV5SjJhV1JsYnlJNmV5SmpZbk5mYldGeWEyVjBJam9pYzJGdVpuSmhibU5wYzJOdkxtTmljMnh2WTJGc0xtTnZiU0lzSW1OaWMxOXdiR0YwWm05eWJTSTZJbVJsYzJ0MGIzQWlmWDBzSW1OMWMzUnZiVlJ5WVdOcmFXNW5VMlZ5ZG1WeUlqb2lZMkp6WkdsbmFYUmhiRzFsWkdsaExtUXhMbk5qTG05dGRISmtZeTV1WlhRaUxDSmpkWE4wYjIxVWNtRmphMmx1WjFObGNuWmxjbE5sWTNWeVpTSTZJbU5pYzJScFoybDBZV3h0WldScFlTNWtNUzV6WXk1dmJYUnlaR011Ym1WMElpd2lhbTlpU1dRaU9pSnpZMTkyWVNJc0ltMWhjbXRsZEdsdVowTnNiM1ZrU1dRaU9pSTRNak5DUVRBek16VTFOamMwT1RkR04wWXdNREF4TURGQVFXUnZZbVZQY21jaUxDSndTVzV6ZEdGdVkyVWlPaUp3TUNJc0luQnliMlpwYkdVaU9pSmpZbk1pTENKd2RXSnNhWE5vWlhKSlpDSTZJbU5pYzJ4dlkyRnNJaXdpZEhKaFkydHBibWRUWlhKMlpYSWlPaUpqWW5Oa2FXZHBkR0ZzYldWa2FXRXVhR0l1YjIxMGNtUmpMbTVsZENJc0luWmxjbk5wYjI0aU9pSXhMalVpZlN3aWJXOWhkQ0k2ZXlKamJHbGxiblJUYVdSbElqcDdJbkJoY25SdVpYSkRiMlJsSWpvaVkySnpiRzlqWVd4aGJuWmhkRzkyYVdSbGJ6RTRNVGN6TWpZd09UUXpNU0o5Zlgwc0luUnZhMlZ1SWpvaVpHVm1ZWFZzZENJc0luWWlPaUpqTlRBNEluMCIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4MiZpdT0vNDEyOC9jYnMuc2YmY2l1X3N6cyZpbXBsPXMmZ2RmcF9yZXE9MSZlbnY9dnAmb3V0cHV0PXhtbF92YXN0MiZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnVybD1bcmVmZXJyZXJfdXJsXSZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF0mY29ycmVsYXRvcj1bdGltZXN0YW1wXSIsImtleVZhbHVlcyI6eyJjYXRlZ29yaWVzIjoiW1tDQVRFR09SSUVTXV0iLCJwcm9ncmFtIjoiW1tQUk9HUkFNX05BTUVdXSIsInNpdGVTZWN0aW9uIjoidmlkZW8tZXhwZXJpZW5jZSJ9fX0sImhlYXJ0YmVhdEJldGEiOnsiYWNjb3VudCI6ImNic2xvY2FsLWdsb2JhbC11bmlmaWVkIiwiY2hhcHRlclRyYWNraW5nIjpmYWxzZSwiY3VzdG9tTWV0YWRhdGEiOnsidmlkZW8iOnsiY2JzX21hcmtldCI6InNhbmZyYW5jaXNjby5jYnNsb2NhbC5jb20iLCJjYnNfcGxhdGZvcm0iOiJkZXNrdG9wIn19LCJjdXN0b21UcmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0IiwiY3VzdG9tVHJhY2tpbmdTZXJ2ZXJTZWN1cmUiOiJjYnNkaWdpdGFsbWVkaWEuZDEuc2Mub210cmRjLm5ldCIsImpvYklkIjoic2NfdmEiLCJtYXJrZXRpbmdDbG91ZElkIjoiODIzQkEwMzM1NTY3NDk3RjdGMDAwMTAxQEFkb2JlT3JnIiwicHJvZmlsZSI6ImNicyIsInB1Ymxpc2hlcklkIjoiY2JzbG9jYWwiLCJ0cmFja2luZ1NlcnZlciI6ImNic2RpZ2l0YWxtZWRpYS5oYi5vbXRyZGMubmV0IiwidmVyc2lvbiI6IjEuNSJ9LCJtb2F0Ijp7ImNsaWVudFNpZGUiOnsicGFydG5lckNvZGUiOiJjYnNsb2NhbGFudmF0b3ZpZGVvMTgxNzMyNjA5NDMxIn19fSwiaHRtbDUiOnRydWUsInRva2VuIjoiZGVmYXVsdCJ9"
  
  // Camera thermal filter - TODO: remove
  let thermalFilter = $state(false);
  function toggleFilter() {
    thermalFilter = !thermalFilter;
  }

  let scene = $state();

  // 3D pipe scene
  let pipe_render: HTMLCanvasElement;
  onMount(() => { // Init on DOM load
    scene = createScene(pipe_render);
    connectWebSocket();
  });
</script>

<Navbar/>
<CameraFilter></CameraFilter>

<div id="container" class="px-6 mt-5 mb-5">
  <!-- First row -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <!-- 3D pipe rendering -->
    <div  class="border-2 border-gray-200 bg-base-100 rounded-lg">
      <div class="relative" >
        <canvas  id="view3d"  class="rounded-lg w-full" bind:this={pipe_render}></canvas>
        <div class="absolute top-0 left-0 bg-gray-500 bg-opacity-75 text-white text-md font-bold px-2 py-1 rounded-br rounded-tl">
          3D View
        </div>
      </div>
    </div>

    <div class="relative border-2 border-gray-200 bg-base-100 rounded-lg flex items-center justify-center">
      <!-- Iframe stream -->
      <iframe class="rounded-lg w-full h-[50vh] {thermalFilter ? 'thermal' : ''}" src={cameraStream} marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>
      <div class="absolute top-0 left-0 bg-gray-500 bg-opacity-75 text-white text-md font-bold px-2 py-1 rounded-br rounded-tl">
        Camera
      </div>
    </div>
  </div>

  <!-- Controls section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
    <!-- Connection status -->
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <Status scene_data={scene}></Status>
      <button class="btn btn-primary" on:click={toggleFilter}>Toggle</button>
    </div>
    <!-- Gamepad controls -->
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <Controls/>
    </div>
    <!-- Ai tooltip -->
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <h3 class="text-xl font-bold">AI summary</h3>
      <Typewriter>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
      </Typewriter>
    </div>
  </div>

  <!-- Charts -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <h3 class="text-xl font-bold mb-2"><i class="fa-solid fa-temperature-half me-1"></i> Current temperature</h3>
      <Charts></Charts>
    </div>

    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <h3 class="text-xl font-bold mb-2"><i class="fa-solid fa-droplet me-1"></i> Current humidity</h3>
      <Charts type="hum"></Charts>
    </div>
  </div>
  
</div>
