const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'styles');


fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw console.log(err);
 });
      fs.readdir(src,{withFileTypes: true}, (err, data) =>{
            if(err) throw console.log(err);
            data.forEach(file=>{
                fs.stat(path.join(src, `${file.name}`), (err, stats) =>{
                    if(err) throw console.log(err);
                    if(stats.isFile()&&path.extname (file.name) ==='.css'){
                        fs.readFile(path.join(src, `${file.name}`), 'utf8', (err, data)=> {
                            if(err) throw console.log(err);
                            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data.toString(),   err => {
                                    if (err) throw console.log(err);
                                    
                                });
                        });
                        
                    }
                })
            })
        })
    