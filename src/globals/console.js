class CustomConsole {
  custom = {};

  constructor() {
    this.custom.info = this.info;
    this.custom.error = this.error;
  }

  info(msg, params) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      msg,
      params ? `================>${params}` : ''
    );
  }

  error(msg, params) {
    console.log('\x1b[41m', msg, params ? `================>${params}` : '');
  }
}
global.console.custom = new CustomConsole().custom;

export default global.console.custom;
