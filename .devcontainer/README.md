# Working with devcontainers

- You can run devcontainers both locally and on the cloud with github codespaces.

## Running locally

### Requieriments

  1. Have the VScode [extention](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  2. Have the docker deamon running with propper permissions (On both windows and linux the docker installation should have created a user group, so just add your user to it. For windows: "docker-users" on linux: "docker")
  3. (Only on windows): Set `git config --global core.autocrlf false`, this ensures that git doesn't reformat some script files to the windows line ending format. This leads to problems with parsing since windows uses the `\r` escape character instead of `\n`. You can fix this later manually by changing **CRLF** to **LF** in the right bottom corner of your VScode enviroment but that leads to wierd git issues.

### How to start

  1. Open the repository in VScode and click **"Reopen in container"** or use the [Command Pallete](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and select **Dev Containers: Rebuild and Reopen in Container**
You can now use [localhost:80](http://localhost:80) for apache and [localhost:3000](http://localhost:3000) for react
This process can take up to several minutes before everything compiles and runs

## Running on github codespaces

### Start from repository

1. Select this repository
2. Drop down the green `<>code` button.
3. Select codespaces and click on the plus icon.

### Start from codespaces menu

1. Click the hamburger menu button in github and select codespaces.
2. Select new codespace and choose this repository and the branch. (You can swith between branches in the codespace)
3. Create new codespace
