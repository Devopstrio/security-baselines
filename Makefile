.PHONY: help build up down test lint migrate validate-baseline drift-report

help:
	@echo "Security Baselines Platform - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "validate-baseline  : Validate a resource against a baseline"
	@echo "drift-report       : Generate a configuration drift report"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

validate-baseline:
	docker-compose exec api python scripts/validate/run.py --target "k8s-cluster-01"

drift-report:
	docker-compose exec api python scripts/scan/drift.py
