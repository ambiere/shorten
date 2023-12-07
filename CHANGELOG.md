##  (2023-12-07)

## [0.2.0](https://github.com/zhid0399123/shorten/compare/0.1.0...0.2.0) (2023-12-07)


### Features

* **docker-helper:** docker helper module to manage mongo:4 container ([167d44f](https://github.com/zhid0399123/shorten/commit/167d44fad90c94d7b20cd7d9fcf2c4baa0f08848))
* **run-after:** stops mongo:4 container after tests ([782439f](https://github.com/zhid0399123/shorten/commit/782439fa9e3d7a60806410dac736ecb178f08574))
* **run-before:** runs mongo:4 container before tests ([2b591b3](https://github.com/zhid0399123/shorten/commit/2b591b37c01c4c53f6119772024258fdae8b04c7))


### Bug Fixes

* **index:** removed url destructuring, findOne might return null ([07edd7b](https://github.com/zhid0399123/shorten/commit/07edd7b5c236d15b948465994a8f8e83062b7076))

## [0.1.0](https://github.com/zhid0399123/shorten/compare/56b71a03318b5116b538a8f52503931e061a0b2d...0.1.0) (2023-12-04)


### Features

* **generateId:** generate secure friendly url using nanoid module ([5a50eb9](https://github.com/zhid0399123/shorten/commit/5a50eb9c6fd73ff324da784ce5aff9a8ec80e53f))
* **index:** added shorten sample url ([551c559](https://github.com/zhid0399123/shorten/commit/551c5596ef59552efd77b5db518f962d07e75238))
* **mongodb:** mongodb connection module ([1ee1704](https://github.com/zhid0399123/shorten/commit/1ee1704977a8e59797ee9ee56872cdada69689a2))
* **route/index:** added endpoint to create shorten url and redirect user to the long url ([49deac7](https://github.com/zhid0399123/shorten/commit/49deac78382f968ea2fb296585d89db99357fc18))


### Bug Fixes

* **serverStartUpLog:** renamed project name and dev url ([56b71a0](https://github.com/zhid0399123/shorten/commit/56b71a03318b5116b538a8f52503931e061a0b2d))

