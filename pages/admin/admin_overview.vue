<template>
<div> 
  <div class="center-container">
    <div class="dashboard-text">
      {{ dashBoardText }}
    </div>

    <div class="test-main-container">
    
    <button class="test-container test-container--red" @click="updateChart('onlineUsers' , '#b51f1f')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> {{ onlineUsersCount }}</div>
          <div class="test-container-text-lower"> Users</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="onlineUser" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Users</div>
      </div>
    </button>

    <button class="test-container test-container--yellow" @click="updateChart( 'dailyTrades' , '#bcbf0d')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> 5</div>
          <div class="test-container-text-lower"> Trades</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="trade" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Trades</div>
      </div>
    </button>

    <button class="test-container test-container--blue" @click="updateChart( 'listedTrades' , '#1248b5')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> 5</div>
          <div class="test-container-text-lower"> Listed</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="listed" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Products</div>
      </div>
    </button>


    <button class="test-container test-container--green">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> NULL</div>
          <div class="test-container-text-lower"> NULL</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="onlineUser" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> NULL</div>
      </div>
    </button>
  </div>

    <!-- <div class="containers">
    <button class="container container--red" @click="updateChart('onlineUsers' , '#b51f1f')" draggable="false">
    
     
      <img class="ImageLoader" :src="onlineUser" alt="User image" draggable="false">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Online Users
        </div>
        
        <div class="section section-bottom">
          {{ onlineUsersCount }}
        </div>
      </div>

    </button>

    <button class="container container--yellow" @click="updateChart( 'dailyTrades' , '#bcbf0d')" draggable="false">
      
      <img class="ImageLoader" :src="trade" alt="Trade image" draggable="false">   
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>
      </div>
    </button> 


    <button class="container container--blue" @click="updateChart( 'listedTrades' , '#1248b5')" draggable="false">
       
      <img class="ImageLoader" :src="listed" alt="listed image" draggable="false">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Listed products
        </div>
        
        <div class="section section-bottom">
          562
        </div> 
       </div>  

    </button>
    <button class="container container--green" draggable="false">

      <img class="ImageLoader" :src="trade" alt="Trade image" draggable="false">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          implement
        </div>
        
        <div class="section section-bottom">
          will.i.am
        </div>
      </div> 

     </button>
    <button class="container container--red" draggable="false">
       
       <img class="ImageLoader" :src="trade" alt="Trade image" draggable="false">  
      
      
      <div class="white-box">
        
        <div class="section section-top">
          Daily trades
        </div>
        
        <div class="section section-bottom">
          23
        </div>
      </div>
    </button>
    </div>   -->
    
    <div class="chart-container">
    
      <div class="chart-buttons">
        <button class="chart-button"> 1w </button>
        <button class="chart-button"> 1m </button>
        <button class="chart-button"> 3m </button>
        <button class="chart-button"> 1y </button>
      
        <div class="chart-text">
          hejje
        </div>
      

      </div>

      <div class="chart">
        <apexchart type="area" :options="chartOptions" :series="chartSeries">
        </apexchart>
      </div> 
      
      <!-- <div class="chart-buttons">
        <v-btn class="chart-button"> 1w </v-btn>
        <v-btn class="chart-button"> 1m </v-btn>
        <v-btn class="chart-button"> 3m </v-btn>
        <v-btn class="chart-button"> 1y </v-btn>
      </div>   -->
    </div> 
  </div>


  <!-- <div class="test-main-container">
    
    <button class="test-container test-container--red" @click="updateChart('onlineUsers' , '#b51f1f')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> {{ onlineUsersCount }}</div>
          <div class="test-container-text-lower"> Users</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="onlineUser" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Users</div>
      </div>
    </button>

    <button class="test-container test-container--yellow" @click="updateChart( 'dailyTrades' , '#bcbf0d')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> 5</div>
          <div class="test-container-text-lower"> Trades</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="trade" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Users</div>
      </div>
    </button>

    <button class="test-container test-container--blue" @click="updateChart( 'listedTrades' , '#1248b5')">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> 5</div>
          <div class="test-container-text-lower"> Listed</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="listed" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Users</div>
      </div>
    </button>


    <button class="test-container test-container--green">
      <div class="test-container-upper">
        <div class="test-container-lhs">
          <div class="test-container-text-upper"> 5</div>
          <div class="test-container-text-lower"> Users</div>
        </div>

        <div class="test-container-rhs">
          <img class="test-container-img" :src="onlineUser" alt="User image" draggable="false">
        </div>
      </div>

      <div class="test-container-lower">
        <div class="test-container-text-lower-lower"> Show Users</div>
      </div>
    </button>
  </div> -->


