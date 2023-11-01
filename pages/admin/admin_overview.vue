<template>
  <div>
    <div class="center-container">
      <div class="dashboard-text">
        {{ dashBoardText }}
      </div>

      <div class="test-main-container">

      <div class="test-container test-container--red">
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
          <button class="test-container-lower-lhs" @click="updateChart('online' , '#b51f1f')">
            Online
          </button>
          <button class="test-container-lower-rhs" @click="updateChart( 'registered' , '#b51f1f')">
            Registered
          </button>
        </div>
      </div>

      <div class="test-container test-container--yellow">
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
          <button class="test-container-lower-lhs" @click="updateChart('transactions' , '#bcbf0d')">
            Transactions
          </button>
          <button class="test-container-lower-rhs" @click="updateChart( 'volume' , '#bcbf0d')">
            Volume
          </button>
        </div>
      </div>

      <div class="test-container test-container--blue">
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
          <button class="test-container-lower-lhs" @click="updateChart('offers' , '#1248b5')">
            Offers
          </button>
          <button class="test-container-lower-rhs" @click="updateChart( 'wants' , '#1248b5')">
            Wants
          </button>
        </div>
      </div>

      <div class="test-container test-container--green">
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
          <button class="test-container-lower-lhs" @click="updateChart('onlineUsers' , '#b51f1f')">
            NULL
          </button>
          <button class="test-container-lower-rhs" @click="updateChart( 'dailyTrades' , '#bcbf0d')">
            NULL
          </button>
        </div>
      </div>
      </div>



      <div class="chart-container">

        <div class="chart-buttons">
          <button class="chart-button"> 1w </button>
          <button class="chart-button"> 1m </button>
          <button class="chart-button"> 3m </button>
          <button class="chart-button"> 1y </button>

          <div class="datepicker-container">
            <Datepicker range circle class="datepicker"  placeholder="Custom date" lang="en"/>
          </div>


          <div class="chart-text-box">
            <div class="chart-text">
              UTC:{{  utcTime}}
            </div>
          </div>


        </div>

        <div class="chart">
          <apexchart type="area" :options="chartOptions" :series="chartSeries">
          </apexchart>
        </div>
      </div>
    </div>

  <!--   <v-network-graph
      class="graph"
      :nodes="nodes"
      :edges="edges"
    /> -->
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
  import 'vue-datepicker-ui/lib/vuedatepickerui.css';
  import VueDatepickerUi from 'vue-datepicker-ui';
  /* import "v-network-graph/lib/style.css";
  import VNetworkGraph from "v-network-graph";  */


  // packages end

  // fetchFuncs
  import { getMembers } from '/pages/gqlFetch.js'

  // fetchFuncs end

  export default
  {
    components:
    {
      Datepicker: VueDatepickerUi,
      apexchart: VueApexCharts

    },

    data() {
      return {
        utcTime: null,
        usersList: [],
        onlineUser,
        trade,
        listed,
        onlineUsersCount: 0,
        activeTrades: 23,
        registerdUsers: 232,
        dashBoardText: "",


        selectedDate: [
          new Date(),
          new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)],

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
        // graphql get data for all functions
        switch(data)
        {
          case "online":
            this.chartSeries = this.dataOnlineUsr;
            break;
          case "registered":
            this.chartSeries = this.dataTrades;
            break;
          case "transactions":
            this.chartSeries = this.dataTrades;
            break;
          case "volume":
            this.chartSeries = this.dataOnlineUsr;
            break;
          case "offers":
            this.chartSeries = this.dataTrades;
            break;
          case "wants":
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

      getUTCTime(displaySeconds)
      {
        const currentDate = new Date();
        const utcTime = currentDate.toISOString();
        if(displaySeconds)
          this.utcTime = utcTime.slice(11, 19)
        else
          this.utcTime = utcTime.slice(11, 16)
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
      this.updateChart("online" , '#b51f1f');
      this.getUTCTime(false);

      this.timer = setInterval(() => {
        this.getUTCTime(false);
      }, 1000);






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
    flex-direction: row;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.138);


  }

  .test-container-lower-rhs
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 100%;
    width: 50%;
    height: 100%;
    color: rgb(255, 255, 255);
    border-left: 1px rgba(0, 0, 0, 0.200) solid;
  }

  .test-container-lower-rhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }

  .test-container-lower-lhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }



  .test-container-lower-lhs
  {

    flex-direction: row;
    font-size: 100%;
    width: 50%;
    height: 100%;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px rgba(0, 0, 0, 0.200) solid;
  }



  .test-container-text-upper
  {
    font-size: 110%;
    font-weight: bold;
    color: white;
    user-select: none;
  }

  .test-container-text-lower
  {
    font-size: 110%;
    color: white;
    user-select: none;
  }

  .test-container-text-lower-lower
  {
    flex-direction: row;
    font-size: 100%;
    width: 100%;
    height: 100%;
    color: rgb(255, 255, 255);
  }

  .center-container
  {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    gap: 30px;
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
    height: 88%;
    color: rgb(0, 0, 0);
    border-radius: 4px;
  }

  .chart-button:hover
  {
    background-color: #999;
  }
  .chart-text-box
  {
    display: flex;
    justify-content: flex-end;
    width: 43%;
  }
  .chart-text
  {
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
  .dashboard-text
  {
    color: black;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
    user-select: none;
  }

  .datepicker-container
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 70%;


  }

  .datepicker
  {


    /* Background color  */
    --v-calendar-input-bg-color: #e0e0e0;

    /* Icon size och storlek */
    --v-calendar-datepicker-icon-color: #000000;
    --v-calendar-datepicker-icon-size: 1.0rem;

    /* Storlek på inputen texten */
    --v-calendar-input-font-size: 1.0rem;
    --v-calendar-input-font-weight: 500;
    --v-calendar-input-text-color: #000000;



    /* Inne i kalendern header */
    --v-calendar-view-button-font-size: 1rem;
    --v-calendar-select-bg-color: #e0e0e0;

  }


  .test-switchbox
  {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px
  }

  </style>