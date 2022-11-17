![](https://ftbwiki.org/images/6/6e/Forestry_Logo.png)

# ForestryPE
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