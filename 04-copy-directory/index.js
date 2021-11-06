const fs = require('fs');
const path = require('path');

let src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'copy-files');
fs.stat(dest, function(err, stats) {
    if (err) {
        console.log("Папка не найден");
    } else {
        console.log("Папка найден");
        fs.readdir(dest, (err, files) => {
            if (err) console.log(err);
          
            for (const file of files) {
              fs.unlink(path.join(dest, file), err => {
                if (err) console.log(err);
              });
            }
          });
    }
});

getAllFiles(src, dest);
function getAllFiles(src, dest) {
    fs.readdir(src, (err, files) => {
        if (err) throw console.log(err);
         
        fs.mkdir(dest, { recursive: true }, (err) =>{
            if (err) console.log(err)
        } )
        for(let file of files) {
            fs.stat((src + '/' + file), (err, stats) => {
                if(err) throw console.log(err);

                if(stats.isFile()){
                    fs.copyFile((src + '/' + file), (dest + '/' + file), (err)=>{
                        if(err) console.log(err);
                    })
                }else {
                    getAllFiles(path.join(src, `${file}`), path.join(dest, `${file}`))
                    
                }
            })
        }
    })
}
