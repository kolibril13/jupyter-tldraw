.PHONY: install build lab dev

install:
	npm install
	node node_config.mjs
	uv sync

build:
	node node_config.mjs

lab:
	uv run jupyter lab

dev:
	uv run watchfiles "node node_config.mjs" js/ &
	uv run jupyter lab
