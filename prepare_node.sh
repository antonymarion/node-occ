#!/bin/bash
##########################################################################################
#
#
##########################################################################################
export OCCT_VERSION=7.3.0
export OCCT_PACKAGE=occt-${OCCT_VERSION}
if [ `uname` == "Darwin" ];then
export OCCT_TARFILE=${OCCT_PACKAGE}-osx.tgz
else
export OCCT_TARFILE=${OCCT_PACKAGE}-linux.tgz
fi
export OCCT_TARFILE_URL="https://github.com/antonymarion/occt_builder/releases/download/${OCCT_VERSION}/${OCCT_TARFILE}"

echo "  OCCT_TARFILE     = " ${OCCT_TARFILE}
echo "  OCCT_TARFILE_URL = " ${OCCT_TARFILE_URL}

echo "--------------------------  OCCT TAR FILE ${OCCT_TARFILE}"
ls ${OCCT_TARFILE}
if [ ! -f "${OCCT_TARFILE}" ]; then
  wget -q ${OCCT_TARFILE_URL}
fi
if [ ! -d "${OCCT_PACKAGE}" ]; then
  echo "extracting package ${OCCT_TARFILE}"
  tar -xf ${OCCT_TARFILE}
fi

export LD_LIBRARY_PATH=`pwd`/${OCCT_PACKAGE}/lib:$LD_LIBRARY_PATH

export VERSION_FILE=`pwd`/${OCCT_PACKAGE}/include/opencascade/Standard_Version.hxx
grep -i "#define OCC_VERSION_COMPLETE"  ${VERSION_FILE} ;
lscpu ;
cmake --version ;

#set NPROC=`nproc`
# on linux:
#    NPROC=$(grep "^core id" /proc/cpuinfo | sort -u | wc -l)
# on MacOS
#    NPROC=$(sysctl -n hw.ncpu)
# on both
NPROC=$(node -p "os.cpus().length")

echo "Number of processors =" ${NPROC}


# This is a temporary file for Travis builds.
# Once Travis is correctly set up for this project, this file
# will be removed.
./build.sh
