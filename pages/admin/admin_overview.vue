<template>
 
  
<div>  

    <!-- Text -->
    
  
    <!-- Icon layout -->
    <v-row align="center" justify="center">
      <v-col cols="1">
        
        <div class="dashboard-text">
          {{ dashBoardText }}
        </div>     
        
        <div class="containers">
    <div class="container container--red" @click="displayOnlineUserData">
    
      
      <!-- Image icon -->
      <img class="ImageLoader" :src="onlineUser" alt="User image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Online Users
        </div>
        
        <div class="section section-bottom">
          5
        </div>

      </div>

      
    </div>

    <div class="container container--yellow" @click="displayTradeData">
      <!-- Image icon -->
      <img class="ImageLoader" :src="trade" alt="Trade image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>

      </div>
    </div>


    <div class="container container--blue">
      <!-- Image icon -->
      <img class="ImageLoader" :src="listed" alt="listed image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Listed products
        </div>
        
        <div class="section section-bottom">
          562
        </div>

      </div>

      
    </div>

    <div class="container container--green">
      <!-- Image icon -->
      <img class="ImageLoader" :src="trade" alt="Trade image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          implement
        </div>
        
        <div class="section section-bottom">
          will.i.am
        </div>

      </div>

      
    </div>

    <div class="container container--red">
      <!-- Image icon -->
      <img class="ImageLoader" :src="trade" alt="Trade image">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>

      </div>

      
    </div>

        </div>  
      </v-col>
    </v-row>
   
    
     <v-row align="center" justify="center">
      <v-col cols="8">  
        <apexchart type="area" :options="chartOptions" :series="chartSeries" height="550" width = "100%">
        </apexchart>
      </v-col>
    </v-row>
  

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

      chartSeries:
      [
        {}
      ],

      dataOnlineUsr:
      [
        {
          name: '# of Online',
          data: [5, 7, 3, 11, 1], // fake data
        }
      ],



      dataTrades:   //Date structure for chart
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
            type: 'vertical',
            shadeIntensity: 1,
            gradientToColors: ['#FF0000'], // default endpoint color
            opacityFrom: 0.9,
            opacityTo: 0.4,
            stops: [0, 100]
          }
        },
        dataLabels: 
        {
          enabled: true
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

    displayOnlineUserData()
    {
      this.chartSeries = this.dataOnlineUsr;
      const newGradient = 
      {
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#FF0000'], // red
        opacityFrom: 0.9,
        opacityTo: 0.4,
        stops: [0, 100]
      };
      this.updateChartOptions(newGradient);
    },

    displayTradeData()
    {
      this.chartSeries = this.dataTrades;
      const newGradient = 
      {
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['#FFD700'], // gold for example
        opacityFrom: 0.9,
        opacityTo: 0.4,
        stops: [0, 100]
      };
      this.updateChartOptions(newGradient);
    },


    updateChartOptions(gradient) 
    {
    this.chartOptions = Object.assign({}, this.chartOptions, 
      {
        fill: 
        {
         type: 'gradient',
         gradient: gradient
        }
      });
    }




  },

  mounted()
  {
    this.printDashboardText("Dashboard");
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
  transform: scale(1.1);
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
  
}


</style>