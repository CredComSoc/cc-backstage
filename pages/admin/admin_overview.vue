<template>
  <div class="text-center">
    Online users: {{ getOnlineUserCount() }}
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default 
{
  

  components: 
  {
  apexchart: VueApexCharts
  },



  data() 
  {
    return {
      

      onlineUsers: 5,
      activeTrades: 23,
      registerdUsers: 232,

      timeHorizont: 
      [
        {time:"today"},
        {time:"week"},
        {time:"month"},
        {time:"year"},
      ],

      usersList: 
      [  // Fake users array
        { id: 1, name: "John Doe", email: "john.doe@example.com", status: "online" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "offline" },
        { id: 3, name: "Bob Brown", email: "bob.brown@example.com", status: "away" },
      ], 


      // Data structure for ApexCharts
      series:
      [
        {
          name: '# of Trades',
          data: [12, 19, 3, 5, 2], // fake data
        }
      ],



      chartOptions:
      {
        chart: 
        {
          type: 'line',
          zoom: 
          {
            enabled: false
          },
          height: '100',  // Height of the chart
          width: '100',
        },
        fill: 
        {
          type: 'solid',
          opacity: 0.7
        },
        dataLabels: 
        {
          enabled: false
        },
        stroke: 
        {
          curve: 'smooth'
        },
        xaxis: 
        {
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
      }
    
    };
  },

  methods: 
  {
    getOnlineUserCount()
    {
      let counter = 0;
      for(let i = 0 ; i < this.usersList.length; i++)
      {
        if(this.usersList[i].status == "online")
        {
          counter++;
        }

      }
      return counter;
    }
  }


}



</script>
