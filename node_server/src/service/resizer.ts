import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class Resize {
  private folder: string;
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      // .resize(300, 300, {
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true,
      // })
      .toFile(filepath);

    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
