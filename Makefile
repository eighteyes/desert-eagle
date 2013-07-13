
start:
	open http://localhost:8124;
	nodev index.js & node resty.js;

restart:
	nodev index.js & node resty.js;

.PHONY: start
.PHONY: restart
