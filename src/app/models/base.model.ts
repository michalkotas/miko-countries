export class BaseModel {
  constructor(data?) {
    if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] !== undefined) {
          this[key] = data[key];
        }
      }
    }
  }
}
