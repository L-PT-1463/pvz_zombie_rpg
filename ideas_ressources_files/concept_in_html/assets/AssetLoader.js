export default class AssetLoader {
  constructor() {
    this.images = new Map();
  }

  loadImage(key, src) {
    if (this.images.has(key)) return this.images.get(key);

    const img = new Image();
    img.src = src;

    const record = {
      img,
      loaded: false,
      error: false,
      promise: null
    };

    record.promise = new Promise((resolve, reject) => {
      img.onload = () => {
        record.loaded = true;
        resolve(img);
      };
      img.onerror = () => {
        record.error = true;
        reject(new Error(`Failed to load image: ${src}`));
      };
    });

    this.images.set(key, record);
    return record;
  }

  isLoaded(key) {
    const rec = this.images.get(key);
    return !!rec && rec.loaded;
  }

  getImage(key) {
    const rec = this.images.get(key);
    return rec?.img || null;
  }
}