# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:
server 'gegm-rluniforms.vixns.net:2222', user: 'gegm', roles: %w{app db web}

# Configuration
# =============
# You can set any configuration variable like in config/deploy.rb
# These variables are then only loaded and set in this stage.
# For available Capistrano configuration variables see the documentation page.
# http://capistranorb.com/documentation/getting-started/configuration/
# Feel free to add new variables to customise your setup.
set :branch, 'develop'
set :deploy_to, '/home/gegm/domains/rl-uniforms.com/preprod/'
set :permission_method,     'acl'
# Name used by the Web Server (i.e. www-data for Apache)
set :file_permissions_users, ['user', "www-data"]
# Name used by the Web Server (i.e. www-data for Apache)
set :webserver_user,        "www-data"

# set :symfony_env,  "test"
# set :linked_files, fetch(:linked_files, []).push('web/app.php')
