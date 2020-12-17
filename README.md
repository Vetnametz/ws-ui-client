# ws-ui-client

Beliave you have Git on raspberrypi 

1. Install node with NVM on raspberrypi
  https://garywoodfine.com/how-to-install-node-js-on-raspberry-pi/ - you need node version 12
  
2. Install Yarn package manager
  https://classic.yarnpkg.com/en/docs/install/#debian-stable - please use second command ("sudo apt update && sudo apt install --no-install-recommends yarn")
  
3. Clon 3 repositories
  - ws-ui-client
  - ws-proxy-zeromq
  - zeromq-server
  
4. Prepare to lunch client at Chromium
    instal Chromium extension - https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
    at this extension "Open options page" -> at 6. Whitelisted domains from - Allow CORS -> add "localhost:8383"
  
5. At "zeromq-server" repo checkout to "develp" branch 
  run "yarn"
  run "yarn dev"
  dfter this you must have something like that at your console
  ```
      yarn run v1.22.4
      $ nodemon --exec ts-node -- ./src/index.ts
      [nodemon] 2.0.6
      [nodemon] to restart at any time, enter `rs`
      [nodemon] watching path(s): *.*
      [nodemon] watching extensions: ts,json
      [nodemon] starting `ts-node ./src/index.ts`
      generating fake reactIR parameters
  ```
  
 6. At "ws-proxy-zeromq" repo checkout to "feature/socket.io" branch 
  run "yarn"
  run "yarn dev"
  dfter this you must have something like that at your console
  ```
      yarn run v1.22.4
      $ nodemon --exec ts-node -- ./src/index.ts
      [nodemon] 2.0.6
      [nodemon] to restart at any time, enter `rs`
      [nodemon] watching path(s): *.*
      [nodemon] watching extensions: ts,json
      [nodemon] starting `ts-node ./src/index.ts`
      socket.io server start on port:  8383
      express server listening on *:8383
  ```
  
 7. At "ws-ui-client" repo checkout to "feature/socket.io-client" branch
    find out path to file at this repo -> readlink -f index.html
    run client -> "chromium-browser <path-to-index.html>
  
    
