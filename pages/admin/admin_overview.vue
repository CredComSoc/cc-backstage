<template>
 
  
<div> 

    

        
  <div class="dashboard-text">
    {{ dashBoardText }}
  </div>     
        
  <div class="containers">
    <button class="container container--red" @click="displayOnlineUserData">
    
      

      <img class="ImageLoader" :src="onlineUser" alt="User image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Online Users
        </div>
        
        <div class="section section-bottom">
          5
        </div>

      </div>

      
    </button>

    <button class="container container--yellow" @click="displayTradeData">
      
      <img class="ImageLoader" :src="trade" alt="Trade image">   
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>

      </div>
    </button> 


    <button class="container container--blue" @click="displayListedData">
       
      <img class="ImageLoader" :src="listed" alt="listed image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Listed products
        </div>
        
        <div class="section section-bottom">
          562
        </div> 

       </div>  

      
    </button>

    <button class="container container--green">

      <img class="ImageLoader" :src="trade" alt="Trade image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          implement
        </div>
        
        <div class="section section-bottom">
          will.i.am
        </div>

      </div> 

      
     </button>

    <button class="container container--red">
       
       <img class="ImageLoader" :src="trade" alt="Trade image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>

      </div>
    </button>

  </div>  
    

  <div class="chart-container">

    <div>
      <apexchart type="area" :options="chartOptions" :series="chartSeries" class="chart">
      </apexchart>
    </div>

    <div class="chart-buttons">
      <v-btn> 1w </v-btn>
      <v-btn> 1m </v-btn>
      <v-btn> 3m </v-btn>
      <v-btn> 1y </v-btn>
    </div>
  </div>



  

</div>

 

</template>

<script>

// Icons

import onlineUser from './admin_icons/user.png';             
import trade from './admin_icons/shoppingcart.png';
import listed from './admin_icons/listedproduct.png';
// Icons end

// imports
import VueApexCharts from 'vue-apexcharts'
// imports end

export default {

  components: 
  {
    apexchart: VueApexCharts
  },

  data() 
  {
    return {
      
      onlineUser,
      trade,
      listed,
      onlineUsersCount: 5,
      activeTrades: 23,
      registerdUsers: 232,

      dashBoardText: "",

      chartSeries: //Date structure for chart
      [
        {}
      ],

      
      dataListedTrades:
      [
        {
          name: '# of Listed',
          data: [500, 349, 675, 110, 99], // fake data
        }
      ],
      
      
      dataOnlineUsr:
      [
        {
          name: '# of Online',
          data: [5, 7, 3, 11, 1], // fake data
        }
      ],

      dataTrades:   
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
          type: 'area',
          zoom: 
          {
            enabled: false
          },
        },
        fill: 
        {
          type: 'gradient',
          gradient: 
          {
            
          }
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
          categories: ['1/10', '2/10', '3/10', '4/10', '5/10']
        },

      
      
      }

    };
  },


  methods: 
  {
    getOnlineUserCount()
    {
      //Fråga graphql, onlineMembers()
      let counter = 0;
      for(let i = 0 ; i < this.usersList.length; i++)
      {
        if(this.usersList[i].status == "online")
        {
          counter++;
        }

      }
      return counter;
    },
  
    printDashboardText(targetText)
    { 
      for(let i = 0; i < targetText.length; i++)
      {
        setTimeout(() => 
        {
          this.dashBoardText += targetText.charAt(i);
        }, i *40);
      }
    },

    // Displays the onlineusers data in the graph.
    displayOnlineUserData()
    {
      this.chartSeries = this.dataOnlineUsr;
      const newGradient = 
      {
        type: 'vertical',
        shadeIntensity: 1.0,
        gradientToColors: ['#f50707'], // red
        gradientFromColors: ['#f50707'],
        opacityFrom: 0.9,
        opacityTo: 0.4,
        stops: [0, 100],
        colorStops: [],
    
      };
      const newStrokeColor = '#FF0000'; // red
      this.updateChartOptions(newGradient, newStrokeColor);
    },

    // Displays the trade data in the graph.
    displayTradeData()
    {
      this.chartSeries = this.dataTrades;
      const newGradient = 
      {
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#FFD700'], // gold for example
        gradientFromColors: ['#FFD700'],
        opacityFrom: 0.9,
        opacityTo: 0.4,
        stops: [0, 100],
        colorStops: []
      };
      const newStrokeColor = '#FFD700'; // gold
      this.updateChartOptions(newGradient, newStrokeColor);
    },

    // Displays the listed data in the graph.
    displayListedData()
    {
      this.chartSeries = this.dataListedTrades;
      const newGradient = 
      {
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#0147AB'], 
        gradientFromColors: ['#0147AB'],
        opacityFrom: 0.9,
        opacityTo: 0.4,
        stops: [0, 100]
      };
      const newStrokeColor = '#0147AB'; 
      this.updateChartOptions(newGradient, newStrokeColor)
    },


    updateChartOptions(gradient, strokeColor) 
    {
    this.chartOptions = Object.assign({}, this.chartOptions, 
      {
        fill: 
        {
         type: 'gradient',
         gradient: gradient
        },
        stroke: {
        curve: 'smooth',
        colors: [strokeColor], // Set the stroke color here
      },
      });
    }

  },

  mounted()
  {
    this.printDashboardText("Dashboard");
    this.displayOnlineUserData();
  },

}


