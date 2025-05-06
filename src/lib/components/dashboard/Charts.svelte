<script>
  import { Chart, Svg, Axis, Bars, Tooltip, Highlight, Area } from 'layerchart';
  import moment  from "moment";
  let dateSeriesData = $state([]);
  let props = $props();
  
  // let color = props.type == "hum" ? "secondary" : "primary"

  function updateData() {
    const lastTime = new Date();
    const newValue = Math.round(Math.random() * 10 + 7);

    // Aggiungi un nuovo punto dati
    dateSeriesData = [...dateSeriesData,   {
      "date": lastTime,
      "value": newValue
    }];

    // Rimuovi il punto più vecchio per mantenere il grafico scorrevole
    if (dateSeriesData.length > 10) {
        dateSeriesData.shift();
    }
  }
  updateData()
  const interval = setInterval(updateData, 3000);
</script>

{#if dateSeriesData.length < 2}
<div class="h-[300px] skeleton rounded-lg"></div>
{:else}

<div class="h-[300px]">
  <Chart
    data={dateSeriesData}
    x="date"
    y="value"
    yDomain={[0, null]}
    yNice
    padding={{ left: 16, bottom: 24 }}
    tooltip={{ mode: "bisect-x" }}
  >
    <Svg>
      <Axis placement="left" grid rule />
      <Axis
        placement="bottom"
        format={(d) => moment(d).format("hh:mm:ss")}
        rule
      />
      <Area
        line={{ class: `stroke-2 stroke-primary` }}
        class={`fill-primary/30`}
      />
      <Highlight points lines/>
    </Svg>
    <Tooltip.Root class="bg-white" let:data>
      <Tooltip.Header>{moment(data.date).format("hh:mm:ss")}</Tooltip.Header>
      <Tooltip.List>
        <Tooltip.Item label="Value" value={data.value} />
      </Tooltip.List>
    </Tooltip.Root>
  </Chart>
</div>
{/if}