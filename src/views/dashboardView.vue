<template>
    <ion-page>
        <ion-menu content-id="dashboard">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Profile</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-text-center ion-padding">
                <ion-icon class="icon-size ion-padding" :icon="personCircleOutline"></ion-icon>
                <div><ion-text>
                        <h1>{{ username }}</h1>
                    </ion-text></div>
                <div><ion-text>{{ user_role }}</ion-text></div>
                <ion-button @click="logout" class="ion-padding" expand="block" size="small"
                    color="danger">logout</ion-button>
            </ion-content>
        </ion-menu>
        <ion-page id="dashboard">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title>Solarmuda</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <ion-card-header>
                                    <ion-text>{{ selected_device.space?.space_name }}</ion-text>
                                    <ion-card-subtitle>Space</ion-card-subtitle>
                                </ion-card-header>
                            </ion-card>
                        </ion-col>
                        <ion-col>
                            <ion-card>
                                <ion-card-header>
                                    <ion-text>{{ selected_device.device_name }}</ion-text>
                                    <ion-card-subtitle>Device</ion-card-subtitle>
                                </ion-card-header>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <div class="ion-padding">
                    <ion-list style="margin: 0;padding: 0;">
                        <ion-item>
                            <ion-select aria-label="fruit" @ionChange="onSelectDevice($event)" placeholder="Select Device">
                                <ion-select-option v-for="(row, id) in device_list" :value="row.id_device">{{
                                    row.device_name
                                }}</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
                </div>
                <div class="ion-padding m-top">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>
                                <ion-text color="success">Active</ion-text>
                            </ion-card-title>
                            <ion-card-subtitle>Status</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>Last Update: {{ new Date() }}</ion-card-content>
                    </ion-card>
                    <ion-card style="margin-top: 10px;">
                        <ion-card-header>
                            <ion-card-title>{{ selected_device?.device_pv_capacity }}</ion-card-title>
                            <ion-card-subtitle><ion-icon :icon="sunnyOutline"></ion-icon> PV Capasity</ion-card-subtitle>
                        </ion-card-header>
                    </ion-card>
                    <ion-card style="margin-top: 10px;">
                        <ion-card-header>
                            <ion-card-title>{{ selected_device?.device_pv_capacity }}</ion-card-title>
                            <ion-card-subtitle><ion-icon :icon="flashOutline"></ion-icon> Total Kwh</ion-card-subtitle>
                        </ion-card-header>
                    </ion-card>
                    <ion-card style="margin-top: 10px;">
                        <ion-card-header>
                            <ion-card-title>{{ currencyIDR(selected_device.data_logs?.log_record_TotE * selected_device?.device_price_perkwh) }}</ion-card-title>
                            <ion-card-subtitle><ion-icon :icon="wallet"></ion-icon> Total revenue</ion-card-subtitle>
                        </ion-card-header>
                    </ion-card>
                </div>
            </ion-content>
        </ion-page>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { flashOutline, sunnyOutline, wallet,personCircleOutline } from 'ionicons/icons';
import { IonButtons, IonContent, IonCardContent,IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton, IonText, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import api from '@/helper/api';
import router from '@/router';
import { computed, ref } from 'vue';
import currencyIDR from '@/helper/currency'


interface response {
    data: any,
    status: boolean,
    message: string
}

const $users = JSON.parse(localStorage.getItem('auth_info') || '{}')
const user_role = $users.users ? $users.users.user_role : ''
const username = $users.users ? $users.users.user_username : ''

let device_list: any = ref([])
let selected_id_device = ref(null)

const getData = async () => {
    const req: response = await api.get('device/get').json()
    device_list.value = req.data
}

getData()

const selected_device = computed(() => {

    if (device_list.value.length > 0 && selected_id_device.value === null) {
        selected_id_device.value = device_list.value[0].id_device
    }

    let arr_selected = device_list.value.filter((row: any) => {
        return row.id_device == selected_id_device.value
    })

    if (arr_selected.length > 0) {
        return arr_selected[0]
    } else {
        return {}
    }

})

const onSelectDevice = async (payload: any) => {
    console.log(payload.detail.value);
    selected_id_device.value = payload.detail.value
}


const logout = async () => {
    localStorage.removeItem('auth_info')
    router.push('/')
}

</script>

<style scoped>
.icon-size {
    font-size: 128px;
}

.m-top {
    margin-top: 50px;
}

ion-card {
    padding: 0px;
    margin: 0px;
}
</style>