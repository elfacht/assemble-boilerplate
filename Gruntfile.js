module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'app',
      dist: '_output',
      assets: '<%= config.src %>/assets'
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          '<%= config.assets %>/js/vendor/**/**/*.js',
          '<%= config.assets %>/js/app/**/**/*.js'
        ],
        dest: '<%= config.assets %>/js/main.js'
      }
    },

    uglify: {
        build: {
          options: {
            banner: '/*! <%= pkg.name %>-v<%= pkg.version %> ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            sourceMap: true
          },
          src: '<%= config.assets %>/js/main.js',
          dest: '<%= config.assets %>/js/main.js'
        }
    },

    sass: {
      dist: {
        options: {
          sourceMap: true,
          includePaths: [
            '<%= config.assets %>/sass/base/',
            '<%= config.assets %>/sass/helpers/',
            '<%= config.assets %>/sass/layout/',
            '<%= config.assets %>/sass/vendor/'
          ],
          outputStyle: 'compressed'
        },
        files: {
          '<%= config.assets %>/css/main.css': '<%= config.assets %>/sass/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9'],
        map: true
      },
      main: {
        src: '<%= config.assets %>/css/main.css'
      }
    },

    watch: {
      concat: {
        files: ['<%= config.assets %>/js/**/*.js'],
        tasks: "concat"
      },
      assemble: {
        files: ['<%= config.src %>/{data,templates}/**/**/*.{hbs,json}'],
        tasks: ['newer:copy', 'assemble']
      },
      scripts: {
        files: ['<%= config.assets %>/js/app/**/**/*.js'],
        tasks: ['uglify', 'newer:jshint:all', 'newer:copy'],
        options: {
            spawn: false
        }
      },
      js: {
        files: [
          '<%= config.assets %>/js/**/*.js'
        ],
        tasks: ['newer:copy']
      },

      helpers: {
        files: ['<%= config.src %>/helpers/**/**/*.js'],
        tasks: ['newer:copy', 'assemble']
      },

      css: {
        files: [
          '<%= config.src %>/templates/**/**/*.scss',
          '<%= config.assets %>/sass/**/**/*.scss'
        ],
        tasks: ['sass', 'newer:copy'],
        options: {
          spawn: false
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          pathToLibs: 'assets',
          pathToPartials: 'app/templates/partials',
          layoutdir: '<%= config.src %>/templates/layouts/',
          layout: false,
          data: '<%= config.src %>/data/*.json',
          partials: [
            '<%= config.src %>/templates/partials/**/*.hbs',
            '<%= config.src %>/templates/layouts/**/*.hbs'
          ],
          helpers: ['<%= config.src %>/helpers/*.js']
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/media/svg',
          src: ['*.svg', '*.png'],
          dest: "<%= config.assets %>/media/icons"
        }],
        options: {
          datasvgcss: 'icons.css',
          enhanceSVG: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : '<%= config.dist %>/assets/css/main.css'
        },
        options: {
          files: ['<%= config.dist %>/assets/css/main.css', '<%= config.dist %>/assets/js/**'],
          proxy: "dev.boilerplate-assemble",
          ghostMode: false,
          open: false,
          watchTask: true // < VERY important
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: '<%= config.src %>/assets', src: ['**/*.*'], dest: '<%= config.dist %>/assets'},
          {expand: true, src: ['<%= config.src %>/templates/partials/**/*.{js,scss}'], dest: '<%= config.dist %>'}
        ]
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    jshint: {
      all: ['Gruntfile.js', '<%= config.assets %>/js/app/**/*.js']
    },

    clean: {
      build: ['<%= config.dist %>/**/*']
    }
  });


  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('server', ['build', 'browserSync', 'watch']);
  grunt.registerTask('css', ['sass', 'newer:autoprefixer']);
  grunt.registerTask('build', ['clean:build', 'css', 'jshint', 'concat', 'uglify', 'copy', 'assemble']);
  grunt.registerTask('default', ['build']);
};
