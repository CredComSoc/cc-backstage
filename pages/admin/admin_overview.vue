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
            <div class="test-container-text-upper" v-if="showOnline"> {{ onlineUsersCount }}</div>
            <div class="test-container-text-upper" v-if="!showOnline"> {{ registerdUsersCount }}</div>
            <div class="test-container-text-lower"> Users</div>
          </div>

          <div class="test-container-rhs">
            <img class="test-container-img" :src="onlineUser" alt="User image" draggable="false">
          </div>
        </div>

        <div class="test-container-lower">
          <button class="test-container-lower-lhs" v-if="!showOnline" @click="displayGraph('online')">
            Online
          </button>
          <button class="test-container-lower-lhs-pressed" v-if="showOnline" @click="displayGraph('online')">
            Online
          </button>
          
          <button class="test-container-lower-rhs" v-if="showOnline" @click="displayGraph('registered')">
            Registered
          </button>
          <button class="test-container-lower-rhs-pressed" v-if="!showOnline" @click="displayGraph('registered')">
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
          <button class="test-container-lower-lhs" @click="displayGraph('transactions')">
            Transactions
          </button>
          <button class="test-container-lower-rhs" @click="displayGraph('volume')">
            Volume
          </button>
        </div>
      </div>

      <div class="test-container test-container--blue">
        <div class="test-container-upper">
          <div class="test-container-lhs">
            <div class="test-container-text-upper" v-if="showOffers"> {{offerCount}}</div>
            <div class="test-container-text-upper" v-if="!showOffers"> {{wantCount}}</div>
            <div class="test-container-text-lower"> Listed</div>
          </div>
          <div class="test-container-rhs">
            <img class="test-container-img" :src="listed" alt="User image" draggable="false">
          </div>
        </div>
        <div class="test-container-lower">
          <button class="test-container-lower-lhs-pressed" v-if="showOffers" @click="displayGraph('offers')">
            Offers
          </button>
          <button class="test-container-lower-lhs" v-if="!showOffers" @click="displayGraph('offers')">
            Offers
          </button>
          <button class="test-container-lower-rhs" v-if="showOffers" @click="displayGraph('wants')">
            Wants
          </button>
          <button class="test-container-lower-rhs-pressed" v-if="!showOffers" @click="displayGraph('wants')">
            Wants
          </button>
        </div>
      </div>

      <div class="test-container test-container--green">
        <div class="test-container-upper">
          <div class="test-container-lhs">
            <div class="test-container-text-upper"> Network graph</div>
          </div>

          <div class="test-container-rhs">
            <img class="test-container-img" :src="nodeGraph" alt="Graph image" draggable="false">
          </div>
        </div>

        <button class="test-container-lower-graph" @click="hideGraph()">
            Display
        </button>
      </div>
    </div>



      <div class="chart-container">

        <div class="node-graph-container" v-if="!showChart">
           <network class="network" ref="network" v-if="!showChart"
            :nodes="nodes"
            :edges="edges"
            :options="options"
            :events="['selectNode', 'hoverNode']"
            @select-node="onNodeSelected"
            @hover-node="onNodeHovered">
          </network>
        </div>


        <div class="chart-buttons" v-if="showChart">
          <button class="chart-button" @click="weekGraph(currentChart)"> 1w</button>
          <button class="chart-button" @click="monthGraph(currentChart)"> 1m </button>
          <button class="chart-button" @click="ThreemonthGraph(currentChart)"> 3m </button>
          <button class="chart-button" @click="yearGraph(currentChart)"> 1y </button>

          <div class="datepicker-container">
            <Datepicker range showClearButton v-model="selectedDate" circle class="datepicker"  placeholder="Custom date" lang="en"
            @change="datePickRange(currentChart)"/>
          </div>


          <div class="chart-text-box" v-if="showChart">
            <div class="chart-text">
              UTC:{{  utcTime}}
            </div>
          </div>


        </div>

        <div class="chart" v-if="showChart">
          <apexchart ref="chart" type="area" :options="chartOptions" :series="chartSeries">
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
  import nodeGraph from './admin_icons/nodegraph.png';
  // Icons end

  // packages
  import VueApexCharts from 'vue-apexcharts';
  import 'vue-datepicker-ui/lib/vuedatepickerui.css';
  import VueDatepickerUi from 'vue-datepicker-ui';
  import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
  /* import "v-network-graph/lib/style.css";
  import VNetworkGraph from "v-network-graph";  */


  // packages end

  // fetchFuncs
  import { Network } from "vue-vis-network";
  import { getUserCount } from '/pages/gqlFetch.js';
  import { getAllArticles } from '/pages/gqlFetch.js';


  // fetchFuncs end

  export default
  {
    components:
    {
      Datepicker: VueDatepickerUi,
      apexchart: VueApexCharts,
      network: Network
    },


    data() {
      return {
        // Picture references
        onlineUser,
        trade,
        listed,
        nodeGraph,
        // ------------------
        
        currentChart: "online",

        // Dates 
        utcTime: null,
        currentDate: null,
        from: null,
        to: null,
        // ------------------        

        // Usr
        usersList: [],
        onlineUsersCount: 0,
        registerdUsersCount: 0,
        showOnline: true,
        // ------------------        
        
        // Trades
        offers: [],
        offerCount: 0,
        wants: [],
        wantCount: 0,
        listedCount: 0,
        activeTrades: 23,
        showOffers: true,
        // ------------------
        
        // Maps
        registeredUserMap: new Map(),
        onlineUserMap : new Map(),
        transactionsMap: new Map(),
        volumeMap: new Map(),
        offersMap: new Map(),
        wantsMap: new Map(),
        // ------------------  
        dashBoardText: "",
        showChart: true,
        
        // DatePicker
        selectedDate: 
        [
          new Date(),
          new Date(),
          //new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
        ],
        // ------------------



      dummytransactions:
      [
        // Transactions between pairs
        { from: "janne", to: "william" },
        { from: "janne", to: "adam" },
        { from: "adam", to: "astrid" },
        { from: "adam", to: "william" },
        { from: "william", to: "janne" },
        { from: "astrid", to: "john" },
        { from: "john", to: "adam" },
        { from: "adam", to: "william" },
        { from: "janne", to: "john" },
        { from: "john", to: "astrid" },
        { from: "william", to: "astrid" },
        { from: "janne", to: "emma" },
        { from: "emma", to: "william" },
        { from: "janne", to: "oliver" },
        { from: "oliver", to: "adam" },
        { from: "astrid", to: "william" },
        { from: "john", to: "emma" },
        { from: "oliver", to: "william" },
        { from: "william", to: "emma" },
        { from: "oliver", to: "dennis" },
        { from: "oliver", to: "tester1" },
        { from: "oliver", to: "tester2" },
        { from: "oliver", to: "tester3" },
        { from: "oliver", to: "tester4" },
        { from: "oliver", to: "tester5" },
        { from: "tester1", to: "tester6" },
        { from: "tester1", to: "tester7" },
        { from: "tester1", to: "tester8" },
        { from: "tester1", to: "tester9" },
        { from: "tester1", to: "tester10" },
        { from: "tester1", to: "tester11" },
        { from: "tester1", to: "tester12" },
        { from: "tester1", to: "tester13" },
      ],

      nodes:
      [],

      edges:
      [],

      options: {
         nodes: {
          borderWidth: 4,
          color: '#00d282'
         },
         edges: {
          color: 'lightgray'
        }
      },
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
            data: [5, 7, 3, 11, 1, 99], // fake data
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
        }
      };
    },

    methods:
    {

      createNodes()
      {
        for (let i = 0; i < this.dummytransactions.length; i++)
        {
          const fromNode =
          {
            id: this.dummytransactions[i].from,
            label: this.dummytransactions[i].from,
          };

          const toNode =
          {
            id: this.dummytransactions[i].to,
            label: this.dummytransactions[i].to,
          };

        const isFromNodeInArray = this.nodes.some(node => node.id === fromNode.id);
        const isToNodeInArray = this.nodes.some(node => node.id === toNode.id);

        if (!isFromNodeInArray)
        {
          this.nodes.push(fromNode);
        }

        if (!isToNodeInArray)
        {
          console.log("warning");
          this.nodes.push(toNode);
        }

        const edge =
        {
          from: this.dummytransactions[i].from,
          to: this.dummytransactions[i].to,
        };

        const isEdgeInArray = this.edges.some(existingEdge =>
        (existingEdge.from === edge.from && existingEdge.to === edge.to) ||
        (existingEdge.from === edge.to && existingEdge.to === edge.from));


        if(!isEdgeInArray)
        {
          this.edges.push(edge);
        }


        }
      },
      displayGraph(currentChart)
      {
        if (this.showChart === false)
        { 
          this.showChart = true;
        }
        this.weekGraph(currentChart);
      },

      hideGraph()
      {
        if(this.showChart == true)
        {
          this.showChart = false;
        }
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

      updateChart(data, color)
      {
      //   this.displayGraph();
      //   //const newData = JSON.parse(JSON.stringify(data));
      //   // graphql get data for all functions
      //   switch(data)
      //   {
      //     case "online":
      //       this.currentChart = "online";
      //       this.showOnline = true;
      //       break;
      //     case "registered":
      //       this.chartSeries = this.dataTrades;
      //       this.showOnline = false;
      //       break;
      //     case "transactions":
      //       this.chartSeries = this.dataTrades;
      //       break;
      //     case "volume":
      //     this.currentChart = "volume";  
      //     this.chartSeries = this.dataOnlineUsr;
      //       break;
      //     case "offers":
      //       this.currentChart = "offers";
      //       this.chartSeries = this.dataTrades;
      //       this.showOffers = true;
      //       break;
      //     case "wants":
      //       this.currentChart = "wants";  
      //       this.chartSeries = this.dataListedTrades;
      //       this.showOffers = false;
      //       break;
      //   }
      //   this.updateChartOptions(color);
      
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

      fetchDataToMaps()
      {

        // SHOULD FETCH FROM DATABASE!


        
        const currentDate = new Date();
        this.registeredUserMap.set(currentDate.toDateString().slice(4), 0);
        this.onlineUserMap.set(currentDate.toDateString().slice(4), 0);
        this.transactionsMap.set(currentDate.toDateString().slice(4), 0);
        this.volumeMap.set(currentDate.toDateString().slice(4), 0);
        this.offersMap.set(currentDate.toDateString().slice(4), 0);
        this.wantsMap.set(currentDate.toDateString().slice(4), 0);

        // Filling dates with dummy data.
        for(let i = 0; i < 365; i++)
        {
          currentDate.setDate(currentDate.getDate() -1);
          this.onlineUserMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
          this.registeredUserMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
          this.transactionsMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
          this.volumeMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
          this.offersMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
          this.wantsMap.set(currentDate.toDateString().slice(4),  Math.floor(Math.random() * 11));
        }
        // console.log(this.registeredUserMap.size);
        // this.onlineUserMap.forEach((values, keys) => {
        // console.log("values: ", values +
        // ", keys: ", keys)
        // })
      },


      updateStartEndDate(startDate, endDate)
      {
        this.selectedDate[0] = startDate;
        this.selectedDate[1] = endDate;
        
        // Triggers rerender and update dates but removes transition.
        //this.selectedDate = [new Date(startDate), new Date(endDate)];
      },



      weekGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6);

        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
        
      },

      monthGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 1);

        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
      },

      ThreemonthGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 3);

        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
      },

      yearGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        this.updateStartEndDate(startDate, endDate);

        this.getDataRange(currentChart);

      },

      datePickRange(currentChart)
      {
        console.log("hheeej");
        this.getDataRange(currentChart);
      },

      getDataRange(currentChart)
      {
        let map;
        let color;
        console.log(currentChart);

        switch(currentChart)
        {
          case "online":
            this.currentChart = "online";
            map = this.onlineUserMap;
            this.showOnline = true;
            color = '#b51f1f'; 
            break;
          case "registered":
            this.currentChart = "registered";
            map = this.registeredUserMap;
            this.showOnline = false;
            color = '#b51f1f';
            break;
          case "transactions":
            this.currentChart = "transactions";
            map = this.transactionsMap;
            color = '#bcbf0d'; 
            break;
          case "volume":
            this.currentChart = "volume";  
            map = this.volumeMap;
            color = '#bcbf0d';
            break;
          case "offers":
            this.showOffers = true;
            map = this.offersMap;
            this.currentChart = "offers";
            color = '#1248b5';
            break;
          case "wants":
            this.showOffers = false;
            map = this.wantsMap;
            this.currentChart = "wants";
            color = '#1248b5';
            break;
        }
        
        let newDate = [];
        let newData = [];
        
        let from = this.selectedDate[0];
        let to = this.selectedDate[1];

        if(from <= to)
        {
          let current = new Date(from);
          while (current <= to) 
          {
            newData.push(map.get(current.toDateString().slice(4)));
            newDate.push(current.toDateString().slice(4));
            current.setDate(current.getDate() + 1);
          }
        }
        
        this.updateChartData(newDate, newData, color);
      },
      
      updateChartData(newDate, newData, color)
      {
        let newChart = 
        [
          {
            name: '# of Online',
            data: newData, // fake data
          }
        ];

        
         this.$nextTick(() => 
           {
            this.$refs.chart.updateOptions( 
            {
              colors: [color],

              chart: 
              {
                width: '100%',
                height: '100%'
              },

              xaxis:
              { 
                categories: newDate
              } 
            });
          });
          
          this.showChart = true;
          this.chartSeries = newChart;
       },


      async getOnlineUsers()
      {
        this.registerdUsersCount = await getUserCount();
      },
    
      async getTrades() {
        var articles = await getAllArticles();
        articles = JSON.parse(articles);

        this.offers = articles.filter(function (article) {
            return (article.status == "offer")
        });
        this.wants = articles.filter(function (article) {
            return (article.status == "want")
         });
        this.offerCount = this.offers.length;
        this.wantCount = this.wants.length;
        this.listedCount = this.offerCount + this.wantCount;
      },
    },

    mounted()
    {
      this.getOnlineUsers();
      this.getTrades();
      this.printDashboardText("Dashboard");
      this.fetchDataToMaps();
      this.weekGraph(this.currentChart);
      this.getUTCTime(false);
      

      this.createNodes();

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
    font-size: 100%;
    color: rgb(255, 255, 255);
  }
  .test-container-lower-graph
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.138);
    font-size: 100%;
    color: rgb(255, 255, 255);
  }
  .test-container-lower-rhs
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 50%;
    height: 100%;
    border-left: 1px rgba(0, 0, 0, 0.200) solid;
  }
  .test-container-lower-graph:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }
  .test-container-lower-rhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }

  .test-container-lower-lhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }
  .test-container-lower-lhs-pressed
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
    background-color: rgba(0, 0, 0, 0.200)
  }
  .test-container-lower-rhs-pressed
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 50%;
    height: 100%;
    border-left: 1px rgba(0, 0, 0, 0.200) solid;
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
  .node-graph-container
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
  .network
  {
    width: 100%;
    height: 100%;
  }

  .test-switchbox
  {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px
  }

  </style>
