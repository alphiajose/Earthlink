import numpy as np

def detect_anomalies(data):
    # Simple anomaly detection using standard deviation
    threshold = 3
    mean = np.mean(data)
    std = np.std(data)
    
    anomalies = [x for x in data if abs(x - mean) > threshold * std]
    return anomalies

# Example usage with air quality index data
air_quality_data = [40, 42, 45, 300, 41, 43]  # 300 is an anomaly
anomalies = detect_anomalies(air_quality_data)
print("Anomalies detected:", anomalies)