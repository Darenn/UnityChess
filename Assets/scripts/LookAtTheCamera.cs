using UnityEngine;
using System.Collections;

public class LookAtTheCamera : MonoBehaviour {

    public Camera m_cameraToLookAt;

	void Start () {
	
	}
	
	void Update () {

        // Force an element to face the specified camera
        Vector3 v = m_cameraToLookAt.transform.position - transform.position;
        v.x = v.z = 0.0f;
        transform.LookAt(m_cameraToLookAt.transform.position - v);
        transform.Rotate(0, 180, 0);
	}
}

