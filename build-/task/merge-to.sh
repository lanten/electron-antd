# 一键合并分支 macos | linux
# 接受参数 $1:要合并到哪个分支

banchNow=`git symbolic-ref --short -q HEAD`

echo "=> 当前分支 $banchNow"

git checkout $1
echo "=> 切换到分支 $1"

git pull
git merge $banchNow
echo "=> 合并 $banchNow 到 $1"

git push
echo "=> 执行 push"

git checkout $banchNow
echo "=> 切回原始分支"
