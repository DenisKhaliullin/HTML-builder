const fs = require('fs');
const path = require('path');
console.log('Информация о файлах:')
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) =>{
    data.forEach(file =>{
      if(file.isFile()){
       fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`), (err, stats) =>{
        console.log(file.name + ' - ' + path.extname (file.name) + ' - ' + stats.size + 'B')
    })
      }
    })
});
