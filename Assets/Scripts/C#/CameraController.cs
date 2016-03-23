using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {

    public Camera m_mainCamera;

	void Start () {
	    
	}
	
	void Update () {
        Cursor.lockState = CursorLockMode.Locked;
	}
}
