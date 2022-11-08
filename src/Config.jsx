class Config {
  constructor(mode) {
    this.mode = mode;
    if (this.mode === 'development') {
      this.server = 'http://localhost:3000/';
      this.api = 'http://localhost:8000/api/journal/';
      this.glove = 'http://localhost:8001/api/word/';
      this.infra = 'http://localhost:8002/api/infra/:';
      this.dataPanel = 'http://localhost:8003/api/datapanel/';
      this.frontEndKeyWord = 'npm';
      this.nginx ='';
      this.publicUrl = "";
    } else if (this.mode === 'production') {
      this.server = 'https://localhost:3000/';
      this.api = "https://ezio.uk/api/journal/"
      this.glove = "https://ezio.uk/api/word/"
      this.infra = "https://ezio.uk/api/infra/"
      this.dataPanel = "https://ezio.uk/api/datapanel/"
      this.frontEndKeyWord = 'pm2';
      this.nginx = "nginx";
      this.publicUrl = "https://ezio.uk/";
    } else {
      throw new Error('mode must be either \'development\' or \'production\'');
    }
  }
}

export default new Config('development');
// export default new Config('production');