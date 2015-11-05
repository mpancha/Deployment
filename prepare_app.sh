ROOT=`pwd`
#cp ../../post-receive .git/hooks/
npm install
mkdir -p deploy/
mkdir -p deploy/blue.git
mkdir -p deploy/blue-www
mkdir -p deploy/green.git
mkdir -p deploy/green-www
cd deploy/green.git
git init --bare
cp ../../post-receive-green hooks/post-receive
cd ..
cd blue.git
git init --bare
cp ../../post-receive-blue hooks/post-receive
cd ../../..
git clone https://github.com/CSC-DevOps/App
cd App
cp ../Deployment/post-commit .git/hooks/
git remote add blue file://$ROOT/deploy/blue.git
git remote add green file://$ROOT/deploy/green.git
#sudo apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
#echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" > /etc/apt/sources.list.d/docker.list
#sudo apt-get update
#sudo apt-get install docker-engine
sudo docker run -d -p 5000:5000 --restart=always --name registry registry:2
