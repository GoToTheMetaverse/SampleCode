import Jimp from "jimp";
import fs from "fs";

Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
  console.log("font ok");

  for (let i = 1; i < 99; i++) {
    new Jimp(256, 256, "green", (err, image) => {
      if (err) throw err;

      console.log("image ok");

      image.print(font, 10, 10, "my sample");
      image.print(font, 20, 60, "#" + i);

      let fname = "res/img_" + i + ".png";
      image.write(fname);

      let url_head = "https://mynft.gunillee.repl.co/";
      let data = {
        description: "my tutorial description #" + i,
        image: url_head + "res/img_" + i + ".png",
        name: "my tutorial #" + i,
      };
      let text = JSON.stringify(data);
      fs.writeFileSync("res_json/json_" + i + ".json", text);
    });
  }
});
