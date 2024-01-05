//Moderno

// 1ra forma
import { platform, release, arch, cpus, freemem, totalmem } from 'node:os';
console.log('Informacioon del Sistema Operativo');
console.log('Nombre:', platform());
console.log('Version', release());
console.log('Arquitectura', arch());
console.log('CPUs', cpus());
console.log('Memoria Libre', freemem()/1024/1024);
console.log('Memoria Total', totalmem()/1024/1024);

// 2da forma
import os from 'node:os'
console.log('Informacioon del Sistema Operativo');
console.log('Nombre:', os.platform());
console.log('Version', os.release());
console.log('Arquitectura', os.arch());
console.log('CPUs', os.cpus());
console.log('Memoria Libre', os.freemem()/1024/1024);
console.log('Memoria Total', os.totalmem()/1024/1024);
