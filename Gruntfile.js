module.exports = function (grunt) {
    const banner = `/*
 *    ______                  _                _____  ______
 *   |  ____|                | |              |  __ \\|  ____|
 *   | |__ ___  _ __ ___  ___| |_ _ __ _   _  | |__) | |__
 *   |  __/ _ \\| '__/ _ \\/ __| __| '__| | | | |  ___/|  __|
 *   | | | (_) | | |  __/\\__ \\ |_| |  | |_| | | |    | |____
 *   |_|  \\___/|_|  \\___||___/\\__|_|   \\__, | |_|    |______|
 *                                      __/ |
 *                                     |___/
 *
 * Built at ${(new Date()).toDateString()}
 * © DDCompany (https://vk.com/id331953744)
 */\n`;

    function readIncludes(dir) {
        let arr = [];

        grunt.file.read(dir + "/.includes")
            .split("\n")
            .forEach((text) => {
                if (text.trim()
                    && !text.startsWith("#")
                    && !text.startsWith("//")) {
                    arr.push(dir + "/" + text)
                }
            });

        return arr;
    }

    grunt.initConfig({
        concat: {
            options: {
                banner: banner
            },
            dist: {
                src: readIncludes("dev"),
                dest: 'main.js',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);

};