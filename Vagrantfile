# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "http://files.vagrantup.com/trusty64.box"
  config.vm.host_name = "worldnews"

  config.vm.network("forwarded_port", :guest => 80, :host => 9393)

  config.vm.provision("ansible") do |ansible|
    ansible.playbook = "ansible/provision.yml"

    ansible.host_key_checking = false

    ansible.groups = { "development" => ["default"] }

    ansible.extra_vars = {
      :ansible_ssh_user => "vagrant"
    }
  end
end
