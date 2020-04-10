## Build raspberry pi Virtual box

- Download ISO from https://netix.dl.sourceforge.net/project/osboxes/v/vb/14-D-b/10/Gnome/10G-64bit.7z
- Install Virtual Box
- Create a new VM
- Use Other linux, Debian, 64 bit
- Attach the downloaded disk
- Enable bridged adapter network on VM settings
![](/Users/Thilina/Projects/ice-tracker/docs/images/bridged-adapter.png)
- Start the VM
- Import the downloaded iso
- On the boot menu select "Install" (don't select graphical install)
- Continue with default options


- Start VM (username:osboxes / password: osboxes.org)

### Setup VM
```
su root
```
password: osboxes

```
sudo apt-get install openssh-server
sudo systemctl status ssh
sudo usermod -aG sudo osboxes
```

### Login to VM 
- On the VM open terminal and type `hostname -I` to find its ip
- Use ssh to login (ssh root@<ip>) from your machine (password: osboxes.org))
```
ssh osboxes@<ip>
```

Disable CD ROM by commenting out the additional source
Uncomment lst two lines
```
sudo nano /etc/apt/sources.list
#deb cdrom:[Debian GNU/Linux 10.0.0 _Buster_ - Official amd64 DVD Binary-1 20190706-10:24]/ buster contrib main

deb http://deb.debian.org/debian/ buster-updates main contrib
deb-src http://deb.debian.org/debian/ buster-updates main contrib
```

Add two new unstable sources
```
deb http://deb.debian.org/debian/ unstable main contrib
deb-src http://deb.debian.org/debian/ unstable main contrib
```
#### Install nodejs
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```

### Debug steps
#### Install fprint and supporting libraries
```
sudo apt-get update -y
sudo apt-get install libfprint0
sudo apt-get install libfprint-dev
sudo apt-get install libnode-dev
sudo apt-get install node-gyp
sudo apt-get install git
```


- Goto use home
```
exit
cd ~
npm install electron -g
git clone https://github.com/gamonoid/ice-tracker.git
cd ice-tracker
git checkout fprint
npm install
```

vagrant up
vagrant ssh

npm install nan


## Testing
```
cd tools
node enroll.js --uid 1 --fin 1
```

