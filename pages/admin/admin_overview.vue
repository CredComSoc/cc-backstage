<template>
  <div>
    <div class="center-container">
      <div class="dashboard-text">
        {{ dashBoardText }}
      </div>

      <div class="main-container">
      
        <div class="data-box" style="background-color: #ff4558;">
        <div class="container-upper">
          <div class="container-lhs">
            <div class="container-text-upper" v-if="showOnline"> {{ onlineUsersCount }}</div>
            <div class="container-text-upper" v-if="!showOnline"> {{ registerdUsersCount }}</div>
            <div class="container-text-lower"> Users</div>
          </div>
          <div class="container-rhs">
            <img class="container-img" :src="onlineUser" alt="User image" draggable="false">
          </div>
        </div>
        <div class="container-lower">
          <button class="container-lower-lhs" v-if="showOnline" style="background-color: rgba(0, 0, 0, 0.200) ;" @click="displayGraph('online')">
            Online
          </button>
          <button class="container-lower-lhs" v-if="!showOnline" @click="displayGraph('online')">
            Online
          </button>
          <button class="container-lower-rhs" v-if="showOnline" @click="displayGraph('registered')">
            Registered
          </button>
          <button class="container-lower-rhs" v-if="!showOnline" style="background-color: rgba(0, 0, 0, 0.200) ;" @click="displayGraph('registered')">
            Registered
          </button>
        </div>
      </div>

      <div class="data-box" style="background-color:  #ffc000;">
        <div class="container-upper">
          <div class="container-lhs">
            <div class="container-text-upper" v-if="showTransactions"> {{ transactions }}</div>
            <div class="container-text-upper" v-if="!showTransactions"> {{ volume }} BKr </div>
            <div class="container-text-lower"> Trades</div>
          </div>
          <div class="container-rhs">
            <img class="container-img" :src="trade" alt="User image" draggable="false">
          </div>
        </div>
        <div class="container-lower">
          <button class="container-lower-lhs" v-if="showTransactions" style="background-color: rgba(0, 0, 0, 0.200);" @click="displayGraph('transactions')">
            Transactions
          </button>
          <button class="container-lower-lhs" v-if="!showTransactions" @click="displayGraph('transactions')">
            Transactions
          </button>
          <button class="container-lower-rhs" v-if="showTransactions" @click="displayGraph('volume')">
            Volume
          </button>
          <button class="container-lower-rhs" v-if="!showTransactions" style="background-color: rgba(0, 0, 0, 0.200) ;" @click="displayGraph('volume')">
            Volume
          </button>
        </div>
      </div>

      <div class="data-box" style="background-color: #00abe0;">
        <div class="container-upper">
          <div class="container-lhs">
            <div class="container-text-upper" v-if="showOffers"> {{offerCount}}</div>
            <div class="container-text-upper" v-if="!showOffers"> {{wantCount}}</div>
            <div class="container-text-lower"> Listed</div>
          </div>
          <div class="container-rhs">
            <img class="container-img" :src="listed" alt="User image" draggable="false">
          </div>
        </div>
        <div class="container-lower">
          <button class="container-lower-lhs" v-if="showOffers" style="background-color: rgba(0, 0, 0, 0.200) ;" @click="displayGraph('offers')">
            Offers
          </button>
          <button class="container-lower-lhs" v-if="!showOffers" @click="displayGraph('offers')">
            Offers
          </button>
          <button class="container-lower-rhs" v-if="showOffers" @click="displayGraph('wants')">
            Wants
          </button>
          <button class="container-lower-rhs" v-if="!showOffers" style="background-color: rgba(0, 0, 0, 0.200) ;" @click="displayGraph('wants')">
            Wants
          </button>
        </div>
      </div>

      <div class="data-box" style="background-color: #00d282;">
        <div class="container-upper">
          <div class="container-lhs">
            <div class="container-text-upper"> Network graph</div>
          </div>

          <div class="container-rhs">
            <img class="container-img" :src="nodeGraph" alt="Graph image" draggable="false">
          </div>
        </div>
        <button class="container-lower-graph" v-if="!showChart" style="background-color: rgba(0, 0, 0, 0.300) ;" @click="hideGraph()">
            Display
        </button>
        <button class="container-lower-graph" v-if="showChart" @click="hideGraph()">
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
            @select-node="onNodeSelected()"
            @hover-node="onNodeHovered">
          </network>
        </div>

        <div class="chart-buttons" v-if="showChart">
          <button class="chart-button" @click="weekGraph(currentChart)"> 1w</button>
          <button class="chart-button" @click="monthGraph(currentChart)"> 1m </button>
          <button class="chart-button" @click="ThreemonthGraph(currentChart)"> 3m </button>
          <button class="chart-button" @click="yearGraph(currentChart)"> 1y </button>

          <div class="datepicker-container">
            <Datepicker ref="dpicker" range showClearButton v-model="selectedDate" circle class="datepicker" placeholder="Custom date" lang="en"
            @change="getDataRange(currentChart)"/>
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
  // packages end

  // fetchFuncs
  import { Network } from "vue-vis-network";
  import { getUserCount, getMembers, getAllArticles, getAllTransactions } from '/pages/gqlFetch.js';
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
        
        // Dates 
        utcTime: null,
        currentDate: null,
        from: null,
        to: null,
        // ------------------        
        
        // Online and Registerd Box
        onlineUsersCount: 0,
        registerdUsersCount: 0,
        showOnline: true,
        // ------------------        
        
        // Transactions and Volume box
        transactions: 0,
        volume: 0,
        showTransactions: true,
        // ------------------
        
        // Offers and wants box
        offerCount: 0,
        wantCount: 0,
        showOffers: true,
        // ------------------
        
        // Maps holding data, 1 year back in time.
        registeredUserMap: new Map(),
        onlineUserMap : new Map(),
        transactionsMap: new Map(),
        volumeMap: new Map(),
        offersMap: new Map(),
        wantsMap: new Map(),
        // ------------------  
        
        // Header Text.
        dashBoardText: "",
        
        // Init Display chart
        currentChart: "online",
        showChart: true,
        
        // DatePicker
        selectedDate: 
        [
          new Date(),
          new Date(),
        ],
        // ------------------
      
        // Nodes and Edges for node graph.
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
        // ------------------

        
        selectedDate: 
        [
          new Date(),
          new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
        ],

        // Apexchart settings
        chartSeries: [],  //Date structure for chart

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
      onNodeSelected()
      {
        //Function if a node in network graph is pressed
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

      updateChartOptions(color)
      {
        const newChartOptions = Object.assign({}, this.chartOptions);
        newChartOptions.colors = [color];
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

      prepareMaps()   //Prepares the maps for use in later functions 
      {
        const currentDate = new Date();
        const currentDateISO = currentDate.toISOString().slice(0, 10); // Get the date part of the ISO string
        
        this.registeredUserMap.set(currentDateISO, 0);
        this.onlineUserMap.set(currentDateISO, 0);
        this.transactionsMap.set(currentDateISO, 0);
        this.volumeMap.set(currentDateISO, 0);
        this.offersMap.set(currentDateISO, 0);
        this.wantsMap.set(currentDateISO, 0);

        // Filling dates with dummy 0. 365 days(1y).
        for (let i = 0; i < 365; i++) 
        {
          currentDate.setDate(currentDate.getDate() - 1);
          const previousDateISO = currentDate.toISOString().slice(0, 10);
  
          this.onlineUserMap.set(previousDateISO, 0);
          this.registeredUserMap.set(previousDateISO, 0);
          this.transactionsMap.set(previousDateISO, 0);
          this.volumeMap.set(previousDateISO, 0);
          this.offersMap.set(previousDateISO, 0);
          this.wantsMap.set(previousDateISO, 0);
          }
      },

      updateStartEndDate(startDate, endDate)
      {
          this.selectedDate[0] = startDate;
          this.selectedDate[1] = endDate;
      },

      // Displays 1 week.
      weekGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6);
        
        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
      },

      // Displays 1 month.
      monthGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 1);

        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
      },

      // Displays 3 months.
      ThreemonthGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 3);

        this.updateStartEndDate(startDate, endDate);
        this.getDataRange(currentChart);
      },

      // Displays 1 year.
      yearGraph(currentChart)
      {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        this.updateStartEndDate(startDate, endDate);

        this.getDataRange(currentChart);

      },

      // Selects and "loads" the correct chart data to be shown
      getDataRange(currentChart)  
      {
        let map;
        let color;

        switch(currentChart)
        {
          case "online":
            this.showOnline = true;
            this.currentChart = "online";
            map = this.onlineUserMap;
            color = '#b51f1f'; 
            break;
          case "registered":
            this.showOnline = false;
            this.currentChart = "registered";
            map = this.registeredUserMap;
            color = '#b51f1f';
            break;
          case "transactions":
            this.showTransactions = true;
            this.currentChart = "transactions";
            map = this.transactionsMap;
            color = '#bcbf0d'; 
            break;
          case "volume":
            this.showTransactions = false;
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
            newData.push(map.get(current.toISOString().slice(0,10)));
            newDate.push(current.toISOString().slice(0,10));
            current.setDate(current.getDate() + 1);
          }
        }
        this.$nextTick(() => 
        {
          this.updateChartData(newDate, newData, color);
        });
      },
      
      updateChartData(newDate, newData, color)
      {
        let newChart = 
        [
          {
            name: '# of Online',
            data: newData,
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

      // Fetch userdata from DB.
      getUsers(userData)
      {
        let onlineMembers = 0;
        let unixTime = Math.floor(Date.now()/1000);
        const onlineThreshold = 900;   // 15 min
        let Threshhold = unixTime - onlineThreshold;
        if(userData != null)
        {
          userData.forEach((user) => 
          {
            if(user.last_online/1000 > Threshhold)       
            {
              onlineMembers++;
            }
          }); 
        }
        return onlineMembers;
      },

      // Fetch tradedata from DB.
      getTradeData(trades)
      {
        let date = new Date();
        date = date.toISOString().slice(0,10);
        trades.forEach((trade) => 
        {
          if(trade.state != "completed")
          {
            return;
          }
          console.log(trade);
          //Transactions
          let cur = this.transactionsMap.get(trade.date.slice(0,10));
          let new_value = cur + 1;
          this.transactionsMap.set(trade.date.slice(0,10), new_value);

          //Volume
          let volume = this.volumeMap.get(trade.date.slice(0,10));
          let new_volume = volume + parseInt(trade.entries[0].quantity.substring(1));
          this.volumeMap.set(trade.date.slice(0,10), new_volume);
          });
          
          this.transactions = this.transactionsMap.get(date);
          this.volume = this.volumeMap.get(date);
      },

      // Fetch networkgraph from DB.
      getNetwork(trades)
      {
        trades.forEach((trade) =>
        {  
          if(trade.state != "completed")
          {
            return;
          }
          
          let fromNode =
          {
            id: trade.entries[0].payee,
            label: trade.entries[0].payee
          };
          
          let toNode =
          {
            id: trade.entries[0].payer,
            label: trade.entries[0].payer
          };
          
          // Is node already existing
          const isFromNodeInArray = this.nodes.some(node => node.id === fromNode.id);
          const isToNodeInArray = this.nodes.some(node => node.id === toNode.id);

          // If not existing add.
          if (!isFromNodeInArray)
          {
            this.nodes.push(fromNode);
          };
          
          // If not existing add.
          if (!isToNodeInArray)
          {
            this.nodes.push(toNode);
          };

          const edge =
          {
            from: fromNode.label,
            to: toNode.label,
          };

          // Is edge already existing?
          // Potentially add, if two people trade more?
          // Incrase thickness of edge.
          const isEdgeInArray = this.edges.some(existingEdge =>
          (existingEdge.from === edge.from && existingEdge.to === edge.to) ||
          (existingEdge.from === edge.to && existingEdge.to === edge.from));

          // Add if not already existing.
          if(!isEdgeInArray)
          {
            this.edges.push(edge);
          } 
        });
      },

      // Calls all function for datafetching.
      async getDisplayData()
      {
        //User Data
        this.registerdUsersCount = await getUserCount();
        let userData = await getMembers();
        this.onlineUsersCount = this.getUsers(userData);
        
        //Trade Data
        let trades = await getAllTransactions();
        this.getTradeData(trades);

        //Listed Date
        let listed = await getAllArticles();
        this.getListedData(listed);
        
        //Networkgraph 
        this.getNetwork(trades);
      },
    
      // Fetch listingdata from DB.
      getListedData(listed) 
      {
        let date = new Date();
        date = date.toISOString().slice(0,10);
        listed = JSON.parse(listed);  
        listed.forEach((listing) =>
        { 
          var tempDate = new Date(parseInt(listing.uploadDate,10));
          tempDate = tempDate.toISOString().slice(0,10);
          if(listing.status == "offer")
          {
            let cur = this.offersMap.get(tempDate);
            cur++;
            this.offersMap.set(tempDate, cur);
          }
          else if(listing.status == "want")
          {
            let cur = this.wantsMap.get(tempDate);
            cur++;
            this.wantsMap.set(tempDate, cur); 
          }
        });
        this.offerCount = this.offersMap.get(date);
        this.wantCount = this.wantsMap.get(date);
      },
    },

    mounted()
    {
      this.prepareMaps();
      this.getDisplayData();
      this.printDashboardText("Dashboard");
      this.weekGraph(this.currentChart);
      this.getUTCTime(false);

      this.timer = setInterval(() => {
        this.getUTCTime(false);
      }, 1000);
    },
  }

  </script>

  <style scoped>
  .main-container
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 2%;
  }
  .container-img
  {
    width: 50%;
    height: 60%;
  }
  .data-box
  {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 10px 7px 21px -5px rgba(0,0,0,0.51);
    width: 13vw;
    height: 15vh;
  }
  .container-lhs
  {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-left: 10%;
    width: 50%;
    height: 100%;
  }
  .container-rhs
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
  }
  .container-upper
  {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 5%;
    width: 100%;
    height: 70%;
  }
  .container-lower
  {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.138);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 100%;
    color: rgb(255, 255, 255);
  }
  .container-lower-graph
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 0.85vw;
    font-weight: 500;
    width: 100%;
    height: 30%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: rgba(0, 0, 0, 0.138);
    color: rgb(255, 255, 255);
  }
  .container-lower-rhs
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 0.85vw;
    font-weight: 500;
    width: 50%;
    height: 100%;
    border-bottom-right-radius: 5px;
    border-left: 0.09vw rgba(0, 0, 0, 0.200) solid;
  }
  .container-lower-graph:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }
  .container-lower-rhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }
  .container-lower-lhs:hover
  {
    background-color: rgba(0, 0, 0, 0.200)
  }
  .container-lower-lhs
  {
    flex-direction: row;
    font-size: 0.85vw;
    font-weight: 500;
    width: 50%;
    height: 100%;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-right: 0.09vw rgba(0, 0, 0, 0.200) solid;
  }
  .container-text-upper
  {
    font-size: 0.92vw;
    font-weight: bold;
    color: white;
    user-select: none;
  }
  .container-text-lower
  {
    font-size: 0.92vw;
    color: white;
    user-select: none;
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
    font-size: 0.88vw;
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
    font-size: 0.83vw;
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
    font-size: 2.6vw;
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

    /* Icon size */
    --v-calendar-datepicker-icon-color: #000000;
    --v-calendar-datepicker-icon-size: 1.0rem;

    /* Input text size */
    /* --v-calendar-input-font-size: 1.0rem; */
    --v-calendar-input-font-size: 1.0rem;
    --v-calendar-input-font-weight: 500;
    --v-calendar-input-text-color: #000000;

    /* Calender header */
    --v-calendar-view-button-font-size: 1rem;
    --v-calendar-select-bg-color: #e0e0e0;
  }
  .network
  {
    width: 100%;
    height: 100%;
  }
  </style>
