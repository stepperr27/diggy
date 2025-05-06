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
  const cameraStream = ""
  
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
      <h1>Camera non disponibile nella versione demo!</h1>
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
    </div>
    <!-- Gamepad controls -->
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <Controls/>
    </div>
    <!-- Ai tooltip -->
    <div class="bg-base-100 p-4 rounded-lg border-2 border-gray-200">
      <h3 class="text-xl font-bold">AI summary</h3>
      <Typewriter>
        <p>
          La temperatura interna si mantiene stabile a 20 gradi, mentre l’umidità rilevata è pari all’80%, valore piuttosto elevato che potrebbe contribuire a fenomeni corrosivi. Il tratto di condotto analizzato è lineare. È stata rilevata una zona danneggiata a circa 4.3 metri dal punto di accesso.
        </p>
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
