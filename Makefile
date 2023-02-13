.PHONY: *

all: fix check

check: test lint format

test:
	npx jest

lint:
	npx tsc --noEmit
	npx eslint

format:
	npx prettier --ignore-unknown --check .

fix:
	npx eslint --fix
	npx prettier --write .