</div>

</template>

<script>

// Icons
import onlineUser from './admin_icons/user.png';             
import trade from './admin_icons/shoppingcart.png';
import listed from './admin_icons/listedproduct.png';
// Icons end

// packages
import VueApexCharts from 'vue-apexcharts';
// packages end

// fetchFuncs
import { getMembers } from '/pages/gqlFetch.js'

// fetchFuncs end

export default 
{
  components: 
  {
    apexchart: VueApexCharts
  },

  data() {
    return {
      
      usersList: [],
      onlineUser,
      trade,
      listed,
      onlineUsersCount: 0,
      activeTrades: 23,
      registerdUsers: 232,

      dashBoardText: "",

      chartSeries: //Date structure for chart
      [
        
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
          height: '100%',
          width: '100%',
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
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 0.4,
            stops: [0, 100],
            colorStops: [],
          }
        },
        colors: ['#5c26ff'],
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

    updateChart(data, color)
    {
      //const newData = JSON.parse(JSON.stringify(data));
      switch(data)
      {
        case "onlineUsers":
          this.chartSeries = this.dataOnlineUsr;
          break;

        case "dailyTrades":
          this.chartSeries = this.dataTrades;  
          break;

        case "listedTrades":
          this.chartSeries = this.dataListedTrades;  
          break;
      }
      this.updateChartOptions(color);
    },

    updateChartOptions(color)
    {
      const newChartOptions = Object.assign({}, this.chartOptions);
      newChartOptions.colors = [color]; // Change the color here based on your condition
      this.chartOptions = newChartOptions;
    },

    async getOnlineUsers()
    {
      this.usersList = await getMembers();
      this.onlineUsersCount = 0;
      console.log(this.usersList.length);
      for(let i = 0; i < this.usersList.length; i++)
      {
        if(this.usersList[i].status == "Online")
        {
          this.onlineUsersCount++;
        }
      }
    }
  },

  mounted()
  {
    this.getOnlineUsers();
    this.printDashboardText("Dashboard");
    this.updateChart("onlineUsers" , '#b51f1f')
  },
}

</script>

<style scoped>


.test-main-container
{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 2%;
}

.test-container-img
{
  width: 50%;
  height: 60%;
}

.test-container
{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 5px;
  width: 13vw;
  height: 15vh;
  /* width: 26vw;
  height: 30vh; */
}

.test-container--red
{
  background-color: #ff4558;
}

.test-container--blue
{
  background-color: #00abe0;
}

.test-container--yellow
{
  background-color:  #ffc000;
}

.test-container--green
{
  background-color: #00d282;
}


.test-container-lhs
{
  display: flex;
  flex-direction: column;
  padding-left: 10%;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  
}

.test-container-rhs
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  
}

.test-container-upper
{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 5%;
  width: 100%;
  height: 70%;
}

.test-container-lower
{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 30%;
  background-color: rgba(0, 0, 0, 0.138);
}


.test-container-text-upper
{
  font-size: 110%;
  font-weight: bold;
  color: white;
}

.test-container-text-lower
{
  font-size: 110%;
  color: white;
}

.test-container-text-lower-lower
{
  font-size: 100%;
  color: white;
}








.ImageLoader
{
  margin: 15px;
  width: 60px;
  height: 60px;
}

.center-container
{
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  gap: 30px;
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
  /* Change chartsize here!! */
  background-color: white;
  width: 100%;
  height: 90%;
}

.chart-buttons
{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1%;
  padding-left: 2%;
  width: 100%;
  height: 10%;
  border-bottom: 2px solid #d6dfe7;
}

.chart-button
{
  background-color: #e0e0e0;

  width: 5%;
  height: 70%;
  color: rgb(0, 0, 0);
  border-radius: 4px;
}

.chart-button:hover
{
  background-color: #999;
}

.chart-text
{
  padding-left: 23%;
  font-weight: bold;




}

.chart-container
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  width: 52vw;
  height: 60vh;
  background-color: #f6f6f6;
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
}

.containers
{
  display: flex;
  justify-content: center;
  align-items: center;  
  padding-left: 60px;
}

</style>