<template>
    <div>
        <div>
            <span>
                <label for="placeInput">
                    <!-- {{ $t('place_prompt') }} -->
                    Enter a comma-separated of place names to add:
                    <input placeholder="Place Name" type="text" v-model="newPlaces" id="placeInput" />
                </label>
            </span>

            <span>
                <button class="add-place" id="addNewPlaces" @click="addPlaces">
                    <!-- {{ $t('add_place') }} -->
                    Add Place
                </button>
            </span>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>

                        </th>
                        <th>
                            <!-- {{ $t('user.billingnamelabel') }} -->
                            Category
                        </th>
                        <th>
                            <!-- {{ $t('action') }} -->
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in places" :key="index">
                        <td>
                            {{ index }}
                        </td>
                        <td>
                            <p>{{ item.name }}</p>
                        </td>
                        <td>
                            <button @click="deleteItem(item['_id'])">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PopupCard v-if="this.error" @closePopup="this.closePopup" btnText="Ok" :title="'Categories'"
                :btnLink="null" :cardText="popupCardText" />

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { createNewPlace, getPlaces, deletePlace, deletePlacesCache } from '/pages/expressFetch.js'
import PopupCard from '@/components/PopupCard.vue'

export default {
    name: "PlacesList",
    components: {
        PopupCard
    },
    data() {
        return {
            newPlaces: '',
            places: [],
            popupCardText: 'Place name added successfully',
            error: false
        }
    },
    methods: {
        async addPlaces() {
            if (!this.newPlaces) {
                this.popupCardText = "No new places to add!"
                return
            }

            const placesList = this.newPlaces.split(', ');
            const placeData = placesList.map((place) => {
                return {
                    'name': place
                }
            })
            const data = {
                'places': placeData
            }
            // try {
            //     const res = await createNewPlace(data);
            //     if (!res) {
            //         this.popupCardText = "Error occurred while adding new places";
            //     } else {
            //         this.popupCardText = res;
            //         this.newPlaces = '';

            //         await deletePlacesCache(); // Handle potential errors in the next try-catch block
            //         console.log(res.message);

            //         const places = await getPlaces();
            //         this.places = places;
            //     }
            // } catch (error) {
            //     console.error("Error while adding new places", error);
            //     this.popupCardText = "Error creating place!";
            //     this.error = true;
            // }
            try {
                createNewPlace(data).then((res) => {
                    if (!res) {
                        this.popupCardText = "Error occured while adding new places"
                    }
                    if (res) {
                        this.popupCardText = res
                    }
                    this.newPlaces = ''
                    deletePlacesCache().then((res) => {
                        console.log(res.message)
                    }).catch((error) => {
                        this.popupCardText = "Error creating place!"
                        this.error = true;
                    })
                    getPlaces().then((res) => {
                        this.places = res;
                    })
                    this.popupCardText = res.message
                }).catch((error) => {
                    console.error("Error while adding new places");
                    this.popupCardText = "Error creating place!";
                    this.error = true;
                })
            } catch (error) {
                console.error("Error while adding new places", error);
                this.popupCardText = "Error creating place!";
                this.error = true;
            }
        },
        async deleteItem(id) {
            const data = {
                "id": id
            }
            // try {
            //     const result = await deletePlace(data);
            //     if (result) {
            //         await deletePlacesCache();
            //         console.log(res.message); // Assuming res is available here

            //         const places = await getPlaces();
            //         this.places = places;
            //         this.popupCardText = res.message; // Assuming res.message is the desired text
            //     } else {
            //         this.popupCardText = "Error deleting place!";
            //     }
            // } catch (error) {
            //     console.error("Error while deleting place:", error);
            //     this.popupCardText = "Error creating place!";
            //     this.error = true;
            // }
            try {
                deletePlace(data).then((result, error) => {
                    if (error) {
                        this.popupCardText = "Error deleting place!"
                        console.error(error)
                        return
                    }
                    deletePlacesCache().then((res) => {
                        console.log(res.message)
                    }).catch((error) => {
                        this.popupCardText = "Error creating place!"
                        this.error = true;
                    })
                    getPlaces().then((res) => {
                        this.places = res;
                    })
                    this.popupCardText = res.message
                });
            } catch (error) {
                console.error("Error while deleting place:", error);
                this.popupCardText = "Error creating place!";
                this.error = true;
            }
        }
    },
    mounted() {
        getPlaces().then((res) => {
            this.places = res;
        })
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.add-place {
    /* display: block; */
    align-self: right;
    width: 80px;
    height: 30px;
    margin-bottom: 5px;
    background-color: rgb(236, 236, 236);
    border: 2px solid #797979;
    font-size: 15px;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Ubuntu";
}

input {
    border: 1px solid;
    margin-left: 5px;
    margin-right: 5px;
}
</style>