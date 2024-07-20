<template>
  <div>
    <h1>{{ msg }}</h1>

    <section class="listaDeJogos">
      <div class="jogo" v-for="(jogo, index) in jogos" :key="index">
        <img :src="jogo.src" :alt="jogo.nome">
        <br>
        <button :id="'CS-jogar-' + jogo.nome" @click="openConfirmModal(jogo.nome)">JOGAR</button>
      </div>
    </section>

    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <p>Você realmente deseja jogar {{ selectedJogo }}?</p>
        <button id="CS-confirmPlay-Sim" @click="confirmPlay">Sim</button>
        <button id="CS-confirmPlay-Nao" @click="closeConfirmModal">Não</button>
      </div>
    </div>

    <div v-if="showControlModal" class="modal">
      <div class="modal-content">
        <p>Escolha seu controle</p>
        <button id="CS-selectControl-Controle" @click="selectControl('Controle')">Controle</button>
        <button id="CS-selectControl-Teclado" @click="selectControl('Teclado')">Teclado</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
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
      migalhaDePao: {
        data: null,
        hora: null,
        caminhoPecorrido: []
      }
    };
  },
  methods: {
    openConfirmModal(jogoNome) {
      this.selectedJogo = jogoNome;
      this.trackButtonClick('CS-jogar-' + jogoNome);
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.trackButtonClick('CS-confirmPlay-Nao');
      this.showConfirmModal = false;
    },
    confirmPlay() {
      this.trackButtonClick('CS-confirmPlay-Sim');
      this.showConfirmModal = false;
      this.showControlModal = true;
    },
    selectControl(controlType) {
      this.trackButtonClick('CS-selectControl-' + controlType);
      this.showControlModal = false;
      this.selectedJogo = null;
      alert(`Você escolheu jogar com ${controlType}`);
    },
    trackButtonClick(buttonId) {
      this.migalhaDePao.caminhoPecorrido.push(buttonId);
      if (!this.migalhaDePao.data) {
        const now = new Date();
        this.migalhaDePao.data = now.toLocaleDateString('pt-BR');
        this.migalhaDePao.hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        setTimeout(() => {
          const migalhaJson = JSON.stringify(this.migalhaDePao, null, 2);
          console.log(migalhaJson);
          alert(migalhaJson);
        }, 10000);
      }
    },
    jogar(jogoAcessado) {
      const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      axios.post('http://localhost:3000/save', {
        jogoAcessado,
        hora
      })
      .then(response => {
        console.log('Dados salvos com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao salvar os dados:', error);
      });
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
