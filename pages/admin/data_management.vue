<template>
    <div className="flexbox-container">
        <v-row>
            <v-col cols="2" offset="5">
                <div className="title_container flexbox-item">
                    <!-- <h1 className="title"> {{ $t('user.dataManagement') }} </h1> -->
                    <h1 className="title">Manage Data </h1>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <data_tabs @click="setDataTabStatus" :blueTabTitle='"Categories"' :greenTabTitle='"Places"' />
            </v-col>
        </v-row>
        <!-- <div className='topnav mobnav' id='myMobnav' v-if="isMobile()">
            <a style="background-color:antiquewhite" href='#' @click="this.tab = 'categories'"
                :class="{ active: this.tab === 'categories' }" id='categories'>{{ $t('categories') }}</a>
            <a style="background-color:antiquewhite" href='#' @click="this.tab = 'categories'"
                :class="{ active: this.tab === 'categories' }" id='categories'>Categories</a>
            <a style="background-color:#b3ffb3" href='#' @click="this.tab = 'places'"
                :class="{ active: this.tab === 'places' }" id='articles'>{{ $t('places') }}</a>
            <a style="background-color:#b3ffb3" href='#' @click="this.tab = 'places'"
                :class="{ active: this.tab === 'places' }" id='articles'>Places</a>
        </div> -->
        <!-- <div className="title_container flexbox-item" v-if="!isMobile()">
            <h1 className="title"> {{ $t('user.dataManagement') }} </h1>
            <h1 className="title">Manage Data </h1>
        </div> -->
        <!-- <div className='topnav flexbox-item' id='myTopnav' v-if="!isMobile()">
            <a href='#' @click="this.tab = 'categories'" :class="{ active: this.tab === 'categories' }"
                id='categories'>{{ $t('categories') }}</a>
            <a href='#' @click="this.tab = 'categories'" :class="{ active: this.tab === 'categories' }"
                id='categories'>Categories</a>
            <a href='#' @click="this.tab = 'places'" :class="{ active: this.tab === 'purchases' }" id='purchases'>{{
                $t('places') }}</a>
            <a href='#' @click="this.tab = 'places'" :class="{ active: this.tab === 'purchases' }" id='purchases'>
                Places
            </a>
        </div> -->
        <div className="content flexbox-item">
            <CategoriesList v-if="onBlueTab" />
            <PlacesList v-else />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src 
import CategoriesList from '@/components/CategoriesList.vue'
import PlacesList from '@/components/PlacesList.vue'
import data_tabs from '/components/data_tabs.vue'

export default {
    name: 'DataManagement',
    data() {
        return {
            onBlueTab: true,
        }
    },
    components: {
        CategoriesList,
        PlacesList,
        data_tabs
    },
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
        setDataTabStatus(tabStatus) {
            this.onBlueTab = tabStatus
        }
    }
}

</script>


<style scoped>
@media screen and (min-width: 860px) {
    .flexbox-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        min-width: 860px;
        justify-content: center;
        flex-direction: column;
    }

    .flexbox-item {
        margin: 10px;
        max-width: 1100px;
        width: 1100px;
    }

}

.title {
    margin-top: 4rem;
    margin-bottom: 4rem;
    font-size: 2.2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
}

.topnav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.topnav a {
    text-align: center;
    margin: 0.125em;
    padding: 8px 17.5px 8px 17.5px;
    text-decoration: none;
    font-size: 15px;
    color: steelblue;
    border-style: solid;
    border-color: gainsboro;
    border-radius: 5px;
    border-width: 2px;
    font-size: 1.24rem;
}

.topnav a:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}

.topnav a.active {
    color: dimgrey;
    font-weight: bold;
}

.mobnav {
    height: fit-content;
    overflow: inherit;
    top: 130px;
}

.botnav a {
    text-align: center;
    text-decoration: none;
    color: steelblue;
    border-style: solid;
    border-color: gainsboro;
    margin-left: -1px;
    margin-right: -1px;
    font-size: 1.1rem;
}

h1 {
    text-align: center;
}
</style>
