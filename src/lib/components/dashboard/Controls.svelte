<script>
    import { plugIn, unPlug, buttons } from "../controls/pad";

  </script>
  
  <svelte:window 
    on:gamepadconnected={plugIn}
    on:gamepaddisconnected={unPlug}
  />

  <h3 class="text-xl text-gray-700 font-bold">Controls</h3>
  <div class="flex flex-col items-center gap-5 p-3">
    <!-- Triggers -->
    <div class="flex gap-8">
      <!-- Left Trigger -->
      <div class="flex flex-col items-center">
        <div class="relative w-3 h-16 bg-base-200 rounded">
          <div
            class="absolute bottom-0 w-3 bg-accent rounded"
            style="height: calc({$buttons.triggers.l * 100}%);"
          ></div>
        </div>
      </div>

      <!-- Analog Stick -->
      <div class="relative w-16 h-16 rounded-full border-2 border-gray-200">
        <div
          class="absolute w-4 h-4 bg-accent rounded-full"
          style="top: 50%; left: 50%; transform: translate(calc(-50% + {$buttons.axis.x * 30}px), calc(-50% + {$buttons.axis.y * 30}px));"
        ></div>
      </div>
      
      <!-- Right Trigger -->
      <div class="flex flex-col items-center">
        <div class="relative w-3 h-16 bg-base-200 rounded">
          <div
            class="absolute bottom-0 w-3 bg-accent rounded"
            style="height: calc({$buttons.triggers.r * 100}%);"
          ></div>
        </div>
      </div>
    </div>
    
  <!-- Buttons -->
  <div class="flex items-center gap-4">
    <button class="w-12 h-12 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center" class:opacity-50={!$buttons.btns.a}>
      <i class="fa-solid fa-camera"></i>
    </button>

    <button class="w-12 h-12 rounded-full bg-secondary text-white text-xl font-bold flex items-center justify-center" class:opacity-50={!$buttons.btns.x}>
    <i class="fa-solid fa-bolt"></i>
    </button>
  </div>  
</div>
  