![](https://ftbwiki.org/images/6/6e/Forestry_Logo.png)

# ForestryPE
[![](https://img.shields.io/endpoint?url=https://icmods-badge-ynwhghiq9jf7.runkit.sh/?id=6&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TS6VWROxQxCFDdbIgKuIoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU+L+k0CLWg+N+vLv3uHsHCI0KU82eCUDVLCMVj4nZ3Krof0UfBhGAD2GJmXoivZhB1/F1Dw9f76I8q/u5P0e/kjcZ4BGJ55huWMQbxDObls55nzjESpJCfE48btAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvE0cURRNcoXsi4rnLc4q5Uaa92TvzCY11bSXKc5gjiWkEASImTUUEYFFqK0aqSYSNF+rIt/2PEnySWTqwxGjgVUoUJy/OB/8LtbszA16SYFY4DvxbY/RgH/LtCs2/b3sW03TwDvM3Cltf3VBjD7SXq9rUWOgIFt4OK6rcl7wOUOEH7SJUNyJC9NoVAA3s/om3LA0C0QWHN7a+3j9AHIUFfLN8DBITBWpOz1Lu/u7ezt3zOt/n4ANuVyjzQRy4cAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfmCxEKMgBzW4JzAAACR0lEQVQoz12Sz0vTcRyHn8/Xuc3pcqlhLYgwSUkI7KBQWpBBIVi5EoKVh0DIw7z0B3QJk07RCCFvinVqB0eUB+0HUWQURikj57LAH6Ezt7lfuu/700GN1XN/3vB+eCny6BFxj4NvA9rOQ7XWmhGlwjYIngb/fcNY4H+aRby9IvELIhoRHdNar2U2NPNRfVFE94rEm0W8/0gnRbwdIqaptY5pradF9A5T0biOmaY2tdbtn0JmY2DMC6B8Iu7HEFoB57JSVGwfy5gCgL3AAGA0FObc5wjlSiUuuUpqLS/ANwTOYqAMSOVMBmcW6f4VA6C/spQj1iyNcwEG0i66ig46X8aTPqMG2s4AzUphAEN5EsC7SJijuRlcqXnaYyMA5DRtxlOovpnKkjGFjCncyJO8sUXuhW/jii9AfSvl9S10mikiItUGgNVhg+1f8iX/XB+7c2OQjkE8CtMBHNoEwGiFcJ9S2LdDPNxbSmd6Bf/cnS3J0QSVVWAvJldYwYeCIqoMI2z5BsHgWrKuLJmhyV1GbeEGHVVpXO7rkLwMFfshvQ6rC3yxHOOjsnBYEVQ9Iu5HpoRWpn46H2wmubI0Qtn6d2jwQOI3WKwQnWd1cpxre7p4X2BLeFwltWpnAK+nI4N8nTXuZpe4GnvGvpo6+PGGDRMm7Se4ZavnuWGVBqulc8LTMqx2YjQExryzm2Z/VGsnQKtkOSCbPLE4WMagXKnEocKC7glPyzCAyi/ZNfrW/Sqe9OU0bRGRamArhCJ4alexf+Ds8b8j/wNX0BxLu9m40wAAAABJRU5ErkJggg==)](https://icmods.mineprogramming.org/mod?id=6)

An unofficial port of [ForestryMC](https://github.com/ForestryMC/ForestryMC) for [Minecraft: Bedrock Edition](https://minecraft.fandom.com/wiki/Bedrock_Edition) that adds beekeeping and lots of mechanics.

## How to Play?
1. Install [Horizon Modding Kernel](https://play.google.com/store/apps/details?id=com.zheka.horizon) from the Play Market
2. Open app and install InnerCore pack
3. Open installed pack and download ForestryPE from Mod Manager

## How to Follow?
You can follow the news about the development in the [community of our team](https://vk.com/forestry_pe) on VK or the 
[official Horizon community](https://vk.com/core_engine) (in Russian).

## How to Build?
The project uses [innercore-mod-toolchain](https://github.com/zheka2304/innercore-mod-toolchain), so it requires:
- [Python](https://www.python.org/) 3.7 or higher
- [node.js](https://nodejs.org/en/) 10.15.1 or higher, `tsc` version 3 or higher must also be installed (to do this, run `npm install -g tsc`)

To compile the development version of the mod and immediately push it to the device, use the `Build & Push All` run 
configuration in Intellij Idea or the command:
```shell
{PROJECT_PATH}\toolchain\python\build-and-push-all.bat
```

To compile the release version, use `Assemble Mod for Release` or the command:
```shell
{PROJECT_PATH}\toolchain\python\assemble-release.bat
```

## License
All rights to textures belong to the original authors of [ForestryMC](https://github.com/ForestryMC/ForestryMC).