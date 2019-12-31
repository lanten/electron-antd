
#!/bin/bash

# -v 版本号, 必填项
# -n tag 名称, 默认:release
# -p 是否提交到远端
# -m 注释, 可空

# 时间
TIME=$(date "+%Y%m%d%H%M")
# tag 名称 
NAME="release"
# 是否提交到远端 -p
PUSH_TAG=0

while getopts 'v:n:pm:' arg ; do
  case $arg in
    v)
      VERSION=$OPTARG;;
    n)
      NAME=$OPTARG;;
    p)
      PUSH_TAG=1;;
    m)
      COMMEN=$OPTARG;;
    ?)
      echo "unkonw arguments" exit 1 ;;
  esac
done

# check parameter
if [ ! -n "$VERSION" ]; then 
  echo "版本号不能为空!"
  exit 1 
fi

TAG_NAME="${VERSION}/${TIME}-${NAME}"

if [ ! -n "$COMMEN" ]; then 
  # 默认注释 
  COMMEN="${VERSION} 的 ${NAME} 标签 日期:$(date)"
fi


echo "添加 ${COMMEN}"

git tag -a $TAG_NAME -m "${COMMEN}"

if [ $PUSH_TAG == 1 ]; then 
  git push origin $TAG_NAME
fi