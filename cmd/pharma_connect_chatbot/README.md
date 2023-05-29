# Chatbot User guide

### Installation

+ Install `Python version 3.7`
+ `pip3 install virtualenv`
+ create virtual ENV cmd: `virtualenv --python=python3.7 env_name`
+ install [requirements.txt](requirements.txt)
+ use command `pip install -r requirements.txt`

### RASA Setup

+ After installation of RASA
+ train your model with nlu data
+ run `rasa train`
+ then run `rasa run actions --debug --cors "*" --auto-reload` to start action server
+ after stating Action server start bot_api
+ using this command `rasa run --model empty --enable-api --cors "*" --debug`

### Use of BLACK

+ black is used for reformat code
+ type `black .` in terminal to format all files of existing project
+ type `black /path/to/folder` for format specific folder
+ type `black /path/to/folder/file.py` for format specific file

# Thank you