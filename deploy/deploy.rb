# config valid only for current version of Capistrano
lock '3.7.2'

set :application, 'application'
set :repo_url, 'git@bitbucket.org:kangourouge/rluniform.git'
set :repo_tree, "htdocs"

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_files, fetch(:linked_files, []).push('app/config/parameters.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
set :linked_dirs, fetch(:linked_dirs, []).push('app/logs', 'vendor', 'web/media', 'web/uploads')

# Dirs that need to be writable by the HTTP Server (i.e. cache, log dirs)
set :file_permissions_paths, fetch(:file_permissions_paths, []).push('web/js', 'web/css', 'web/uploads', 'web/media')

namespace :symfony do
    desc "SF doctrine schema update"
    task :schema_update do
        invoke 'symfony:console', 'doctrine:schema:update', '--no-interaction --force'
    end
end

namespace :deploy do
    after :updated, 'symfony:assets:install'
    after :updated, 'symfony:schema_update'
end

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

#namespace :deploy do

#  after :restart, :clear_cache do
#    on roles(:web), in: :groups, limit: 3, wait: 10 do
#      # Here we can do anything such as:
#      # within release_path do
#      #   execute :rake, 'cache:clear'
#      # end
#    end
#  end

# end

