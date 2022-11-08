class Config {
  constructor(mode) {
    this.mode = mode;
    if (this.mode === 'development') {
      this.server = 'http://localhost:3000/';
      this.api = 'http://localhost:8000/';
      this.glove = 'http://localhost:8001/';
      this.infra = 'http://localhost:8002/';
      this.dataPanel = 'http://localhost:8003/';
      this.frontEndKeyWord = 'npm';
      this.publicUrl = "";
    } else if (this.mode === 'production') {
      this.server = 'http://localhost:3000/';
      this.api = 'http://localhost:8000/';
      this.glove = 'http://localhost:8001/';
      this.infra = 'http://localhost:8002/';
      this.dataPanel = 'http://localhost:8003/';
      this.frontEndKeyWord = 'pm2';
      this.publicUrl = "https://139.162.225.136";
    } else {
      throw new Error('mode must be either \'development\' or \'production\'');
    }
  }
}

export default new Config('development');
// export default new Config('production');