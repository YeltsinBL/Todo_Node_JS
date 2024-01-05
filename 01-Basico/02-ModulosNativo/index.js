// antiguo
//const os = require('os')

//Actual
const os = require('node:os')
console.log('Informacioon del Sistema Operativo');
console.log('Nombre:', os.platform());
console.log('Version', os.release());
console.log('Arquitectura', os.arch());
console.log('CPUs', os.cpus());
console.log('Memoria Libre', os.freemem()/1024/1024);
console.log('Memoria Total', os.totalmem()/1024/1024);
