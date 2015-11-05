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
git remote add blue file://$ROOT/deploy/blue.git
git remote add green file://$ROOT/deploy/green.git