</script>

<style scoped>




.ImageLoader
{
  margin: 15px;
  width: 60px;
  height: 60px;
}

.white-box
{
  display: flex;          /* Make it a flex container */
  flex-direction: column; /* Stack children vertically */
  justify-content: center;/* Vertically center its children */
  align-items: center;    /* Horizontally center its children */
  height: inherit;
  width: 500px;
  border-radius: 0px 10px 10px 0px;
  background-color: rgb(255, 255, 255)
}

.container
{
  position: relative;
  display: flex;
  align-items: center;  /* Vertically center content */
  justify-content: flex-start;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
  margin-right: 50px;
  height: 160px;
  width: 180px;
  border-radius: 10px 50px 50px 10px;

  
}


.chart
{
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -30%);
  width: 40vw;
  height: 40vh;
}

.chart-buttons
{
  display: flex;
  flex-direction: column;
  gap:16px;
  width: 75px;
  margin-right: 350px;
  margin-top: 25px;
  color: white;
}

.chart-container
{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}



.container--blue
{
  background: rgb(2,0,36);
  background: linear-gradient(297deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 32%, rgba(0,212,255,1) 100%); 
}

.container--yellow
{
  background: rgb(2,0,36);
  background: linear-gradient(328deg, rgba(2,0,36,1) 0%, rgba(121,115,9,1) 39%, rgba(247,255,0,1) 100%);  
}

.container--green
{
  background: rgb(2,0,36);
  background: linear-gradient(328deg, rgba(2,0,36,1) 0%, rgba(9,121,9,1) 39%, rgba(20,255,0,1) 100%); 
}

.container--red
{
  background: rgb(2,0,36);
  background: linear-gradient(328deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 39%, rgba(255,0,0,1) 100%); 
}

.container:hover
{
  transform: scale(1.04);
}

.section
{
  align-items: center;  /* Vertically center content */
  text-align: center;
}

.section-top
{
  font: 26px;
  font-weight: bold;
  border-bottom: 1px solid rgb(0, 0, 0);  /* Divider between the sections */
  color: blue;
}

.section-bottom
{
  font-size: 26px;
  font-weight: bold;
  color: green
}


.dashboard-text
{
  color: black;
  font-size: 50px;
  font-weight: bold;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

.containers
{
  display: flex;
  justify-content: center;
  align-items: center;  
  padding-left: 60px;
}


</style>