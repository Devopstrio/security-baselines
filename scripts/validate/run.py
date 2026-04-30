import sys
import argparse
from core.baselines.engine import BaselineEngine, ValidationEngine, DriftDetector

def run_baseline_simulation():
    # 1. Initialize Engine
    be = BaselineEngine()
    be.define_baseline(
        name="cis-k8s-v1.24",
        category="Kubernetes",
        rules=[
            {"id": "CIS-1.1.1", "key": "anonymousAuth", "expected": False, "severity": "CRITICAL"},
            {"id": "CIS-1.1.2", "key": "profiling", "expected": False, "severity": "HIGH"},
            {"id": "CIS-1.1.3", "key": "repairMalformedManifest", "expected": False, "severity": "MEDIUM"}
        ]
    )
    
    # 2. Validation Run 1 (Partial Violation)
    validator = ValidationEngine(be)
    config_v1 = {
        "anonymousAuth": True, # VIOLATION
        "profiling": False,
        "repairMalformedManifest": False
    }
    
    print("--- Security Baseline Intelligence Simulation ---")
    print("Action: Validating resource against CIS-K8S-V1.24")
    
    v1_results = validator.validate_config("cis-k8s-v1.24", config_v1)
    print(f"\n[RUN 1] Compliance Score: {v1_results['score']}%")
    print(f"[RUN 1] Total Violations: {len(v1_results['violations'])}")

    # 3. Validation Run 2 (New Drift)
    config_v2 = {
        "anonymousAuth": True,
        "profiling": True, # NEW VIOLATION
        "repairMalformedManifest": False
    }
    
    v2_results = validator.validate_config("cis-k8s-v1.24", config_v2)
    print(f"\n[RUN 2] Compliance Score: {v2_results['score']}%")
    
    # 4. Detect Drift
    detector = DriftDetector()
    drifts = detector.detect_drift(v1_results, v2_results)
    
    print("\n--- Drift Analysis ---")
    for d in drifts:
        print(f"[{d['severity']}] Type: {d['type']} | Rule: {d['rule_id']}")

if __name__ == "__main__":
    run_baseline_simulation()
