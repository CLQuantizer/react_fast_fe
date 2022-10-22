class Config {
  constructor(mode) {
    this.mode = mode;
    if (this.mode === 'development') {
      this.server = 'http://localhost:3000/';
      this.api = 'http://localhost:8000/';
      this.glove = 'http://localhost:8001/';
      this.dataPanel = 'http://localhost:8003/';
      this.frontEndKeyWord = 'npm';
    } else if (this.mode === 'production') {
      this.server = 'http://langedev.net/';
      this.api = 'http://langedev.net:8000/';
      this.glove = 'http://langedev.net:8001/';
      this.dataPanel = 'http://langedev.net:8003/';
      this.frontEndKeyWord = 'pm2';
    } else {
      throw new Error('mode must be either \'development\' or \'production\'');
    }
  }
}

export default new Config('development');
// export default new Config('production');