role :app, '52.79.165.250:2222'
role :web, '52.79.165.250:2222'
role :db, '52.79.165.250:2222', primary: true

set :rails_env, 'staging'
set :rack_env, 'staging'
set :puma_env, 'staging'

set :ssh_options, {
  user: 'updatebot',
  keys: %w(~/.ssh/seb-aws.pem),
  forward_agent: true
}
