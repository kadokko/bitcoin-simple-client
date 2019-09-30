#!/bin/bash

# config
app_name=bitcoin-simple-client
src_dir=/home/vagrant/apps_node
dst_dir=/vagrant_share

## mount
mkdir -p ${dst_dir}/node_modules
mkdir -p ${src_dir}/${app_name}/node_modules
sudo mount --bind ${src_dir}/${app_name}/node_modules ${dst_dir}/${app_name}/node_modules

## start up
# export CHOKIDAR_USEPOLLING=true
npm start
