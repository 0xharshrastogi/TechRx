UI_DIR = "ui/web-portal"

finstall:
	@echo installing dependencies for $(UI_DIR)
	cd $(UI_DIR) && npm install

fstart:
	@echo starting application
	cd $(UI_DIR) && npm start
