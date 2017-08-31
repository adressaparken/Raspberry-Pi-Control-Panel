#!/bin/bash

NATIVE_APP='index'
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

##### Main

while true; do

    # echo "Checking for updates"
    # sh $SCRIPT_DIR/pull_git_native.sh
    echo "Restarting native app!"
    node $ROOT_DIR/$NATIVE_APP.js
    echo "Main app ended..."
    echo "-----------------------------------"
    read -t 5 -p "Restarting the native app in 5 seconds. Press <CTRL>+c to stop."
    echo "-----------------------------------"

done
