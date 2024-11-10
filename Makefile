.PHONY: all check test type-test lint format fix build

all: fix check

check: test lint format type-test

test: node_modules
	npx jest

type-test: node_modules
	npx tsc --emitDeclarationOnly --declaration --outDir dist src/index.ts
	npx tsd

lint: node_modules
	npx tsc --noEmit
	npx eslint

format: node_modules
	npx prettier --ignore-unknown --check .

fix: node_modules
	npx eslint --fix
	npx prettier --write .

build: node_modules
	npx tsc --project tsconfig.build.json

node_modules: package.json package-lock.json
	npm install
	touch node_modules