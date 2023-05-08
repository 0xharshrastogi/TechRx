# Chatbot User guide

### Installation
+ Install `Python version 3.8 <> 3.10`
+ `pip3 install virtualenv`
+ create virtual ENV cmd: `virtualenv --python=python3.10 env_name`
+ install req[requirements.txt](requirements.txt) or [original_req.txt](original_req.txt)
+ use command `pip install -r original_req.txt`

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