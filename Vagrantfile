Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.hostname = "nodejs"

  config.vm.network "private_network", ip: "192.168.33.14"
  config.vm.synced_folder ".", "/vagrant_share", :owner => "vagrant", :group => "vagrant", :mount_options => ['dmode=755', 'fmode=755']
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.name = "nodejs"
  end

  config.vm.provision "shell", inline: <<-SHELL
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y

    echo grub-pc hold | dpkg --set-selections
    apt-get upgrade -y

    apt-get install -y nodejs npm
    npm cache clean
    npm install n -g
    n lts

    apt-get purge -y nodejs npm
    apt-get autoclean
    apt-get clean
  SHELL

end
