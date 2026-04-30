from typing import List, Dict
from datetime import datetime

class PolicyEnforcer:
    """Evaluates security policies for enforcement decisions."""
    
    def __init__(self):
        self.policies = {
            "critical_violations": "BLOCK",
            "high_violations": "WARN",
            "medium_violations": "AUDIT"
        }

    def evaluate_decision(self, violations: List[Dict]) -> str:
        max_severity = "INFO"
        for v in violations:
            sev = v["severity"]
            if sev == "CRITICAL": return "BLOCK"
            if sev == "HIGH": max_severity = "HIGH"
            elif sev == "MEDIUM" and max_severity not in ["CRITICAL", "HIGH"]: 
                max_severity = "MEDIUM"

        if max_severity == "HIGH": return "WARN"
        if max_severity == "MEDIUM": return "AUDIT"
        return "ALLOW"

class RemediationOrchestrator:
    """Suggests and executes remediation for baseline violations."""
    
    def suggest_fix(self, violation: Dict) -> Dict:
        return {
            "rule_id": violation["rule_id"],
            "remediation": f"Set {violation['key']} to {violation['expected']}",
            "impact": "Low",
            "automation_available": True
        }

class ComplianceMapper:
    """Maps baseline rules to industry frameworks (CIS, NIST, etc)."""
    
    def map_to_framework(self, rule_id: str, framework: str = "NIST-800-53") -> str:
        mappings = {
            "K8S-001": "AC-3 (Access Enforcement)",
            "K8S-002": "AC-6 (Least Privilege)",
            "K8S-003": "CM-2 (Baseline Configuration)"
        }
        return mappings.get(rule_id, "N/A")
