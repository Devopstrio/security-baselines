import json
import yaml
from typing import List, Dict, Any, Optional
from datetime import datetime

class BaselineEngine:
    """Defines and manages security baseline standards."""
    
    def __init__(self):
        self.baselines = {}

    def define_baseline(self, name: str, category: str, rules: List[Dict[str, Any]], framework: str = "CIS"):
        self.baselines[name] = {
            "name": name,
            "category": category,
            "framework": framework,
            "version": "1.0.0",
            "rules": rules,
            "created_at": datetime.utcnow().isoformat()
        }
        return self.baselines[name]

    def get_baseline(self, name: str) -> Optional[Dict]:
        return self.baselines.get(name)

class ValidationEngine:
    """Validates configuration state against defined baselines."""
    
    def __init__(self, baseline_engine: BaselineEngine):
        self.engine = baseline_engine

    def validate_config(self, baseline_name: str, current_config: Dict[str, Any]) -> Dict[str, Any]:
        baseline = self.engine.get_baseline(baseline_name)
        if not baseline:
            raise ValueError(f"Baseline {baseline_name} not found")

        violations = []
        passed_rules = 0
        total_rules = len(baseline["rules"])

        for rule in baseline["rules"]:
            target_key = rule["key"]
            expected_val = rule["expected"]
            actual_val = current_config.get(target_key)

            if actual_val != expected_val:
                violations.append({
                    "rule_id": rule.get("id", "unknown"),
                    "key": target_key,
                    "expected": expected_val,
                    "actual": actual_val,
                    "severity": rule.get("severity", "MEDIUM")
                })
            else:
                passed_rules += 1

        score = (passed_rules / total_rules) * 100 if total_rules > 0 else 0
        
        return {
            "baseline_name": baseline_name,
            "score": score,
            "violations": violations,
            "timestamp": datetime.utcnow().isoformat(),
            "status": "COMPLIANT" if score == 100 else "NON_COMPLIANT"
        }

class DriftDetector:
    """Detects configuration changes between validation runs."""
    
    def detect_drift(self, last_validation: Dict, current_validation: Dict) -> List[Dict]:
        drifts = []
        last_v_ids = {v["rule_id"] for v in last_validation["violations"]}
        curr_v_ids = {v["rule_id"] for v in current_validation["violations"]}

        # New violations (Drift from compliant to non-compliant)
        new_violations = curr_v_ids - last_v_ids
        for vid in new_violations:
            drifts.append({"rule_id": vid, "type": "NEW_VIOLATION", "severity": "HIGH"})

        # Resolved violations (Drift from non-compliant to compliant)
        resolved = last_v_ids - curr_v_ids
        for vid in resolved:
            drifts.append({"rule_id": vid, "type": "RESOLVED", "severity": "INFO"})

        return drifts

if __name__ == "__main__":
    be = BaselineEngine()
    be.define_baseline(
        name="k8s-hardened",
        category="Kubernetes",
        rules=[
            {"id": "K8S-001", "key": "allowPrivilegeEscalation", "expected": False, "severity": "HIGH"},
            {"id": "K8S-002", "key": "runAsNonRoot", "expected": True, "severity": "MEDIUM"},
            {"id": "K8S-003", "key": "readOnlyRootFilesystem", "expected": True, "severity": "LOW"}
        ]
    )

    validator = ValidationEngine(be)
    
    # Mock current config
    current_config = {
        "allowPrivilegeEscalation": True, # VIOLATION
        "runAsNonRoot": True,
        "readOnlyRootFilesystem": False # VIOLATION
    }

    results = validator.validate_config("k8s-hardened", current_config)
    print(json.dumps(results, indent=2))
