import * as fs from 'fs';

export function  saveFrontendFiles(data) {
    const contractsDir = __dirname + "/../frontend/src/data";
    const fileName = contractsDir + "/degen-data.json";

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(fileName, JSON.stringify(data, undefined, 2))

  }

  export function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}