<script lang="ts">
    let props = $props();
</script>

<!-- Template connection status -->
<div class="relative h-full">
    <h3 class="text-xl font-bold">Connection status</h3>
    <span><i class="fa-solid fa-circle text-success me-3"></i>Connected to <span class="text-primary-content font-bold">Diggy-1.0</span></span><br />
    <span><i class="fa-solid fa-wifi text-info me-2"></i><span class="text-gray-700 font-bold">Wireless mode </span> 192.168.1.100</span><br />
    <span><i class="fa-solid fa-signal text-info me-2"></i><span class="text-gray-700 font-bold">Signal strength </span> 10dBm</span><br />
    <span><i class="fa-regular fa-clock text-info me-3"></i><span class="text-gray-700 font-bold">Scanning time </span> 10s</span><br />
    <div class="absolute bottom-0 left-0 flex justify-start gap-2 w-full mt-2">
        <button class="btn btn-sm btn-primary" ><i class="fa-solid fa-star"></i>AI Inspection</button>
        <button class="btn btn-sm btn-neutral" on:click={() => props.scene_data.resetPosition()}>Reset 3D view</button>
    </div>
</div>

