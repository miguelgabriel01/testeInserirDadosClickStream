<!-- src/components/HelloWorld.vue -->
<template>
  <div>
    <h1>{{ msg }}</h1>

    <section class="listaDeJogos">
      <div class="jogo" v-for="(jogo, index) in jogos" :key="index">
        <img :src="jogo.src" :alt="jogo.nome">
        <br>
        <button :id="'CS-jogar-' + jogo.nome" @click="handleClick('CS-jogar-' + jogo.nome)">JOGAR</button>
      </div>
    </section>

    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <p>Você realmente deseja jogar {{ selectedJogo }}?</p>
        <button id="CS-confirmPlay-Sim" @click="handleClick('CS-confirmPlay-Sim')">Sim</button>
        <button id="CS-confirmPlay-Nao" @click="handleClick('CS-confirmPlay-Nao')">Não</button>
      </div>
    </div>

    <div v-if="showControlModal" class="modal">
      <div class="modal-content">
        <p>Escolha seu controle</p>
        <button id="CS-selectControl-Controle" @click="handleClick('CS-selectControl-Controle')">Controle</button>
        <button id="CS-selectControl-Teclado" @click="handleClick('CS-selectControl-Teclado')">Teclado</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClickTracker from '../ClickTracker';

export default {
  name: 'TrackClicks',
  props: {
    msg: String
  },
  data() {
    return {
      jogos: [
        { nome: 'GTA 6', src: '/img/1335660.jpeg' },
        { nome: 'BF5', src: '/img/5b36948b42e1cc51e0182c6f.webp' },
        { nome: 'Need For Speed', src: '/img/cd9190a38df82b8c2a225fa6bce96f18.jpg' },
        { nome: 'FIFA 24', src: '/img/FC24_standardkeyart_16x9_1_7b904bb9-3d14-42f9-8cf6-dc6f70673d41.webp' }
      ],
      showConfirmModal: false,
      showControlModal: false,
      selectedJogo: null,
      clickTracker: new ClickTracker('http://localhost:3030/save')
    };
  },
  methods: {
    handleClick(buttonId) {
      this.clickTracker.trackButtonClick(buttonId);
      if (buttonId.startsWith('CS-jogar-')) {
        this.selectedJogo = buttonId.replace('CS-jogar-', '');
        this.showConfirmModal = true;
      } else if (buttonId === 'CS-confirmPlay-Nao') {
        this.showConfirmModal = false;
      } else if (buttonId === 'CS-confirmPlay-Sim') {
        this.showConfirmModal = false;
        this.showControlModal = true;
      } else if (buttonId.startsWith('CS-selectControl-')) {
        this.showControlModal = false;
        this.selectedJogo = null;
        alert(`Você escolheu jogar com ${buttonId.replace('CS-selectControl-', '')}`);
      }
    }
  }
}
</script>

<style scoped>
a, h1 {
  color: #111f11;
}

.listaDeJogos {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.jogo {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
}

img {
  width: 300px;
  height: 300px;
}

button {
  background: rgb(7, 141, 47);
  color: aliceblue;
  font-size: 15px;
  width: 180px;
  height: 40px;
  text-decoration: none;
  border: none;
  border-radius: 2px;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
  border-radius: 10px;
}
</style>
