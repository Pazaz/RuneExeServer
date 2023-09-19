import fs from 'fs';

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
}

function crc32(data) {
    let crc = 0 ^ (-1);

    for (let i = 0; i < data.length; i++) {
        crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
}

const history = [
    [
        'mudclient39.jar',
        'config18.jag',
        'land14.jag',
        'media12.jag',
        'models6.jag',
        'textures5.jag',
        'entity3.jag'
    ],
    [
        'mudclient40.jar',
        'config18.jag',
        'land14.jag',
        'media12.jag',
        'models6.jag',
        'textures5.jag',
        'entity3.jag'
    ],
    [
        'mudclient56.jar',
        'config24.jag',
        'land18.jag',
        'media16.jag',
        'models7.jag',
        'textures6.jag',
        'entity4.jag'
    ],
    [
        'mudclient57.jar',
        'config25.jag',
        'land19.jag',
        'media16.jag',
        'models7.jag',
        'textures6.jag',
        'entity4.jag'
    ],
    [
        'mudclient61.jar',
        'config26.jag',
        'land19.jag',
        'media17.jag',
        'models7.jag',
        'textures6.jag',
        'entity4.jag'
    ],
    [
        'mudclient70.jar',
        'config29.jag',
        'land21.jag',
        'media19.jag',
        'model7.jag',
        'textures6.jag',
        'entity6.jag'
    ],
];

const HISTORY_INDEX = 0;
const files = history[HISTORY_INDEX];

let matched = [];
let totalSize = 0;
let count = 0;
let fileindex = '';
let fileindex2 = ''; // members only
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!fs.existsSync('public/client/' + file)) {
        continue;
    }

    // format is config29.jag, should be split into 3 parts
    let [name, ver, ext] = file.match(/(.+?)(\d+)?(\..+)?$/).slice(1);
    if (matched.includes(name + ext)) {
        continue;
    }

    let size = fs.statSync('public/client/' + file).size;
    totalSize += size;

    let crc = crc32(fs.readFileSync('public/client/' + file));

    if (ext !== '.mem') {
        fileindex += `=${file}; =${size}; =${crc};\r\n`;
    }

    fileindex2 += `=${file}; =${size}; =${crc};\r\n`;

    count++;
    matched.push(name + ext);
}
fileindex += 'end\r\n';
fileindex2 += 'end\r\n';

console.log('----');
console.log('total size', totalSize);
fs.writeFileSync('public/fileindex.txt', fileindex);
fs.writeFileSync('public/fileindex2.txt', fileindex2);
