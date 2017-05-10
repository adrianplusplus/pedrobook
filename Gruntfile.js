//GruntFile

module.exports = function (grunt) {
    grunt.initConfig({

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                    'client'
                    ]
                }
            }
        },
        watch:{
            scripts:{
                files: ['client/scripts/*.js']
            }
        },


    });



    require('load-grunt-tasks')(grunt);


    grunt.registerTask('serve', ['connect','watch']);

    grunt.registerTask('default', ['serve']);
};
