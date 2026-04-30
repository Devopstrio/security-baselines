module "baselines_db" {
  source = "./modules/database"

  db_name = "security_baselines_vault"
}

module "baselines_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "baselines_monitoring" {
  source = "./modules/monitoring"

  retention_days = 180
}

resource "kubernetes_namespace" "sec_gov" {
  metadata {
    name = "security-governance"
    labels = {
      "security.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "baseline_rules" {
  metadata {
    name      = "baseline-configuration-rules"
    namespace = kubernetes_namespace.sec_gov.metadata[0].name
  }

  data = {
    "validation-mode"   = "enforce"
    "drift-threshold"   = "5"
    "reporting-tier"    = "executive"
  }
}
