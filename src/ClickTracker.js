// src/ClickTracker.js

import axios from 'axios';

class ClickTracker {
  constructor(endpoint, sendInterval = 10000) {
    this.endpoint = endpoint;
    this.sendInterval = sendInterval;
    this.migalhaDePao = {
      data: null,
      hora: null,
      caminhoPecorrido: []
    };
    this.timeoutId = null;
  }

  trackButtonClick(buttonId) {
    this.migalhaDePao.caminhoPecorrido.push(buttonId);
    if (!this.migalhaDePao.data) {
      const now = new Date();
      this.migalhaDePao.data = now.toLocaleDateString('pt-BR');
      this.migalhaDePao.hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      this.startTimeout();
    }
  }

  startTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.sendData();
    }, this.sendInterval);
  }

  sendData() {
    const migalhaJson = JSON.stringify(this.migalhaDePao, null, 2);
    console.log(migalhaJson);

    axios.post(this.endpoint, this.migalhaDePao)
      .then(response => {
        console.log('Dados enviados com sucesso:', response.data);
        this.resetData();
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
      });
  }

  resetData() {
    this.migalhaDePao = {
      data: null,
      hora: null,
      caminhoPecorrido: []
    };
  }
}

export default ClickTracker;
