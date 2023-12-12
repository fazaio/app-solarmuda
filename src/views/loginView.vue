<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Solarmuda</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="container">
                <h1 class="ion-margin-bottom">Hi, Welcome. . .</h1>
                <ion-item>
                    <ion-input v-model="obj.username" label="Username" label-placement="floating"></ion-input>
                </ion-item>
                <ion-item class="ion-margin-top">
                    <ion-input v-model="obj.password" type="password" label="Password" label-placement="floating"></ion-input>
                </ion-item>
                <ion-button @click="login" class="ion-margin-top" expand="block">Signin</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import api from '@/helper/api';
import router from '@/router';
import { IonPage, IonHeader, IonItem, IonButton ,IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/vue';
import { ref } from 'vue';


let obj = ref({
    username : '',
    password: ''
})

interface response {
    data: string,
    status: boolean,
    message: string
}

const login = async () => {
    try {
        const res : response = await (await api.post('user/signin', {json : obj.value})).json()
        localStorage.setItem('auth_info', JSON.stringify(res.data))

        router.push('/dashboard')
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
#container {
    padding: 3rem;
}
</style>
  