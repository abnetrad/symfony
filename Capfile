# change config files path
set :deploy_config_path, 'deploy/deploy.rb'
set :stage_config_path, 'deploy/deploy.d/'


# Load DSL and Setup Up Stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Include tasks from other gems included in your Gemfile
#
# For documentation on these, see for example:
#
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#   https://github.com/capistrano/passenger
#
# require 'capistrano/rvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/bundler'
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'
# require 'capistrano/passenger'

# npm support for Capistrano 3.x
# require 'capistrano/npm'

# This gem will let you run Gulp tasks with Capistrano 3.x.
# require 'capistrano/gulp'

# Capistrano 3.x task to to touch all your linked files, useful on first deploy
require 'capistrano/touch-linked-files'

# Bower support for Capistrano 3.x
# require 'capistrano/bower'

# add symfony tasks
require 'capistrano/symfony'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
