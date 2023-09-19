import fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const filelist = fastify({
    logger: true
});

filelist.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/'
});

filelist.listen({ port: 8010 });

// -----

const web = fastify({
    logger: true
});

web.register(fastifyStatic, {
    root: process.cwd() + '/public',
    prefix: '/'
});

// rune.exe
web.get('/filelist-:cachebust.txt', (req, res) => {
    res.sendFile('fileindex.txt');
});

web.get('/fileindex-:cachebust.txt', (req, res) => {
    res.sendFile('fileindex.txt');
});

web.get('/clientgame-:cachebust.html', (req, res) => {
    res.sendFile('clientgame.html');
});

web.listen({ port: 80 });
