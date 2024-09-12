<template>
    <div>
        <button @click="addCategory('new')" class="add_button">
            Add Category
        </button>
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
                        <!-- {{ $t('is_active') }} -->
                        Is Active
                    </th>
                    <th>
                        <!-- {{ $t('action') }} -->
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in categories" :key="index">
                    <td>
                        {{ index }}
                    </td>
                    <td>
                        <p>{{ item.name }}</p>
                    </td>
                    <td>
                        {{ item.isActive ? 'True' : 'False' }}
                    </td>
                    <td>
                        <!-- <button v-if="item.isActive" @click="updateCategories(item['_id'], false)"
                            title="$t('disable_category')" class="fa fa-ban disable-button"></button> -->
                        <button v-if="item.isActive" @click="updateCategories(item['_id'], false)"
                            title="Disable Category" class="fa fa-ban disable-button"></button>
                        <!-- <button v-if="!item.isActive" @click="updateCategories(item['_id'], true)"
                            title="$t('enable_category')" class="fa fa-check enable-button"></button> -->
                        <button v-if="!item.isActive" @click="updateCategories(item['_id'], true)"
                            title="Enable Category" class="fa fa-check enable-button"></button>
                        <br />
                        <!-- <button title="$t('edit_category')" class="fa fa-edit edit-button">
                            <router-link :to="{ name: 'AddCategories', params: { id: item['_id'] } }">
                                Edit Category
                            </router-link>
                        </button> -->
                        <button title="Edit Category" @click="addCategory(item['_id'])" class="fa fa-edit edit-button">
                            <!-- <router-link :to="{ name: 'AddCategories', params: { id: item['_id'] } }"> -->
                            Edit Category

                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <PopupCard v-if="this.error" @closePopup="this.closePopup" btnText="Ok" :title="'Categories'" :btnLink="null"
            :cardText="popupCardText" />

    </div>
</template>

<script>
/* eslint-disable */
import { getCategories, updateCategoryStatus,deleteCategoriesCache } from '/pages/expressFetch.js'
import PopupCard from '@/components/PopupCard.vue'

export default {
    name: "CategoriesList",
    components: {
        PopupCard
    },
    data() {
        return {
            categories: [],
            popupCardText: 'Unable to update Categories',
            error: false
        };
    },
    methods: {
        addCategory(id) {
            this.$router.push({
                path: '/admin/admin_add_category',
                query: {
                    id: id
                }
            })
        },
        updateCategories(id, isActive) {
            const data = new FormData();
            data.append("id", id);
            data.append("isActive", isActive)
            updateCategoryStatus(data).then(res => {
                if (res) {
                    deleteCategoriesCache().then((res) => {
                        if (res) {
                            window.location.reload();
                        }
                    }).catch((error) => {
                        this.error = true;
                        window.location.reload();
                    })
                }
                if (!res) {
                    this.error = true;
                    window.location.reload();
                }
            }).catch((error) => {
                this.error = true;
                window.location.reload();
            })
        },
    },
    mounted() {
        getCategories().then((res) => {
            this.categories = res;
        })
    },
};
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

.disable-button {
    background-color: lightcoral;
    border: none;
    font-size: 20px;
}

.enable-button {
    background-color: lightgreen;
    border: none;
    font-size: 20px;
}

.add_button {
    float: right;
    font-size: 18px;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px 5px 5px 10px;
    cursor: pointer;
    font-family: "Ubuntu";
}
</style>
