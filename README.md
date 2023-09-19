## Rune.exe Server

Works with rune.exe and rune_members.exe from 2001 RSC.

Edit your HOSTS file / DNS resolver to point runescape.com/www.runescape.com to 127.0.0.1.

rune_members.exe requires port 8010 and port 80.  
rune.exe requires port 80.

### Usage

Copy cache/client files to `public/client/`, update mkfileindex.js if you want to add any new versions.

```
node mkfileindex.js
npm start
```
