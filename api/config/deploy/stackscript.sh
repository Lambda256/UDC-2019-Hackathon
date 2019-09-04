# MARK: - System updates
sudo update-locale LANG=en_US.UTF-8 LANGUAGE= LC_CTYPE="en_US.UTF-8" LC_NUMERIC="en_US.UTF-8" LC_TIME="en_US.UTF-8" LC_COLLATE="en_US.UTF-8" LC_MONETARY="en_US.UTF-8" LC_MESSAGES="en_US.UTF-8" LC_PAPER="en_US.UTF-8" LC_NAME="en_US.UTF-8" LC_ADDRESS="en_US.UTF-8" LC_TELEPHONE="en_US.UTF-8" LC_MEASUREMENT="en_US.UTF-8" LC_IDENTIFICATION="en_US.UTF-8" LC_ALL=en_US.UTF-8
sudo locale-gen en_US.UTF-8

sudo apt update && sudo apt -y upgrade && sudo apt -y dist-upgrade && sudo apt -y autoremove

sudo dpkg-reconfigure tzdata # Set it KST
sudo service cron restart # MUST

# MARK: - Users & SSH

USER_NAME="updatebot"
sudo adduser $USER_NAME
sudo adduser $USER_NAME sudo

sudo su
echo "updatebot ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
exit

sudo su $USER_NAME
cd && mkdir .ssh

sudo cp ~ubuntu/.ssh/authorized_keys ~updatebot/.ssh/
sudo chown updatebot ~updatebot/.ssh/*;sudo chgrp updatebot ~updatebot/.ssh/*;sudo chmod 600 ~updatebot/.ssh/authorized_keys

sudo vim /etc/ssh/sshd_config # change port to 2222
sudo service sshd restart

# MARK: - nginx & git
nginx=stable # use nginx=development for latest development version
sudo add-apt-repository ppa:nginx/$nginx;sudo apt update;sudo apt install nginx git

# MARK: - rbenv & ruby
sudo apt install -y build-essential zlib1g-dev libssl-dev libreadline-gplv2-dev gcc libgsl0-dev
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.profile
echo 'eval "$(rbenv init -)"' >> ~/.profile
exec $SHELL -l
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
sudo apt install libffi-dev # https://github.com/sstephenson/ruby-build/wiki#build-failure-of-fiddle-with-ruby-220
rbenv install 2.6.3
rbenv rehash && rbenv global 2.6.3
sudo ln -s ~/.rbenv/shims/ruby /usr/local/bin/ruby;sudo ln -s ~/.rbenv/shims/gem /usr/local/bin/gem
gem update --system && gem install bundler

# MARK: - Image upload
sudo apt install imagemagick

# MARK: - Deploy
sudo chown updatebot /srv/ && chgrp updatebot /srv
mkdir /srv/web/;mkdir /srv/web/intime;mkdir /srv/web/intime/releases
mkdir /srv/web/intime/shared && mkdir /srv/web/intime/shared/pids;mkdir /srv/web/intime/shared/log;mkdir /srv/web/intime/shared/sockets;
mkdir /srv/web/intime/shared/public && mkdir /srv/web/intime/shared/public/system

# MARK: - Postgres
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt update && sudo apt install postgresql postgresql-contrib libpq-dev

# DB user
sudo su postgres
PG_DBNAME=intime
PG_UNAME=intime
psql -d postgres -c "CREATE USER $PG_UNAME;"
psql -d postgres -c "DROP DATABASE $PG_DBNAME;"

psql -d postgres -c "ALTER USER $PG_UNAME CREATEDB;"
psql -d postgres -c "ALTER USER $PG_UNAME WITH SUPERUSER;"

# Enable updatebot to run psql
psql -d postgres -c "CREATE USER updatebot"
psql -d postgres -c "ALTER USER updatebot WITH SUPERUSER;"

# TO avaoid LC_CTYPE setting requires encoding "LATIN1" error
psql -d postgres -c "update pg_database set datistemplate=false where datname='template1';"
psql -d postgres -c "drop database template1;"
psql -d postgres -c "create database template1 with owner=postgres encoding='UTF-8' lc_collate='en_US.utf8' lc_ctype='en_US.utf8' template template0;"
psql -d postgres -c "update pg_database set datistemplate=true where datname='template1';"

psql -d postgres -c "ALTER USER $PG_UNAME WITH PASSWORD 'staging';"

exit

sudo vim /etc/postgresql/11/main/pg_hba.conf

# Add following lines on top
local   all             intime                               trust
host    all             intime       127.0.0.1/32            trust
host    all             intime       ::1/128                 trust

# Test peer auth
sudo su postgres
psql -c "SELECT pg_reload_conf();"
exit

PG_DBNAME=intime
PG_UNAME=intime
psql -U $PG_UNAME -d postgres -c "CREATE DATABASE $PG_DBNAME;"

# Instsall node
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt install nodejs # 12.7.0

# Setup swapfile
sudo su
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab # persist on reboot
free -m
# only when absolutely necessary
sudo sysctl vm.swappiness=1
echo "vm.swappiness = 1" >> /etc/sysctl.conf  # persist on reboot
cat /proc/sys/vm/swappiness
sudo sysctl kernel.shmall=1218176
echo "kernel.shmall = 1218176" >> /etc/sysctl.conf  # persist on reboot
sudo sysctl kernel.shmmax=4989648896
echo "kernel.shmmax = 4989648896" >> /etc/sysctl.conf  # persist on reboot
sudo sysctl fs.file-max=65535
echo "fs.file-max = 65535" >> /etc/sysctl.conf  # persist on reboot


# vim /etc/postgresql/11/main/postgresql.conf

# DB Version: 10
# OS Type: linux
# DB Type: web
# Total Memory (RAM): 14 GB
# CPUs num: 4
# Connections num: 200
# Data Storage: ssd
# ```
# max_connections = 200
# shared_buffers = 3584MB
# effective_cache_size = 10752MB
# maintenance_work_mem = 896MB
# checkpoint_completion_target = 0.7
# wal_buffers = 16MB
# default_statistics_target = 100
# random_page_cost = 1.1
# effective_io_concurrency = 200
# work_mem = 9175kB
# min_wal_size = 1GB
# max_wal_size = 2GB
# max_worker_processes = 4
# max_parallel_workers_per_gather = 2
# max_parallel_workers = 4
# ```

