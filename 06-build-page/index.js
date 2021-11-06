const {mkdir, readdir, readFile, writeFile, appendFile, copyFile} = require('fs/promises');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist')
const temp = path.join(__dirname, 'template.html');
const compDir = path.join(__dirname, 'components');
const totalFile = path.join(__dirname, 'project-dist', 'index.html')
const src = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const copyDir = path.join(__dirname, 'project-dist', 'assets')

async function replace(){

    try {
        await mkdir(projectDist, {recursive: true});
        let readTemlate = await readFile (temp, 'utf8');
       const files =  await readdir(compDir, {withFileTypes: true});
       for (let file of files) {
           if(file.isFile()){
            const f = await readFile(path.join(compDir, file.name), 'utf8')
            const name =  path.basename(path.join(compDir, file.name), '.html');
             readTemlate = readTemlate.replace(`{{${name}}}`, f);
           }
       }
       await writeFile(totalFile, readTemlate)
    }
    catch(error){
        console.error('there was an error:', error.message);
    }
}

async function style(){
    try{
        const rd = await readdir(src, {withFileTypes: true});
        for(let file of rd){
            if(file.isFile()&&path.extname (file.name) ==='.css'){
                const r = await readFile(path.join(src, file.name), 'utf8');
                await appendFile(path.join(projectDist, 'style.css'), r)
            }
        }
    }
    catch(error){
        console.error('there was an error:', error.message);
    }
}

async function getAllFiles(assets, copyDir) {
    try {
        await mkdir(copyDir, {recursive: true});
        const files =  await readdir(assets, {withFileTypes: true});
        for(let file of files){
            if(file.isFile()){
               await copyFile(path.join(assets, file.name), path.join(copyDir, file.name))
            }else{
                getAllFiles(path.join(assets, file.name), path.join(copyDir, file.name))
            }
        }
    } catch (error) {
        console.error('there was an error:', error.message);
    }
} 

replace();
style();
getAllFiles(assets, copyDir)