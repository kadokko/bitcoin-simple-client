Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.hostname = "bitcoin-simple-client"

  config.vm.network "private_network", ip: "192.168.33.14"
  config.vm.synced_folder ".", "/vagrant_share", :owner => "vagrant", :group => "vagrant", :mount_options => ['dmode=755', 'fmode=755']
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "3072"
    vb.name = "bitcoin-simple-client"
    # vb.gui = true
  end

  # nodejs
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
  SHELL

  # electron
  config.vm.provision "shell", inline: <<-SHELL
    export DEBIAN_FRONTEND=noninteractive
    apt-get update  -y
    apt-get install -y libnss3 libgdk-pixbuf2.0-0  libgtk-3-0 libxss1 libasound2
    # for building windows 64 bit exe
    apt-get install -y gcc-multilib g++-multilib wine-stable
    # for building windows 32 bit exe
    dpkg --add-architecture i386
    apt-get install -y wine32
  SHELL

  # yarn
  #config.vm.provision "shell", inline: <<-SHELL
  #  apt install -y cmdtest
  #SHELL

  # clean
  #config.vm.provision "shell", inline: <<-SHELL
  #  apt-get autoclean
  #  apt-get clean
  #SHELL

end
